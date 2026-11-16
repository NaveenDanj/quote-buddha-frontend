// The blinking square at the end of text that is still arriving. It is only the picture:
// the parent announces progress (for example with an aria-live region). Reduced motion stops the blink.
export function LiveDot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-(--dot-size) animate-blink forced-color-adjust-none bg-accent align-middle forced-colors:bg-[CanvasText]"
    />
  )
}
