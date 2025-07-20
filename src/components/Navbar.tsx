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
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import {UserButton} from "./UserButton";

const Navbar = () => {
  const pathName = usePathname();
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
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link
          href={"/"}
          className="flex items-center gap-4 border-b-2 pt-2 pb-4"
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
      <SidebarContent >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu  className="border-b-2 pt-2 pb-4">
              {firstSection.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-blue-400/10 hover:bg-linear-to-r/oklch",
                      pathName === item.href &&
                        "border-blue-800 bg-linear-to-r/oklch",
                    )}
                    isActive={pathName === item.href}
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "from-sidebar-accent via-sidebar/50 to-sidebar/50 h-10 border border-transparent from-5% via-30% hover:border-blue-400/10 hover:bg-linear-to-r/oklch",
                      pathName === item.href &&
                        "border-blue-800 bg-linear-to-r/oklch",
                    )}
                    isActive={pathName === item.href}
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

      <SidebarFooter className="text-zinc-100 ">
        <UserButton/>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
