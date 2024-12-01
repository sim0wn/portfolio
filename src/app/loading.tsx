import { Lettermark } from "@/components/icons"

export default function Loading() {
  return (
    <main className="container flex w-full flex-1 flex-col place-content-center items-center gap-2">
      <Lettermark className="text-5xl" />
      <div
        className="relative h-2 w-48 overflow-hidden rounded-md bg-neutral-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="animate-progress-bar absolute left-0 top-0 h-full w-1/2 bg-purple-1000"></div>
      </div>
    </main>
  )
}
