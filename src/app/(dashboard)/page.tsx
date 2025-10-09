
import CompPost from "~/components/Post";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <CompPost />
    </HydrateClient>
  );
}
