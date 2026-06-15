import grainImage from "@/assets/images/grain.jpg";
import { twMerge } from "tailwind-merge";
import { ComponentPropsWithoutRef } from "react";

export const Card = ({ className, children, ...other }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      className={twMerge(
        "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl relative z-0 overflow-hidden shadow-xl shadow-black/5 transition-all duration-300",
        className
      )}
      {...other}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      />
      {children}
    </div>
  );
};
