import { api, HydrateClient } from "~/trpc/server";
import Agents from "./Agents";
import { Suspense } from "react";
import LoadingState from "~/components/LoadingState";
import { Loader2Icon } from "lucide-react";

const Page = async () => {
  await api.agents.getMany.prefetch();
  return (
    <HydrateClient>
      <Suspense
        fallback={
          <LoadingState
            title="Loading Agents"
            description="Please wait while we load your agents...."
            Icon={Loader2Icon}
            spin="spin"
          />
        }
      >
        <Agents />
      </Suspense>
    </HydrateClient>
  );
};
export default Page;
