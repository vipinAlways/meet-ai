import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  description: string;
  image?: string;
}
const EmptyState = ({
  description,
  title,
  image = "/svg/empty.svg",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image src={image} alt="empty" height={240} width={240} loading="lazy" />
      <div className="text-muted-foreground mx-auto flex max-w-md flex-col gap-y-2 text-center">
        <h6 className="text-lg font-medium">{title}</h6>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
