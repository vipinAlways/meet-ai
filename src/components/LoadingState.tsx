import { Loader2, Loader2Icon } from "lucide-react";
import React from "react";

interface Props {
  title: string;
  description: string;
}
const LoadingState = ({ description, title }: Props) => {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4">
      <div className="bg-background flex flex-col items-center justify-center gap-y-6 rounded-lg p-10 shadow-sm">
        <Loader2Icon className="text-primary size-6 animate-spin" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="font-medium text-lg">{title}</h6>
          <p className="text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
