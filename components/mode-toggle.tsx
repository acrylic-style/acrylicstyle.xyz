"use client"

import * as React from "react"
import {Moon, Sun} from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {useEffect, useState} from "react";

export function ModeToggle() {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const { theme, setTheme } = useTheme()

  const currentIcon = theme === "dark" ? <Moon /> : <Sun />

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button size="icon" onClick={toggleTheme}>
      {mounted && currentIcon}
    </Button>
  )
}
