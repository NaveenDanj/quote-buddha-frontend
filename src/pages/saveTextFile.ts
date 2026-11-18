// Gives the browser a text file to save, for example an exported notebook.
export function saveTextFile(fileName: string, text: string, mimeType: string) {
  const blob = new Blob([text], { type: mimeType })
  const address = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = address
  link.download = fileName
  link.click()
  URL.revokeObjectURL(address)
}
