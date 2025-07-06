import Link from "next/link";
import CompPost from "~/components/post";
import { Button } from "~/components/ui/button";
import {  HydrateClient } from "~/trpc/server";


export default async function Home() {
  return (
    <HydrateClient>
   <main className="p-4">
      <h1 className="text-green-500">hello</h1>

      <Button className="bg-green-400">
        Click Me 
      </Button>
      <Link href={"/api/auth/sign-in"}>sign in </Link>
      <CompPost/>
   </main>
    </HydrateClient>
  );
}
