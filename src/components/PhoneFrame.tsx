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
          
          {/* Status bar overlay */}
          <div className="absolute top-0 left-0 right-0 z-10 h-12 px-6 flex items-end pb-1 justify-between text-white text-sm font-semibold bg-gradient-to-b from-black/60 to-transparent">
            {/* Left - Time */}
            <span className="w-16 text-left">09:41</span>
            
            {/* Right - Icons */}
            <div className="w-16 flex items-center justify-end gap-1">
              {/* Cellular signal */}
              <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="0.5" />
                <rect x="5" y="5" width="3" height="7" rx="0.5" />
                <rect x="10" y="2" width="3" height="10" rx="0.5" />
                <rect x="15" y="0" width="3" height="12" rx="0.5" />
              </svg>
              
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M8 9.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 5c2.5 0 4.5 1.5 5.5 3l-1.5 1C11 8 9.5 7 8 7s-3 1-4 2L2.5 8C3.5 6.5 5.5 5 8 5zm0-5c4 0 7.5 2 9.5 5l-1.5 1C14.5 4 11.5 2 8 2S1.5 4 0 6L-1.5 5C.5 2 4 0 8 0z" />
              </svg>
              
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-[22px] h-[11px] border border-white/50 rounded-[3px] flex items-center p-[1px]">
                  <div className="w-full h-full bg-white rounded-[1.5px]" />
                </div>
                <div className="w-[1.5px] h-[4px] bg-white/50 rounded-r-sm ml-[1px]" />
              </div>
            </div>
          </div>
          
          {/* Screen content */}
          <div className="relative aspect-[9/19.5]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
