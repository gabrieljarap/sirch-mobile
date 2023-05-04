import { Ref, computed, ref, toRefs } from 'vue'
import Hyperbeam, { HyperbeamEmbed } from '@hyperbeam/web'
import { FastAverageColor } from 'fast-average-color'

import apis from 'src/apis'
import { useApp } from 'src/stores/app'

import { SECOND } from 'src/consts/time'
import { LOCALSTORAGE_HB_SESSION } from 'src/consts/local-storage'
import { HyperbeamSession } from 'src/types/hyperbeam'

const hyperbeamBg = ref('transparent')
const HYPERBEAM_CACHE_WINDOW_RADIUS = 4

export const useHyperbeamColor = () => {
  const setHyperbeamBg = (hex: string) => {
    hyperbeamBg.value = hex + '30'
  }
  const resetHyperbeamBg = () => {
    hyperbeamBg.value = 'transparent'
  }

  return {
    hyperbeamBg,
    setHyperbeamBg,
    resetHyperbeamBg
  }
}

export const useHyperbeam = () => {
  const app = useApp()
  const uuid = ref(-1)
  const tabMap: Ref<Record<string, boolean | number>> = ref({})
  const fac = new FastAverageColor()

  const {
    setHyperbeamBg,
    resetHyperbeamBg
  } = useHyperbeamColor()

  const container = ref<HTMLIFrameElement | HTMLDivElement | null>(null)
  const { domains, activeDomain, activeDomainData } = toRefs(app)

  const pingTimer: Ref<NodeJS.Timeout> = ref(-1 as any)

  const cachedDomains = computed(() => domains.value.slice(
    Math.max(activeDomain.value - HYPERBEAM_CACHE_WINDOW_RADIUS, 0),
    activeDomain.value + HYPERBEAM_CACHE_WINDOW_RADIUS + 1
  ))

  const hyperbeam = ref<HyperbeamEmbed | null>(null)
  const windowId = ref<number>()

  const saveSession = (session: HyperbeamSession) => {
    localStorage.setItem(LOCALSTORAGE_HB_SESSION, JSON.stringify(session))
  }

  const activeTabId = computed(() => {
    if (!activeDomainData.value) { return null }
    const activeTab = tabMap.value[activeDomainData.value.url]
    if (typeof activeTab === 'boolean') {
      return null
    }
    return activeTab
  })

  const getSavedSession = () => {
    const sessionData = localStorage.getItem(LOCALSTORAGE_HB_SESSION)

    return sessionData ? JSON.parse(sessionData) as HyperbeamSession : null
  }

  const renderPage = async (url: string) => {
    if (!hyperbeam.value) {
      tabMap.value[url] = false
      return
    }

    uuid.value++

    tabMap.value[url] = true
    const newTab = await hyperbeam.value.tabs.create({
      index: uuid.value,
      url,
      active: url === activeDomainData.value.url
    })

    tabMap.value[url] = newTab.id || false
    windowId.value = newTab.windowId
  }

  const clearAllTabs = async () => {
    if (!hyperbeam.value) { return }
    const query = await hyperbeam.value.tabs.query({ windowId: windowId.value })
    query.forEach((tab) => {
      if (tab.id) { hyperbeam.value?.tabs.remove(tab.id) }
    })
  }

  const registerTabs = async () => {
    for (const tabUrl in tabMap.value) {
      if (!cachedDomains.value.find(({ url }) => tabUrl === url)) {
        tabMap.value[tabUrl] = false
      }
    }

    for (const { url } of cachedDomains.value) {
      if (!tabMap.value[url]) {
        renderPage(url)
      }
    }
  }

  const resizeHyperbeam = () => {
    if (hyperbeam.value) {
      hyperbeam.value.resize(
        container.value?.clientWidth || window.innerWidth,
        container.value?.clientHeight || window.innerHeight
      )
    }
  }

  const updateTab = async (id: number) => {
    if (hyperbeam.value) {
      await hyperbeam.value.tabs
        .update(id, { active: true })
      resizeHyperbeam()
    }
  }

  const loadHyperBeam = async (embedUrl: string) =>
    container.value ? Hyperbeam(container.value, embedUrl, { volume: 0 }) : null

  const getEmbeddedUrl = async () => {
    const session: HyperbeamSession = await apis.hyperbeam.createSession()
    saveSession(session)

    return session
  }

  const checkSession = apis.hyperbeam.checkSession

  const updateHyperbeam = async (session: HyperbeamSession) => {
    hyperbeam.value = await loadHyperBeam(session.embed_url)
    resizeHyperbeam()
  }

  const getNewHyperbeam = async () => {
    const newSession = await getEmbeddedUrl()
    await updateHyperbeam(newSession)
  }

  const initHyperbeam = async () => {
    const session = getSavedSession()

    if (session) {
      const res = await checkSession(session.session_id)
      if (!res.termination_date) {
        await updateHyperbeam(session)
        return
      }
    }

    await getNewHyperbeam()

    pingTimer.value = setInterval(() => {
      if (hyperbeam.value) {
        hyperbeam.value.ping()
      }
    }, 20 * SECOND)
  }

  const destroyHyperbeam = () => {
    if (hyperbeam.value) {
      hyperbeam.value.destroy()
    }
    clearInterval(pingTimer.value)
  }

  const refreshHyperbeamColor = () => {
    const videoDom = container.value?.shadowRoot?.querySelector('video')

    if (videoDom && videoDom.clientWidth && videoDom.clientHeight) {
      fac.getColorAsync(videoDom)
        .then((color) => {
          setHyperbeamBg(color.hex)
        }).catch(() => {
          resetHyperbeamBg()
        })
    }
  }

  return {
    container,
    hyperbeam,
    cachedDomains,
    activeTabId,
    resizeHyperbeam,
    updateTab,
    registerTabs,
    initHyperbeam,
    destroyHyperbeam,
    refreshHyperbeamColor
  }
}
