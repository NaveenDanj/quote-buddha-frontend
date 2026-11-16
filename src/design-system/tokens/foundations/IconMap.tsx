import { Icon, iconNames } from '../../atoms/Icon'

// Reads the list from the Icon atom, so this page cannot drift from the real icons.
export function IconMap() {
  return (
    <ul className="grid grid-cols-2 gap-3 font-ui text-ui sm:grid-cols-3 md:grid-cols-4">
      {iconNames.map((name) => (
        <li key={name} className="flex items-center gap-3">
          <Icon name={name} size="large" />
          <span className="font-code text-code">{name}</span>
        </li>
      ))}
    </ul>
  )
}
