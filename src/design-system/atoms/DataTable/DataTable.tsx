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
  // The column that names each row. Its cells become row headers, so a screen reader can say which row a cell is in.
  rowHeaderKey?: string
  // For a table with long cells that should scroll sideways sooner, instead of squeezing.
  isWide?: boolean
}

const cellClass = 'border-b border-border py-2 pr-3 align-top text-text'

export function DataTable({
  caption,
  columns,
  rows,
  rowHeaderKey,
  isWide = false,
}: DataTableProps) {
  const minWidthClass = isWide ? 'min-w-(--table-min-width-wide)' : 'min-w-(--table-min-width)'

  return (
    <div className="overflow-x-auto" role="region" aria-label={caption} tabIndex={0}>
      <table
        className={`w-full ${minWidthClass} border-collapse text-left font-ui text-caption tabular-nums`}
      >
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
              {columns.map((column) =>
                column.key === rowHeaderKey ? (
                  <th key={column.key} scope="row" className={`${cellClass} text-left font-normal`}>
                    {row.cells[column.key]}
                  </th>
                ) : (
                  <td key={column.key} className={cellClass}>
                    {row.cells[column.key]}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
