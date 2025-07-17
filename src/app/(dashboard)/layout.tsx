import React from "react";
import Navbar from "~/components/Navbar";
import { SidebarProvider } from "~/components/ui/sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <Navbar/>
      <main className="bg-muted flex h-screen w-screen flex-col">'
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
