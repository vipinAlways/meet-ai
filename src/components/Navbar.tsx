import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineEmergencyRecording } from "react-icons/md";


const Navbar = () => {
  return (
    <div className="h-screen w-60 bg-blue-950 px-6 py-2">
      <aside>
        <Link
          href={"/"}
          className="flex w-fit items-center justify-center gap-1.5"
        >
          <Image
            src={"/svgs/logo.svg"}
            alt="logo"
            width={50}
            height={20}
            className="object-cover"
          />
          <span className="text-3xl text-zinc-100">Meet.AI</span>
        </Link>

        <div>
          <Link href={"meetings"} className="flex items-center "><MdOutlineEmergencyRecording/> Meetings</Link>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
