import React from "react";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "~/lib/utils";

interface GeneratedAvatar {
  seed: string;
  className?: string;
  variant: "bottsNeutral" | "initials";
}
const GeneratedAvatar = ({ seed, className, variant }: GeneratedAvatar) => {
    let avatar ;
  if (variant === "bottsNeutral") {
     avatar = createAvatar(botttsNeutral, {
      seed,
    });
  }else{
    avatar = createAvatar(initials, {
      seed,
      fontWeight:500,
      fontSize:42
    });
  }
  return <Avatar className={cn(className)}> 
    <AvatarImage src={avatar.toDataUri()} alt="avatar"></AvatarImage>
    <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
  </Avatar>;
};

export default GeneratedAvatar;
