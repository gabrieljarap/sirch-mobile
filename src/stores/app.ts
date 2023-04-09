import { computed, ref, watch } from 'vue'
import { useFocus } from '@vueuse/core'
import { defineStore } from 'pinia'

import events from 'src/events'
import { getBingAutoSuggest, getBingSearch } from 'src/utils/bing'
import { getClearbitSuggest } from 'src/utils/clearbit'
import { getDomain } from 'src/utils/domain'

import { SearchMode } from 'src/consts'
import { BingSearch, BingSuggest, ClearbitSuggest, DomainType } from 'src/types'

export const iconMap = ref({} as Record<string, string>)

export const useApp = defineStore('app', () => {
  const searchBox = ref()
  const { focused } = useFocus(searchBox, { initialValue: true })

  const phrase = ref('')
  const cleanPhrase = computed(() => phrase.value.trim())
  const searchMode = computed(() =>
    cleanPhrase.value.includes(' ') || phrase.value.endsWith(' ')
      ? SearchMode.Words
      : SearchMode.Characters)

  const setPhrase = (newPhrase: string) => {
    phrase.value = newPhrase.trim()
  }

  const suggestions = ref([] as BingSuggest[])
  const bingSearches = ref([] as BingSearch[])
  const clearbitSuggests = ref([] as ClearbitSuggest[])

  const showSuggestions = computed(() => focused.value && !!suggestions.value.length)

  const domainMode = ref(SearchMode.Characters)
  const domains = computed(() =>
    domainMode.value === SearchMode.Characters
      ? clearbitSuggests.value.map(({ name, domain, logo }) =>
      ({ url: `https://${domain}`, domain, name, logo }) as DomainType)
      : bingSearches.value.map(({ url, name }) =>
      ({ url, domain: getDomain(url), name }) as DomainType))

  const domainLock = ref(false)
  const activeDomain = ref(0)

  const currentDeepLinks = computed(() => {
    if (domainMode.value === SearchMode.Characters) { return [] }
    return bingSearches.value[activeDomain.value]?.deepLinks || []
  })

  const activeDomainTimer = ref(null as any)
  const setActiveDomain = (idx: number) => {
    if (domainLock.value) { return }

    focused.value = false
    clearTimeout(activeDomainTimer.value)

    activeDomainTimer.value = setTimeout(() => {
      activeDomain.value = idx
    }, 100)
  }

  const clearAll = () => {
    suggestions.value = []
    bingSearches.value = []
    clearbitSuggests.value = []
  }

  const resetActiveDomain = () => {
    events.emit('reset')
    domainLock.value = true
    activeDomain.value = 0
    setTimeout(() => {
      domainLock.value = false
    }, 200)
  }

  const bingSearch = async () => {
    bingSearches.value = await getBingSearch(phrase.value)
    clearbitSuggests.value = []
    domainMode.value = SearchMode.Words
    resetActiveDomain()
  }

  const bingAutoSuggest = async () => {
    suggestions.value = await getBingAutoSuggest(phrase.value)
  }

  const clearbitSuggest = async () => {
    suggestions.value = []

    clearbitSuggests.value = await getClearbitSuggest(phrase.value)
    bingSearches.value = []
    domainMode.value = SearchMode.Characters
    resetActiveDomain()
  }

  const searchTimer = ref(null as any)
  watch([cleanPhrase, searchMode], () => {
    clearTimeout(searchTimer.value)

    searchTimer.value = setTimeout(async () => {
      if (!cleanPhrase.value) {
        clearAll()
      } else if (cleanPhrase.value.includes(' ') || phrase.value.endsWith(' ')) {
        bingSearch()
        bingAutoSuggest()
      } else {
        clearbitSuggest()
      }
    }, 300)
  }, { immediate: true })

  return {
    iconMap,

    searchBox,
    focused,

    phrase,
    cleanPhrase,
    searchMode,

    setPhrase,

    suggestions,
    bingSearches,
    clearbitSuggests,
    showSuggestions,

    domains,
    activeDomain,
    currentDeepLinks,

    setActiveDomain,
    clearAll,
    bingSearch,
    bingAutoSuggest,
    clearbitSuggest
  }
})
