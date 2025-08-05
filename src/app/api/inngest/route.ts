import { serve } from "inngest/next";
import { meetingProcess } from "~/inngest/functions";
import { inngest } from "~/inngest/client";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [meetingProcess],
});
