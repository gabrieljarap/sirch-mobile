import { boot } from 'quasar/wrappers'
import { theme } from 'src/consts/theme'
import 'virtual:windi.css'

export default boot(({ app }) => {
  app.provide('theme', theme)
})
