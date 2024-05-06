import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b px-2 py-4 mx-1.5 dark:border-neutral-800">
      <menu className="flex gap-2 justify-end *:border-b *:px-2 py-1 dark:*:border-neutral-800">
        <li>
          <Link href={"#"}>Soluções</Link>
        </li>
        <li>
          <Link href={"/articles"}>Artigos</Link>
        </li>
      </menu>
    </nav>
  )
}
