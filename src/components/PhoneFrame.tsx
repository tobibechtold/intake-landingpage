import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="relative inline-block">
      {/* Phone outer frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-[10px] shadow-2xl">
        {/* Inner bezel */}
        <div className="relative bg-black rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[28px] bg-black rounded-full" />
          
          
          {/* Screen content */}
          <div className="relative aspect-[1320/2868]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
