type MeterProps = {
  value: number
  // The value that counts as full. Defaults to 100.
  max?: number
  // What is measured ("Passages checked"). Required, because the bar alone says nothing.
  label: string
}

function getPercent(value: number, max: number): number {
  if (max <= 0) {
    return 0
  }
  const percent = (value / max) * 100
  return Math.min(100, Math.max(0, percent))
}

// A thin horizontal bar. The meaning must also be written next to it in numbers or words.
export function Meter({ value, max = 100, label }: MeterProps) {
  const percent = getPercent(value, max)
  const safeMax = max > 0 ? max : 100
  const safeValue = Math.min(safeMax, Math.max(0, value))

  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={safeValue}
      className="h-(--meter-height) w-full bg-border forced-colors:border"
    >
      <div
        className="h-full forced-color-adjust-none bg-text forced-colors:bg-[CanvasText]"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
