export const getDomain = (url: string) => new URL(url).hostname
export const getElegantDomain = (domain: string) => {
  const chunks = domain.split('.')
  return chunks.slice(-Math.max(chunks.length - 1, 2)).join('.')
}
