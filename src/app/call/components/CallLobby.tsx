import React from "react";
import {
  DefaultVideoPlaceholder,
  type StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useUserData } from "~/hooks/use-user-data";
import { useSession } from "next-auth/react";
import generateAvatatUri from "~/lib/avatar";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { LogInIcon } from "lucide-react";

interface Props {
  onJoin: () => void;
}

const DisableVideoPreview = () => {
  const { user } = useUserData();
  if (!user?.image || !user.name) {
    console.log(user?.image || user?.name, "name hian ");
  }

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: user?.name ?? "user",
          image:
            user?.image ??
            generateAvatatUri({ seed: user?.name ?? "", variant: "initials" }),
        } as StreamVideoParticipant
      }
    />
  );
};
const AllowBrowserPermission = () => {
  return (
    <p className="text-sm">
      Please grant your browser a permission to access your camera ans micrphone
    </p>
  );
};

export default function CallLobby({ onJoin }: Props) {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { user } = useUserData();
  const { hasBrowserPermission: hasMicroPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserMediaPermission = hasCameraPermission && hasMicroPermission;
  return (
    <div className="from-sidebar-accent to-sidebar flex h-full flex-col items-center justify-center bg-radial">
      <div className="flex flex-1 items-center justify-center px-8 py-4">
        <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
          <div className="flex flex-col gap-y-2 text-center">
            <h6 className="text-lg font-medium">Ready to join?</h6>
            <p className="text-sm">Set up yout call before joining</p>
            <p>{user?.name}</p>
          </div>

          <VideoPreview
            DisabledVideoPreview={
              hasBrowserMediaPermission
                ? DisableVideoPreview
                : AllowBrowserPermission
            }
          />

          <div className="flex gap-x-3">
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div className="flex w-full justify-between gap-x-2">
            <Button asChild variant={"ghost"}>
              <Link href={"/meetings"}>Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              <LogInIcon /> Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
