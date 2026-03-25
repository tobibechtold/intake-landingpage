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
        className="absolute overflow-hidden rounded-[8%]"
        style={{
          top: "2.4%",
          left: "5.1%",
          right: "5.1%",
          bottom: "2.08%",
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
