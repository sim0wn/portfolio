import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b px-2 flex py-4 justify-center mx-1.5 dark:border-neutral-800">
      <Link href={"/"} className="flex text-2xl">
        ~/
      </Link>
      <menu className="flex flex-1 gap-2 justify-end *:border-b *:px-2 py-1 dark:*:border-neutral-800">
        <li>
          <Link href={"/solutions"}>~/soluções</Link>
        </li>
        <li>
          <Link href={"/articles"}>~/artigos</Link>
        </li>
      </menu>
    </nav>
  )
}
