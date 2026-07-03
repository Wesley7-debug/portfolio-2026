// import React from "react";
// import SectionLabel from "../ui/SectionLabel";
// import TagBadge from "../ui/TagBadge";

// export default function PositionColumn() {
//   return (
//     <div className="flex flex-col space-y-1">
//       <SectionLabel label="Position" />
//       <div className="column-content space-y-3">
//         <div className="space-y-0.5">
//           <p className="text-white font-medium tracking-wide">
//             Code Resolution®
//           </p>
//           <p className="text-zinc-400 font-light">
//             Freelance Fullstack Developer
//           </p>
//         </div>
//         <div className="space-y-1">
//           <TagBadge label="Avg. project costs" variant="outline" />
//           <p className="text-zinc-300 mt-1.5 font-light">
//             Dev: ~£25-60K(=$35-80K)
//           </p>
//           <p className="text-zinc-400 font-light">
//             Design + dev: ~£50-120K(=$67-160K)
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import SectionLabel from "../ui/SectionLabel";
import TagBadge from "../ui/TagBadge";

export default function PositionColumn() {
  return (
    <div className="flex flex-col space-y-1">
      <SectionLabel label="Position" />
      <div className="column-content space-y-3">
        <div className="space-y-0.5">
          <p className="text-white font-medium tracking-wide">Freelancer®</p>
          <p className="text-zinc-400 font-light">
            Freelance Fullstack Developer
          </p>
        </div>
        <div className="space-y-1">
          <TagBadge label="Core Expertise" variant="outline" />
          <p className="text-zinc-300 mt-1.5 font-light">
            Next.js • GSAP • Node.js
          </p>
          <p className="text-zinc-400 font-light">
            UI/UX Engineering & AI Integration
          </p>
        </div>
      </div>
    </div>
  );
}
