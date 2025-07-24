import {TextTooltip} from "@/components/text-tooltip";
import Image from "next/image";

export function AppFooter() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center h-12">
      <TextTooltip text="perfectboat (formerly known as PerfectBoat#0001)">
        <div className="flex items-center gap-2 hover:underline hover:underline-offset-4">
          <Image
            src="/discord.svg"
            alt="Discord icon"
            width={16}
            height={16}
          />
          Discord
        </div>
      </TextTooltip>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/acrylic-style"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/github.svg"
          alt="GitHub icon"
          width={16}
          height={16}
        />
        GitHub
      </a>
    </footer>
  )
}
