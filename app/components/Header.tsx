"use client";

import React, { useState, useCallback } from "react";
import IntroColumn from "./header/IntroColumn";
import PositionColumn from "./header/PositionColumn";
import RecognitionColumn from "./header/RecognitionColumn";
import BrandsColumn from "./header/BrandsColumn";
import ConnectColumn from "./header/ConnectColumn";
import ProfileAvatar from "./ui/ProfileAvatar";
import CredentialsModal from "./ui/CredentialsModal";
import ProfileModal from "./ui/ProfileModal";
import Fall from "./Fall";

const COLUMNS = [
  IntroColumn,
  PositionColumn,
  RecognitionColumn,
  BrandsColumn,
  ConnectColumn,
];

interface HeaderProps {
  loaded?: boolean;
}

export default function Header({ loaded = false }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const openProfileModal = useCallback(() => setIsProfileModalOpen(true), []);
  const closeProfileModal = useCallback(() => setIsProfileModalOpen(false), []);

  return (
    <>
      <header className="w-full fixed overflow-hidden top-0 left-0 z-50 text-[#e5e5e5] font-Sora text-[11px] leading-relaxed px-4 sm:px-6 py-6 md:py-8 select-none bg-[#0a0a0a]">
        <Fall play={loaded} delay={0.1} color="#7c52ff">
          <div className="w-full hidden lg:grid grid-cols-5 gap-x-16 gap-y-10 items-start">
            {COLUMNS.map((Column, idx) => (
              <Column key={idx} />
            ))}
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={openProfileModal}
              className="flex items-center gap-3 text-left group"
            >
              <ProfileAvatar />
              <div className="leading-tight">
                <h1 className="font-bold text-white text-xs tracking-wide uppercase">
                  Eugene Fidelis
                </h1>
                <p className="text-zinc-400 font-light text-[11px]">
                  Creative Web Developer
                </p>
              </div>
              <div className="ml-2 flex items-center gap-1.5">
                <span className="block w-0.5 h-4 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
                <span className="block w-0.5 h-4 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
                <span className="block w-0.5 h-4 bg-zinc-600 group-hover:bg-purple-400 transition-colors rounded-full" />
              </div>
            </button>
            <button
              onClick={isModalOpen ? closeModal : openModal}
              className="flex flex-col transition-colors text-sm sm:text-base tracking-wide leading-tight uppercase font-semibold items-end"
            >
              Credentials
              <span className="text-[11px] sm:text-[12px] text-zinc-400 items-start">
                {isModalOpen ? "close[-]" : "open[+]"}
              </span>
            </button>
          </div>
        </Fall>
      </header>

      <CredentialsModal isOpen={isModalOpen} onClose={closeModal} />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        imageSrc="/images/fidelis.png"
      />
    </>
  );
}
