import Image from "next/image";
import {TextTooltip} from "@/components/text-tooltip";

export default function Home() {
  const darkFilter = "brightness(0) saturate(100%) invert(0%) sepia(100%) saturate(7500%) hue-rotate(347deg) brightness(105%) contrast(111%)"
  const lightFilter = "brightness(0) saturate(100%) invert(100%) sepia(94%) saturate(6%) hue-rotate(267deg) brightness(104%) contrast(102%)"

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      </main>
    </div>
  );
}
