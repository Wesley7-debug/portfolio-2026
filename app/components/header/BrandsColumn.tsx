import React from "react";
import SectionLabel from "../ui/SectionLabel";

const BRANDS = [
  "Starseed",
  "Axela",
  "Kingseed",
  "nudelab",
  "Vivienne ",
  "Live Nation",
];

export default function BrandsColumn() {
  return (
    <div className="flex flex-col space-y-1 overflow-hidden">
      <SectionLabel label="Brands" />
      <ul className="column-content text-zinc-400 text-[11px] md:text-[11px] font-light max-h-[220px] overflow-y-auto pr-2">
        {BRANDS.map((brand) => (
          <li key={brand}>{brand}</li>
        ))}
      </ul>
    </div>
  );
}
