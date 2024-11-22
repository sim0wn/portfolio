"use client"

import { Hacktivity } from "@/types/hacktivity.type"
import { Row } from "@tanstack/react-table"
import { formatDate, formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import { ptBR } from "date-fns/locale/pt-BR"
import { useEffect, useState } from "react"

export const dateCell = ({ row }: { row: Row<Hacktivity> }) => {
  const date = new Date(row.getValue("date"))
  const [formattedDate, setFormattedDate] = useState<string>(
    formatDate(date, "PP"),
  )

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const locale = navigator.language === "pt-BR" ? ptBR : enUS

      const formatted = formatDistanceToNow(date, {
        addSuffix: true,
        locale,
      })
      setFormattedDate(formatted)
    }
  }, [row])

  return formattedDate
}
