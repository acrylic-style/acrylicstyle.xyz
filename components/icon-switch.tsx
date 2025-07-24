import {Switch} from "@/components/ui/switch";
import {JSX} from "react";
import {cn} from "@/lib/utils";

const baseClassName = "h-[35px] rounded-full bg-secondary px-4 py-2 gap-1 items-center justify-center inline-flex"

export function IconSwitch(props: {
  icon: JSX.Element,
  className?: string,
  checked?: boolean,
  onChange?: (checked: boolean) => void,
}) {
  const className = cn(baseClassName, props.className)
  return (
    <div className={className}>
      {props.icon}
      <Switch className="cursor-pointer" checked={props.checked} onCheckedChange={props.onChange} />
    </div>
  )
}
