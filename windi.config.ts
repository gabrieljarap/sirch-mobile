import { defineConfig } from 'vite-plugin-windicss'
import palette from './src/consts/palette.json'

export default defineConfig({
  attributify: {
    prefix: 'wnd'
  },
  theme: {
    extend: {
      colors: { ...palette }
    }
  },
  shortcuts: {
    'card-shadow': { boxShadow: '0 6px 12px #CCC8' },
    'flex-align-center': 'flex items-center',
    'flex-center': 'flex items-center justify-center',
    'suggestion-panel': 'absolute w-full left-0 bottom-1/1'
  }
})
