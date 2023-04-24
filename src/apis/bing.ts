import axios from 'axios'
import { VITE_BING_INTEGRATIONS_URL } from 'src/consts/envs'

const bingApi = axios.create({
  baseURL: VITE_BING_INTEGRATIONS_URL,
  headers: { 'Ocp-Apim-Subscription-Key': 'e9304f36e5a74402a883041088cf3429' }
})

export default {
  search: (query: string) => bingApi.get(
    '/search',
    {
      params: {
        q: encodeURIComponent(query),
        count: 48
      }
    }
  ).then(({ data }) => data),
  suggestions: (query: string) => bingApi.get(
    '/suggestions',
    { params: { q: query } }
  ).then(({ data }) => data)
}
