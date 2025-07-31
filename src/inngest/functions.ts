import JSONL from "jsonl-parse-stringify";
import { inngest } from "./client";
import type { StreamTransriptItem } from "~/lib/type";
import { AwardIcon } from "lucide-react";
import { db } from "~/server/db";
import { createAgent, openai, type TextMessage } from "@inngest/agent-kit";

const summarizer = createAgent({
  name: "summarizer",
  system: `
  You are an expert summarizer. You write readable, concise, simple content. You are given a transcript of a meeting and you need to summarize it.

Use the following markdown structure for every output:

### Overview
Provide a detailed, engaging summary of the session's content. Focus on major features, user workflows, and any key takeaways. Write in a narrative style, using full sentences. Highlight unique or powerful aspects of the product, platform, or discussion.

### Notes
Break down key content into thematic sections with timestamp ranges. Each section should summarize key points, actions, or demos in bullet format.

Example:
#### Section Name
- Main point or demo shown here
- Another key insight or interaction
- Follow-up tool or explanation provided

#### Next Section
- Feature X automatically does Y
- Mention of integration with Z`.trim(),
  model: openai({ model: "gpt-4o", apiKey: process.env.OPENAI_API_KEY }),
});

export const meetingProcess = inngest.createFunction(
  {
    id: "meetings/processing",
  },
  { event: "meetings/processing" },
  async ({ event, step }) => {
    const response = await step.run("fetch-transcript", async () => {
      return fetch(event.data.transcriptURl).then((res) => res.text());
    });

    const transcript = await step.run("parse-transcript", async () => {
      return JSONL.parse<StreamTransriptItem>(response);
    });
    const transcriptWithSpeakers = await step.run("add-speaker", async () => {
      const speakerIds = [
        ...new Set(transcript.map((item) => item.speaker_id)),
      ];

      const userSpeakers = await db.user.findMany({
        where: {
          id: {
            in: speakerIds,
          },
        },
      });
      const agentSpeakers = await db.agents.findMany({
        where: {
          id: {
            in: speakerIds,
          },
        },
      });

      const speakers = [...userSpeakers, ...agentSpeakers];

      transcript.map((item) => {
        const speaker = speakers.find(
          (speaker) => speaker.id === item.speaker_id,
        );

        if (!speaker) {
          return {
            ...item,
            user: {
              name: "unknown",
            },
          };
        }

        return {
          ...item,
          user: {
            name: speaker.name,
          },
        };
      });
    });
    const { output } = await summarizer.run(
      "Summarize the following transcript: " +
        JSON.stringify(transcriptWithSpeakers),
    );

    await step.run("save-summary", async () => {
      await db.meetings.update({
        where: {
          id: event.data.meetingId,
        },
        data: {
          status: "COMPLETED",
          summary: (output[0] as TextMessage).content as string,
        },
      });
    });
  },
);
