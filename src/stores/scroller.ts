import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useApp } from './app'
import { ScrollerItemWidth, ScrollerPadding } from 'src/consts/scroller'

export const useScroller = defineStore('scroller', () => {
  const app = useApp()
  const { setActiveDomain } = app

  const scrollerWidth = ref(0)
  const scrollerX = ref(0)

  const getRelLeft = (pos: number) => pos - ScrollerPadding
  const getRelRight = (pos: number) => (scrollerWidth.value || 0) - pos - 32

  const from = computed(() => Math.ceil(scrollerX.value / ScrollerItemWidth))
  const to = computed(() => Math.floor((scrollerX.value + scrollerWidth.value - ScrollerPadding * 2) / ScrollerItemWidth) - 1)

  const resetActive = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveDomain(from.value)
    } else if (direction === 'right') {
      setActiveDomain(to.value)
    }
  }

  return {
    scrollerWidth,
    scrollerX,
    from,
    getRelLeft,
    getRelRight,
    resetActive
  }
})
