"use client";
import React from "react";

import { Button } from "~/components/ui/button";
import Link from "next/link";
export default function CallEnd() {
  return (
    <div className="from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">You have Ended Call</h6>
            <p className="text-sm">Summary will appear in few minutes</p>
          </div>

          <Button asChild>
            <Link href="/meetings">
              <span>Back to meetings</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
