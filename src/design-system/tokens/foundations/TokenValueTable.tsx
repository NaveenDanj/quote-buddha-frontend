import { readTokenText } from './readToken'

export type TokenRow = {
  name: string
  use: string
  // "space" draws a bar as wide as the value, "radius" draws a corner, "none" draws nothing.
  preview?: 'space' | 'radius' | 'none'
}

function Preview({ row }: { row: TokenRow }) {
  if (row.preview === 'space') {
    return <span className="inline-block h-3 bg-accent" style={{ width: `var(${row.name})` }} />
  }
  if (row.preview === 'radius') {
    return (
      <span
        className="inline-block h-6 w-8 border border-text"
        style={{ borderRadius: `var(${row.name})` }}
      />
    )
  }
  return null
}

// A table of tokens with the value read from the live variable, so it cannot drift from the CSS.
export function TokenValueTable({ rows }: { rows: TokenRow[] }) {
  return (
    <div className="overflow-x-auto" role="region" aria-label="Token values" tabIndex={0}>
      <table className="w-full border-collapse text-ui text-left font-ui">
        <caption className="sr-only">Tokens with live values</caption>
        <thead>
          <tr className="border-b border-border text-label text-text-muted">
            <th scope="col" className="p-2">
              Token
            </th>
            <th scope="col" className="p-2">
              Value
            </th>
            <th scope="col" className="p-2">
              Preview
            </th>
            <th scope="col" className="p-2">
              Use
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border align-top">
              <th scope="row" className="p-2 font-code text-code font-normal">
                {row.name}
              </th>
              <td className="p-2 font-code text-code">{readTokenText(row.name)}</td>
              <td className="p-2">
                <Preview row={row} />
              </td>
              <td className="p-2 text-text-muted">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
