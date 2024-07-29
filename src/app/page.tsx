import classNames from "classnames"
import Image from "next/image"

import { jetbrains_mono } from "./fonts"

export default function Home() {
  return (
    /* main container */
    <main className="flex sm:flex-row-reverse flex-col place-items-center justify-center gap-4 p-2">
      {/* logo */}
      <Image
        alt="AI generated image."
        className="rounded-full"
        height={250}
        src={"/images/sim0wn.jpg"}
        width={250}
      />
      <aside className="max-w-lg">
        <h1 className="font-semibold text-xl">Hello, friend.</h1>
        <h2 className="font-semibold text-xl">
          I&apos;m sim0wn, an ethical hacker.
        </h2>
        <p className={classNames(jetbrains_mono.className, "text-lg")}>
          Welcome to my portfolio! I&apos;m a self-taught developer and
          penetration tester specializing in web application vulnerability
          assessment.
        </p>
      </aside>
    </main>
  )
}
