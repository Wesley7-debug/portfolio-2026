import React from "react";
import SectionLabel from "../ui/SectionLabel";
import CornerButton from "../ui/CornerButton";
import HoverUnderline from "../ui/HoverUnderline";

const CONNECT_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/wesley-eugene" },
  { label: "Email", href: "mailto:eugenefidelis573@gmail.com" },
  { label: "Twitter/X", href: "https://x.com/slycodez" },
  { label: "Github", href: "https://github.com/Wesley7-debug " },
];

const ACTION_BUTTONS = [
  { label: "Contact", href: "mailto:eugenefidelis573@gmail.com" },
  {
    label: "Resume",
    href: "pdf/Eugene_Fidelis_ATS_Resume_One_Page.pdf",
    download: true,
  },
];

export default function ConnectColumn() {
  return (
    <div className="flex flex-col gap-3 sm:gap-2.5 h-auto min-h-0">
      <div className="space">
        <SectionLabel label="Connect" />
        <ul className="column-content text-zinc-400 font-light text-[11px] md:text-[11px] space-y-1">
          {CONNECT_LINKS.map((link) => (
            <li key={link.label}>
              <HoverUnderline>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </HoverUnderline>
            </li>
          ))}
        </ul>
      </div>

      <div className="column-content md:mt-3 mt-1 space-y-2 sm:space-y-2">
        <div className="text-[13px]  md:text-[11px] sm:text-[14px] text-zinc-400 font-light leading-tight">
          Available All Year
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {ACTION_BUTTONS.map((btn) => (
            <CornerButton
              key={btn.label}
              href={btn.href}
              download={btn.download}
            >
              {btn.label}
            </CornerButton>
          ))}
        </div>
      </div>
    </div>
  );
}
