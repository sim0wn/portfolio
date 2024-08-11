"use client"

import classNames from "classnames"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [expanded, setExpanded] = useState(false)
  return (
    <header className="px-2 flex flex-wrap items-center justify-between py-3">
      <Link href={"/"}>sim0wn</Link>
      <button
        aria-controls="navbar"
        aria-expanded={expanded}
        className="inline-flex text-end items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-neutral-900 focus:ring-neutral-800 focus:ring-2"
        data-collapse-toggle="navbar-default"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 17 14"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1h15M1 7h15M1 13h15"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
      <nav
        className={classNames(
          { hidden: expanded ? false : true },
          "w-full md:w-fit md:block",
        )}
        id="navbar"
      >
        <menu className="flex gap-2 justify-end *:px-2 *:py-0.5 flex-col border rounded-lg border-neutral-800 bg-neutral-900 my-2 p-1.5 md:py-1 md:px-0 md:flex-row md:border-0 md:my-0 md:bg-neutral-950">
          <li>
            <Link href={"/articles"}>Articles</Link>
          </li>
          <li>
            <Link
              href={"https://knowledge.sim0wn.com/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              Knowledge Base
            </Link>
          </li>
          <li className="bg-purple-800 rounded-lg font-bold">
            <Link href={"/whoami"}>Who Am I</Link>
          </li>
        </menu>
      </nav>
    </header>
  )
}
