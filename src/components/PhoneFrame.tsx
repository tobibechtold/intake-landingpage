import React from "react";
import iphoneBezel from "@/assets/iphone-bezel.png";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneFrame = ({ children, className }: PhoneFrameProps) => {
  return (
    <div className={cn("relative inline-block", className)}>
      <div
        className="absolute overflow-hidden rounded-[12.5%]"
        style={{
          top: "2.4%",
          left: "3.8%",
          right: "3.8%",
          bottom: "2.4%",
        }}
      >
        {children}
      </div>
      <img
        src={iphoneBezel}
        alt=""
        aria-hidden="true"
        className="pointer-events-none relative z-10 h-auto w-full select-none"
        draggable={false}
      />
    </div>
  );
};

export default PhoneFrame;
