import { inject } from 'vue'
import { ThemeType } from 'src/types/theme'

export const useTheme = () => {
  return inject('theme') as ThemeType
}
