import React from "react";

export default function ProfileAvatar() {
  return (
    <div className="w-9 h-9 bg-zinc-800 rounded overflow-hidden shrink-0 border border-zinc-700">
      <img
        src="/images/fidelis.png"
        alt="Eugene Fidelis"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
