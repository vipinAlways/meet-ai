import Link from "next/link";
import CompPost from "~/components/post";
import { Button } from "~/components/ui/button";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <CompPost />
    </HydrateClient>
  );
}
