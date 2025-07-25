"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { TRPCReactProvider } from "~/trpc/react";
import { NuqsAdapter } from "nuqs/adapters/next";
const Provider = ({ children }: { children: React.ReactNode }) => {
  const [mount, setMount] = useState(false);

  useEffect(() => setMount(true), [mount]);
  if (!mount) return null;
  return (
    <NuqsAdapter>
      <TRPCReactProvider>
        <SessionProvider>
          <div>{children}</div>
        </SessionProvider>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
};

export default Provider;
