/**
 * Skeleton loader for sidebar layout with SidebarMenuSkeleton.
 * Production-ready, minimal, accessible, and scalable.
 */

import { SidebarMenuSkeleton, Skeleton } from "@/components"

export default function Loading() {
  return (
    <div className="container flex min-h-[calc(100vh-var(--header-height))]">
      {/* Sidebar */}
      <aside
        aria-label="Sidebar navigation loading"
        className="sticky top-(--header-height) flex h-[calc(100svh-var(--header-height))] min-h-0 w-72 flex-col gap-2 pr-2 max-md:hidden"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuSkeleton key={index} />
        ))}
      </aside>
      {/* Main content skeleton */}
      <section
        aria-label="Main content loading"
        className="flex max-w-full min-w-0 flex-1 flex-col gap-4 p-6"
      >
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 pb-2">
          <Skeleton className="h-4 w-40 rounded" />
        </div>
        {/* Page title */}
        <Skeleton className="mb-2 h-10 w-80 rounded" />
        {/* Cards de conteúdo principal */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              className="bg-card flex flex-col gap-2 rounded-lg p-4 shadow"
              key={i}
            >
              <Skeleton className="h-6 w-1/3 rounded" />
              <Skeleton className="h-4 w-full rounded" />
            </div>
          ))}
        </div>
        {/* Footer navegação */}
        <footer className="mt-auto flex flex-col gap-2">
          <Skeleton className="h-4 w-48 rounded" />
          <div className="flex gap-4">
            <div className="bg-card flex flex-1 flex-col gap-2 rounded-lg p-4 shadow">
              <Skeleton className="mb-2 h-6 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
            {/* Se houver próxima página */}
            <div className="bg-card flex flex-1 flex-col gap-2 rounded-lg p-4 shadow">
              <Skeleton className="mb-2 h-6 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}
