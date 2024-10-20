import { Table } from "@/types/sanity-schema.type"
import { urlFor } from "@/utils/image.util"
import { getImageDimensions } from "@sanity/asset-utils"
import { PortableTextComponents } from "next-sanity"
import NextImage from "next/image"
import { ReactNode } from "react"

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({
      value,
    }: {
      value: {
        _type: string
        alt: string
        _key: string
        asset: {
          _ref: string
          _type: string
        }
      }
    }) => {
      console.log(value)
      return (
        <NextImage
          alt={value.alt}
          src={urlFor(value).url()}
          {...getImageDimensions(value)}
        />
      )
    },
    table: ({ value }: { value: Table }) => (
      <table>
        {value.caption && <caption>{value.caption}</caption>}
        <thead>
          {value.thead.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.headers?.map((header, headerIndex) => (
                <th key={headerIndex}>{header}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {value.tbody.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.data?.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-inside list-disc">{children}</ul>
    ),
  },
}
