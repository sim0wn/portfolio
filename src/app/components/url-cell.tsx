"use client"

import { HackTheBox } from "@/components/icons"
import { ExternalLink } from "@/components/ui/external-link"
import { Hacktivity } from "@/types/hacktivity.type"
import { Row } from "@tanstack/react-table"
import { useEffect, useState } from "react"

export const urlCell = ({ row }: { row: Row<Hacktivity> }) => {
  const [url, _] = useState(String(row.getValue("url")))
  const [icon, setIcon] = useState(<></>)

  useEffect(() => {
    if (url.includes("hackthebox")) {
      setIcon(<HackTheBox />)
    }
  }, [url])
  return <ExternalLink href={url}>{icon}</ExternalLink>
}
