import apis from 'src/apis'
import { BingSearch, BingSuggest } from 'src/types'

export const getBingSearch = (query: string) =>
  apis.bing.search(query).then(({ webPages }) => webPages.value as BingSearch[])

export const getBingAutoSuggest = (query: string) =>
  apis.bing.suggestions(query).then(({ suggestionGroups }) => suggestionGroups[0].searchSuggestions as BingSuggest[])
