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
    <div className="flex flex-col space-y-2 h-full justify-between min-h-[220px]">
      <div className="space-y-2">
        <SectionLabel label="Connect" />
        <ul className="column-content text-zinc-400 font-light text-base sm:text-[16px] space-y-1">
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

      <div className="column-content space-y-4">
        <div className="text-[13px] hidden md:block sm:text-[14px] text-zinc-400 font-light leading-tight">
          Available All Year
        </div>

        <div className="flex flex-wrap items-center gap-3">
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
