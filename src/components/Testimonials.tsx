import React, { useState } from "react";
import { testimonials } from "~/lib/const";
import GeneratedAvatar from "./GeneratedAvatar";

export default function Testimonials() {
  const [offsetX, setOffsetX] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const moveX = (x - centerX) / 10;
    setOffsetX(moveX);
  };

  const handleMouseLeave = () => {
    setOffsetX(0);
  };

  return (
    <div className="flex flex-col gap-2">
      {testimonials.map((testimonial, index) => (
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative h-28 w-full rounded-md border px-4 py-3 before:absolute before:top-0 before:left-0 before:-z-10 before:block before:h-0 before:w-full before:rounded-md before:bg-[#1d3fb8] before:transition-all before:duration-100 before:ease-linear hover:before:h-full"
          key={index}
        >
          <div
            style={{
              transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
            }}
            className="absolute top-1/2 left-2/3 z-10 flex h-72 w-56 flex-col justify-around rounded-lg bg-[#001A73] p-1.5 px-2 opacity-0 transition-all duration-150 ease-out group-hover:opacity-100 border-[#4F7BFF]/20"
          >
            <h1 className="text-white">{testimonial.role}</h1>

            <p className="text-base leading-relaxed text-white/90">
              <i>{testimonial.testimony}</i>
            </p>

            <p className="text-sm text-[#93B3FF]">--- {testimonial.name}</p>
          </div>

          <div className="flex items-center gap-4 group-hover:text-zinc-200">
            <div className="z-50 size-20 rounded-full ">
              <GeneratedAvatar variant="bottsNeutral" seed={testimonial.name} className="h-full w-full"/>
            </div>

            <h2 className="text-2xl">{testimonial.name}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
