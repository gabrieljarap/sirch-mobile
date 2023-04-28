export const getDomain = (url: string) => new URL(url).hostname
export const getElegantDomain = (domain: string) => {
  const chunks = domain.split('.')
  return chunks.slice(-Math.max(chunks.length - 1, 2)).join('.')
}
export const getBaseDomain = (domain: string) =>
  domain.split('.').slice(-2).join('.')
