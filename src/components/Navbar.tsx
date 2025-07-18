"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  MdOutlineEmergencyRecording,
  MdOutlineSupportAgent,
} from "react-icons/md";
import { Button } from "./ui/button";
import { IoIosLogOut } from "react-icons/io";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname()
  const firstSection = [
    {
      icon: VideoIcon,
      label: "Meetings",
      href: "/meetings",
    },
    {
      icon: BotIcon,
      label: "Agents",
      href: "/agents",
    },
  ];
  const secondSection = [
    {
      icon: StarIcon,
      label: "Upgrade",
      href: "/upgrade",
    },
  ];

  const { data } = useSession();
  return (
    // <div className="hidden h-screen w-72 bg-blue-800 px-4 py-2 md:flex flex-col justify-between">
    //   <aside className="flex flex-col justify-center gap-4">
    //     <Link
    //       href={"/"}
    //       className="flex w-fit items-center justify-center gap-1.5"
    //     >
    //       <Image
    //         src={"/svgs/logo.svg"}
    //         alt="logo"
    //         width={50}
    //         height={20}
    //         className="object-cover"
    //       />
    //       <span className="text-3xl text-zinc-100">Meet.AI</span>
    //     </Link>

    //     <div className="flex flex-col gap-4 border-t border-b border-zinc-300 py-3">
    //       <Link
    //         href={"/meetings"}
    //         className="flex items-center gap-2 text-xl text-zinc-300"
    //       >
    //         <MdOutlineEmergencyRecording className="h-8 w-8" /> Meetings
    //       </Link>
    //       <Link
    //         href={"/agents"}
    //         className="flex items-center gap-2 text-xl text-zinc-300"
    //       >
    //         <MdOutlineSupportAgent className="h-8 w-8" /> Agents
    //       </Link>
    //     </div>
    //     <div></div>
    //   </aside>
    //   <div className="w-fullss">
    //     {data ? (
    //       <Button onClick={() => signOut({ callbackUrl: "/" })}>
    //         <IoIosLogOut /> Sign out
    //       </Button>
    //     ) : (
    //       <Link href={"/api/auth/authentication"}>Join Us</Link>
    //     )}
    //   </div>
    // </div>
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link
          href={"/"}
          className="flex items-center gap-4 border-b-2 px-2 pt-2 pb-4"
        >
          <Image
            src={"/svgs/logo.svg"}
            alt="logo"
            width={36}
            height={36}
            className="object-cover"
          />
          <p className="text-2xl font-semibold">Meet.AI</p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-blue-400/10 hover:bg-linear-to-r/oklch",pathName === item.href && " bg-linear-to-r/oklch border-blue-800"
                    )}
                  >
                    <Link href={item.href} className="flex gap-2">
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Navbar;
