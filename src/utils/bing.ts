import axios from 'axios'
import { BingSearch, BingSuggest } from 'src/types'

export const getBingSearch = (query: string) => axios.get(
  'https://api.bing.microsoft.com/v7.0/search',
  {
    headers: {
      'Ocp-Apim-Subscription-Key': 'e9304f36e5a74402a883041088cf3429'
    },
    params: {
      q: encodeURIComponent(query),
      count: 48
    }
  }
).then(({ data }) => data.webPages.value as BingSearch[])

export const getBingAutoSuggest = (query: string) => axios.get(
  'https://api.bing.microsoft.com/v7.0/Suggestions',
  {
    headers: {
      'Ocp-Apim-Subscription-Key': 'e9304f36e5a74402a883041088cf3429'
    },
    params: { q: query }
  }
).then(({ data }) => data.suggestionGroups[0].searchSuggestions as BingSuggest[])

export const openNewTab = (url: string) => {
  window.open(`https://${url}`, '__blank')
}
