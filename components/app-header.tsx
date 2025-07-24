"use client";

import {Snowflake} from "lucide-react";
import {IconSwitch} from "@/components/icon-switch";
import {ModeToggle} from "@/components/mode-toggle";
import {SnowfallWrapper} from "@/components/snowfall-wrapper";
import {useEffect, useState} from "react";

export function AppHeader() {
  const [snowfall, setSnowfall] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    if (localStorage.getItem("snowfall") === "false") {
      setSnowfall(false)
    } else {
      setSnowfall(true)
    }
  }, [])

  const toggleSnowfall = (checked: boolean) => {
    if (checked) {
      setSnowfall(true)
      localStorage.setItem("snowfall", "true")
    } else {
      setSnowfall(false)
      localStorage.setItem("snowfall", "false")
    }
  }

  return (
    <>
      {snowfall && <SnowfallWrapper />}
      <div className="flex justify-end sticky top-0 z-50 items-center h-[50px] gap-2">
        <IconSwitch icon={<Snowflake />} checked={snowfall || false} onChange={toggleSnowfall} />
        <div>
          <ModeToggle />
        </div>
      </div>
    </>
  )
}
