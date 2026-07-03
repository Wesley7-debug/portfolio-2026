import React from "react";

interface CornerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: string | boolean;
}

const baseStyles =
  "inline-flex border border-zinc-800/80 hover:border-zinc-600 text-zinc-400 hover:text-white transition-all px-3 py-1 rounded bg-zinc-900/20 relative tracking-wider uppercase text-[13px] md:text-[11px] font-mono no-underline";

export default function CornerButton({
  children,
  onClick,
  href,
  download,
}: CornerButtonProps) {
  const corners = (
    <>
      <span className="absolute top-0 left-0 border-t border-l border-zinc-600 w-1 h-1" />
      <span className="absolute bottom-0 right-0 border-b border-r border-zinc-600 w-1 h-1" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className={baseStyles}
      >
        {corners}
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseStyles}>
      {corners}
      {children}
    </button>
  );
}
