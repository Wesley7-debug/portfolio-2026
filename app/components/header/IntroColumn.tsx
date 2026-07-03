// import React from "react";
// import SectionLabel from "../ui/SectionLabel";
// import ProfileAvatar from "../ui/ProfileAvatar";

// export default function IntroColumn() {
//   return (
//     <div className="flex flex-col space-y-1">
//       <SectionLabel label="Intro" />
//       <div className="column-content space-y-1">
//         <div className="flex items-start space-x-3">
//           <ProfileAvatar />
//           <div>
//             <h1 className="font-bold text-white text-[12px] leading-tight tracking-wide">
//               Eugene Fidelis
//             </h1>
//             <p className="text-zinc-400 font-light mt-0.5">
//               Creative Developer
//             </p>
//             <p className="text-zinc-500 font-mono text-[10px]">2003</p>
//           </div>
//         </div>
//         <div className="space-y-0.5 text-zinc-400 font-light">
//           <p>🇬🇧 Nigeria: Ph [20:36].</p>
//           <p>🌏 Built for Global Collabs.</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useCallback } from "react";
import SectionLabel from "../ui/SectionLabel";
import ProfileAvatar from "../ui/ProfileAvatar";
import ProfileModal from "../ui/ProfileModal";

export default function IntroColumn() {
  const [time, setTime] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const openProfile = useCallback(() => setIsProfileOpen(true), []);
  const closeProfile = useCallback(() => setIsProfileOpen(false), []);

  return (
    <>
      <div className="flex flex-col space-y-2">
        <SectionLabel label="Intro" />

        <div className="column-content space-y-2">
          <button
            type="button"
            onClick={openProfile}
            className="flex items-start space-x-4 group"
          >
            <ProfileAvatar />

            <div>
              <h1 className="font-bold text-white text-[15px] sm:text-[17px] leading-tight tracking-wide">
                Eugene Fidelis
              </h1>

              <p className="text-zinc-400 font-light mt-0.5 text-base sm:text-[16px]">
                Creative Developer
              </p>

              <p className="text-zinc-500 font-mono text-[12px] sm:text-[13px]">
                2003
              </p>
            </div>

            <div className="ml-3 flex items-center gap-1.5">
              <span className="block w-0.5 h-5 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
              <span className="block w-0.5 h-5 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
              <span className="block w-0.5 h-5 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
            </div>
          </button>

          <div className="space-y-1 text-zinc-400 font-light text-base sm:text-[16px]">
            <p>🇳🇬 Nigeria · {time || "--:--:--"} WAT</p>
            <p>🌍 Available for collaborations.</p>
          </div>
        </div>
      </div>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={closeProfile}
        imageSrc="/images/fidelis.png"
      />
    </>
  );
}
