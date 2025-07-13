import Link from "next/link";
import CompPost from "~/components/post";
import { Button } from "~/components/ui/button";
import {  HydrateClient } from "~/trpc/server";


export default async function Home() {
  return (
    <HydrateClient>
   <main className="p-4">
     

      <Button className="">
        Click Me 
      </Button>
      <Link href={"/api/auth/sign-in"}>sign in </Link>
      <CompPost/>
   </main>
    </HydrateClient>
  );
}
