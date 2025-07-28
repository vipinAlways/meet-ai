// "use client";
// import { Loader2Icon } from "lucide-react";
// import { useSession } from "next-auth/react";
// import React from "react";
// import { CallConnect } from "./CallConnect";
// interface Props {
//   meetingId: string;
//   meetingName: string;
// }

// const CallProvider = ({ meetingId, meetingName }: Props) => {
//   const session = useSession();

//   if (!session.data) {
//     <div className="from-sidebar-accent flex h-screen items-center justify-center bg-radial">
//       <Loader2Icon className="size-6 animate-spin text-white" />
//     </div>;
//   }

//   return (
//    <CallConnect />
//   );
// };

// export default CallProvider;
