import { route } from 'quasar/wrappers'
import {
  createRouter,
  createWebHistory
} from 'vue-router'

import routes from './routes'

export const router = createRouter({
  routes,
  history: createWebHistory()
})

export default route(function () {
  return router
})
