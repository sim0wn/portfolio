import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <section className="container flex flex-1 flex-col gap-2 p-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-40 w-full self-center text-lg font-semibold md:self-start"
        />
      ))}
    </section>
  )
}
