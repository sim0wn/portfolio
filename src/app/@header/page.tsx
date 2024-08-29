"use client"

import classNames from "classnames"
import Link from "next/link"
import { useState } from "react"

import { lato } from "../fonts"
import { BusinessUserCurriculum } from "./components/icons/business-user-curriculum"
import { GiftOfKnowledge } from "./components/icons/gift-of-knowledge"
import { Hamburger } from "./components/icons/hamburger"
import { SquareArticle } from "./components/icons/square-article"

export default function Header() {
  const [expanded, setExpanded] = useState(false)
  return (
    <header
      className={classNames(
        lato.className,
        "px-2 flex flex-wrap items-center justify-between py-3",
      )}
    >
      <Link href={"/"}>sim0wn</Link>
      <button
        aria-controls="navbar"
        aria-expanded={expanded}
        className="inline-flex text-end items-center p-2 w-10 h-10 justify-center text-2xl rounded-lg md:hidden hover:bg-neutral-900 focus:ring-neutral-800 focus:ring-2"
        data-collapse-toggle="navbar-default"
        onClick={() => setExpanded(!expanded)}
        type="button"
      >
        <span className="sr-only">Open main menu</span>
        <Hamburger />
      </button>
      <nav
        className={classNames(
          { hidden: expanded ? false : true },
          "w-full md:w-fit md:block",
        )}
        id="navbar"
      >
        <menu
          className={classNames(
            "flex", // general style
            "flex-col justify-end border rounded-lg border-neutral-800 bg-neutral-900 my-2 p-2 gap-2", // mobile style
            "md:flex-row md:border-0 md:my-0 md:bg-neutral-950 md:gap-4", // desktop style
            "*:flex *:gap-2 *:items-center *:group", // children style
          )}
        >
          <li>
            <SquareArticle />
            <Link href={"/articles"}>Articles</Link>
          </li>
          <li>
            <GiftOfKnowledge />
            <Link
              href={"https://knowledge.sim0wn.com/"}
              rel="noopener noreferrer"
              target="_blank"
            >
              Knowledge Base
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
              Who am I
            </Link>
          </li>
        </menu>
      </nav>
    </header>
  )
}
