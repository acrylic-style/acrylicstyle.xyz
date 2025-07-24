import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {JSX} from "react";

export function TextTooltip(props: { text: string, children: JSX.Element }) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          {props.children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.text}</p>
        </TooltipContent>
      </Tooltip>
    </>
  )
}
