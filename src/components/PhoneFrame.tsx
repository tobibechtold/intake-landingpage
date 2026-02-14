import React from "react";
import iphoneBezel from "@/assets/iphone-bezel.png";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="relative inline-block">
      {/* Screen content behind the bezel */}
      <div
        className="absolute rounded-[12.5%] overflow-hidden"
        style={{
          top: "1.8%",
          left: "3.8%",
          right: "3.8%",
          bottom: "2.4%",
        }}
      >
        {children}
      </div>
      {/* Bezel overlay on top */}
      <img
        src={iphoneBezel}
        alt=""
        aria-hidden="true"
        className="relative z-10 w-full h-auto pointer-events-none select-none"
        draggable={false}
      />
    </div>
  );
};

export default PhoneFrame;
