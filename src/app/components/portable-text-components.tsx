import { PortableTextComponents } from "next-sanity"
import { Table } from "sanity.types"

export const portableTextComponents: PortableTextComponents = {
  types: {
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
}
