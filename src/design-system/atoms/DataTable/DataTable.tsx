import type { ReactNode } from 'react'

export type DataTableColumn = {
  key: string
  header: string
}

export type DataTableRow = {
  id: string
  cells: Record<string, ReactNode>
}

type DataTableProps = {
  caption: string
  columns: DataTableColumn[]
  rows: DataTableRow[]
}

export function DataTable({ caption, columns, rows }: DataTableProps) {
  return (
    <div className="overflow-x-auto" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-(--table-min-width) border-collapse text-left font-ui text-caption tabular-nums">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="border-b border-text py-2 pr-3 font-medium text-text-muted"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="border-b border-border py-2 pr-3 align-top text-text"
                >
                  {row.cells[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
