export type Pagination = {
  page: number;
  total: number;
  size: number;
}

export type BingSuggest = {
  displayText: string,
  query: string,
  searchKind: string,
  url: string
}

export type BingSearchDeepLink = {
  name: string,
  snippet: string,
  url: string
}

export type ClearbitSuggest = {
  name: string,
  domain: string,
  logo: string

}

export type BingSearch = {
  id: string,
  name: string,
  snippet: string
  url: string
  language: string,
  displayUrl: string,
  deepLinks: BingSearchDeepLink[],
  dateLastCrawled: string,
  isFamilyFriendly: boolean,
  isNavigational: boolean,
}

export type DomainType = {
  url: string,
  domain: string,
  name: string,
  logo?: string
}
