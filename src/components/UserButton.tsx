import { AvatarImage, Avatar } from "@radix-ui/react-avatar";
import { signOut, useSession } from "next-auth/react";
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
import GeneratedAvatar from "./GeneratedAvatar";
import { ChevronDownIcon, CreditCardIcon, LogOut } from "lucide-react";

export const UserButton = () => {
  const { data } = useSession();

  if (!data) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-border/20 flex w-full items-center justify-between overflow-hidden rounded-lg border bg-white/5 p-3 hover:bg-white/10">
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image || ""} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name ?? "User"}
            variant="initials"
            className="mr-3 size-9 text-white"
          />
        )}

        <div className="flex min-w-8 flex-1 flex-col gap-0.5 overflow-hidden text-left">
          <p className="w-full truncate text-sm"> {data.user.name || "User"}</p>
          <p className="w-full truncate text-xs">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="truncate font-medium">
              {data.user.name || "user"}
            </span>
            <span className="text-muted-foreground truncate text-sm font-normal">
              {data.user.email || "Email"}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuItem className="courser-pointer flex items-center justify-between">
          Billing
          <CreditCardIcon className="size-4 shrink-0" />
        </DropdownMenuItem>
        <DropdownMenuItem className="courser-pointer flex items-center justify-between">
          <button
            className=" text-black text-sm "
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Logout
          </button>
          <LogOut className="size-4 shrink-0" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
