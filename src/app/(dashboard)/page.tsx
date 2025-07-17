import CompPost from "~/components/post";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <CompPost />
    </HydrateClient>
  );
}
