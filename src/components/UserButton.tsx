import { AvatarImage,  Avatar } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const UserButton = () => {
  const session = useSession();

  if (!session) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/20 flex w-full items-center justify-between overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {session.data ? (
          <Avatar>
            <AvatarImage src={session.data.user.image || ""}/>
          </Avatar>
        ) : null}
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserButton;
