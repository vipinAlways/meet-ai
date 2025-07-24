
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  description: string;
  Icon:React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  spin?:string
}
const LoadingState = ({ description, title, Icon,spin }: Props) => {
  const session = useSession()
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
        <Icon className={`text-primary size-6 animate-${spin}`} />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="font-medium text-lg">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
        {!session.data && <Link href={"/api/auth/authentication"} className="underline">Authenticate Yourself</Link>}
      </div>
    </div>
  );
};

export default LoadingState;
