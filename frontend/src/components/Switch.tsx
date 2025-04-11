"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-7 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
      // ✅ light and dark mode colors for track
      "data-[state=checked]:bg-yellow-400",
      "data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
      "focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        // ✅ light and dark thumb color
        "pointer-events-none block h-6 w-6 rounded-full shadow-lg ring-0 transition-transform",
        "bg-white dark:bg-gray-100",
        "data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }