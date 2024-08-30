"use client"

import { Hamburger } from "@/app/components/icons/hamburger"
import classNames from "classnames"
import Link from "next/link"
import { HTMLAttributes, useState } from "react"

import { BusinessUserCurriculum } from "./icons/business-user-curriculum"
import { GiftOfKnowledge } from "./icons/gift-of-knowledge"
import { SquareArticle } from "./icons/square-article"

export default function Navbar({
  className,
  dictionary,
}: { dictionary: any } & HTMLAttributes<HTMLDivElement>) {
  const [expanded, setExpanded] = useState(false)
  return (
    <nav className="grid grid-cols-[min-content_1fr] items-center" id="navbar">
      <Link href={"/"}>sim0wn</Link>
      <button
        aria-controls="navbar"
        aria-expanded={expanded}
        className="inline-flex place-self-end text-end items-center p-2 w-10 h-10 justify-center text-2xl rounded-lg md:hidden hover:bg-neutral-900 focus:ring-neutral-800 focus:ring-2"
        data-collapse-toggle="navbar-default"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <span className="sr-only">
          {dictionary.navigation_bar.sr_open_menu_button}
        </span>
        <Hamburger />
      </button>
      <menu
        className={classNames(
          { hidden: expanded ? false : true },
          "w-full col-span-full place-self-end", // general style
          "flex-col justify-end border rounded-lg border-neutral-800 bg-neutral-900 my-4 p-2 gap-2", // mobile style
          "md:w-fit md:col-span-1 md:flex md:flex-row md:border-0 md:bg-neutral-950 md:gap-4", // desktop style
          "*:flex *:gap-2 *:items-center *:group", // children style
        )}
      >
        <li>
          <SquareArticle />
          <Link href={"/articles"}>{dictionary.navigation_bar.articles}</Link>
        </li>
        <li>
          <GiftOfKnowledge />
          <Link
            href={"https://knowledge.sim0wn.com/"}
            rel="noopener noreferrer"
            target="_blank"
          >
            {dictionary.navigation_bar.knowledge_base}
          </Link>
        </li>
        <li className="group">
          <BusinessUserCurriculum
            className={classNames(
              "md:text-2xl md:rounded-md md:bg-purple-plum md:p-1",
              "md:animate-[pulse_2.5s_ease-in-out_infinite]", // animation
              "md:group-hover:animate-none", // hover style
            )}
          />
          <Link
            className={classNames(
              "md:max-w-0 md:opacity-0 md:overflow-hidden md:whitespace-nowrap", // desktop style
              "group-hover:max-w-xs group-hover:opacity-100", // hover style
              "transition-[opacity,max-width] duration-300 ease-in-out", // transition properties
            )}
            href={"/whoami"}
          >
            {dictionary.navigation_bar.whoami}
          </Link>
        </li>
      </menu>
    </nav>
  )
}
