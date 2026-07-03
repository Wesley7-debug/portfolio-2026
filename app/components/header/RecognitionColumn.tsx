// import React from "react";
// import SectionLabel from "../ui/SectionLabel";
// import TagBadge from "../ui/TagBadge";

// const RECOGNITION_TAGS = ["Awwwards", "/CSSDA", "/FWA", "/GSAP"];

// export default function RecognitionColumn() {
//   return (
//     <div className="flex flex-col space-y-1">
//       <SectionLabel label="Recognition" />
//       <div className="column-content space-y-3">
//         <div className="flex flex-wrap gap-1">
//           {RECOGNITION_TAGS.map((tag) => (
//             <TagBadge key={tag} label={tag} />
//           ))}
//         </div>
//         <div className="text-zinc-300 space-y-0.5 font-light">
//           <p>21x Site Of The Day</p>
//           <p>08x Developer Award /Mobile Excellence</p>
//           {/* <p>28x Honors /Special Kudos</p> */}
//         </div>
//         <div className="space-y-1 pt-1">
//           <TagBadge label="Highlights" variant="outline" />
//           <div className="text-zinc-400 mt-1.5 space-y-1 font-light leading-normal">
//             <p>Awwwards Site Of The Year Nominee</p>
//             <p>Awwwards Site Of The Year Nominee</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import SectionLabel from "../ui/SectionLabel";
import TagBadge from "../ui/TagBadge";

const BUILDING_TAGS = ["/AI", "/SaaS", "/UI", "/Motion"];

export default function CurrentlyBuildingColumn() {
  return (
    <div className="flex flex-col space-y-1">
      <SectionLabel label="Currently Building" />

      <div className="column-content space-y-3">
        <div className="flex flex-wrap gap-1">
          {BUILDING_TAGS.map((tag) => (
            <TagBadge key={tag} label={tag} />
          ))}
        </div>

        <div className="text-zinc-300 space-y-0.5 font-light">
          <p>Axela — AI customer support platform</p>
          <p>Lofti UI — Animated React component library</p>
        </div>

        {/* <div className="space-y-1 pt-1">
          <TagBadge label="Goals" variant="outline" />

          <div className="text-zinc-400 mt-1.5 space-y-1 font-light leading-normal">
            <p>Shipping new features every week</p>
            <p>Growing toward 100+ active users</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
