import { cn } from "@/utils"

export function SpinnerOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        "bg-background/70 pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-colors",
        className,
      )}
    >
      <div className="relative h-12 w-12">
        {/* Outer animated ring */}
        <span
          aria-hidden="true"
          className={cn(
            "border-muted block h-12 w-12 animate-[spin_1.2s_cubic-bezier(0.44,0.08,0.56,0.99)_infinite] rounded-full border-4",
            "border-t-primary border-r-primary/60 border-b-muted-foreground/30 border-l-muted-foreground/30",
            "shadow-xl",
          )}
        />
        {/* Inner static circle for depth */}
        <span
          aria-hidden="true"
          className={cn(
            "from-primary/30 to-primary/5 absolute inset-2 block h-8 w-8 rounded-full bg-gradient-to-br",
          )}
        />
      </div>
    </div>
  )
}
