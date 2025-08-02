"use client";

import Image from "next/image";
import {ChevronDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRef} from "react";
import LoveList from "@/components/love-list";

export default function Home() {
  const abilitiesTagRef = useRef<HTMLDivElement>(null)

  const scrollTo = (tag: HTMLElement) => {
    window.scrollTo({ top: tag.offsetTop, behavior: "smooth" })
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center h-full w-full">
        {/* background image */}
        <div
          className="dark:hidden absolute top-0 left-0 h-full w-full bg-cover z-[-1]"
          style={{backgroundImage: "url(/2025-07-24_22.07.00.webp)"}}
        ></div>
        <div
          className="not-dark:hidden absolute top-0 left-0 h-full w-full bg-cover z-[-1]"
          style={{backgroundImage: "url(/2025-07-24_22.06.51_4K.webp)"}}
        ></div>
        <div className="flex flex-col gap-[160px] items-center h-full w-full justify-between">
          {/* dummy element */}
          <div></div>
          {/* main contents */}
          <div className="flex items-center gap-16">
            <Image alt="avatar.webp" src="/avatar.webp" width={200} height={200} className="rounded-full w-[200px] max-sm:w-[150px]" />
            <div className="flex flex-col gap-2">
              <h2 className="text-6xl max-sm:text-3xl">ぱーぼー</h2>
              <h3 className="text-2xl max-sm:text-xl">a.k.a. PerfectBoat</h3>
            </div>
          </div>
          <Button size="icon" onClick={() => scrollTo(abilitiesTagRef.current!)}>
            <ChevronDown />
          </Button>
        </div>
        <div ref={abilitiesTagRef} className="mt-[20vh] max-sm:mt-[30vh] w-full h-full">
          <LoveList />
        </div>
      </main>
    </div>
  );
}
