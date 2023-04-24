import axios from 'axios'
import { VITE_SIRCH_INTEGRATIONS_URL } from 'src/consts/envs'

const hyperbeamApi = axios.create({
  baseURL: VITE_SIRCH_INTEGRATIONS_URL
})

export default {
  createSession: () => hyperbeamApi.get('/hb/create').then(({ data }) => data),
  checkSession: (id: string) => hyperbeamApi.get(`/hb/session/${id}`).then(({ data }) => data)
}
