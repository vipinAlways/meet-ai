import React, { type ReactNode } from "react";
import { Navbar } from "~/components/Navbar";

import SearchBar from "~/components/SearchBar";
import { SidebarProvider } from "~/components/ui/sidebar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <>
        <Navbar />
        <main className="flex min-h-screen w-screen flex-col">
          <SearchBar />
          {children}
        </main>
      </>
    </SidebarProvider>
  );
};

export default layout;
