import { Lettermark } from "@/components/icons"

export default function Loading() {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-start gap-2">
      <div
        className="relative h-2 w-full overflow-hidden bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="animate-progress-bar absolute left-0 top-0 h-full w-1/2 bg-purple-1000"></div>
      </div>
    </main>
  )
}
