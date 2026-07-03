import React from "react";

interface TagBadgeProps {
  label: string;
  variant?: "default" | "outline";
}

export default function TagBadge({
  label,
  variant = "default",
}: TagBadgeProps) {
  if (variant === "outline") {
    return (
      <span className="tag-badge bg-zinc-800/60 text-zinc-400 px-1.5 py-0.5 rounded text-[9px] font-mono border border-zinc-700/40">
        {label}
      </span>
    );
  }

  return (
    <span className="tag-badge bg-zinc-800/80 text-zinc-300 px-1.5 py-0.5 rounded text-[9px] font-mono border border-zinc-700/50">
      {label}
    </span>
  );
}
