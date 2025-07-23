"use client";

import { Ban } from "lucide-react";
import React, { useState } from "react";
import { TiEject } from "react-icons/ti";
import LoadingState from "~/components/LoadingState";
import ResponsiveDialog from "~/components/ResponsiveDialog";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const Agents = () => {
  const [open,setOpen]  = useState(true)
  const [data] = api.agents.getMany.useSuspenseQuery();

  if (!data || data?.length === 0)
    return (
   <ResponsiveDialog
        title="REsjdls"
        description="djsk"
        open={open}
        onOpenChange={() => setOpen(!open)}
      >
      <LoadingState
        title="No Agents Found"
        description="Please add an agent to get started."
        Icon={Ban}
      />
      </ResponsiveDialog>
    );

  return (
    <div>
      <ResponsiveDialog
        title="REsjdls"
        description="djsk"
        open={open}
        onOpenChange={() => {setOpen(!open)}}
      >
        <Button>some thing <TiEject/></Button>
      </ResponsiveDialog>
    </div>
  );
};

export default Agents;
