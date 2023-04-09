import axios from 'axios'
import { Domain } from 'src/types'

export const getClearbitSuggest = async (query: string) => axios.get(
  'https://autocomplete.clearbit.com/v1/companies/suggest',
  { params: { query: query.toLowerCase() } }
).then(({ data }) => data as Domain[])
