<template>
  <q-page>
    <div
      v-show="(typeof activeTabId) === 'number'"
      ref="container"
      class="hyperbeam absolute -top-1 -left-1 -right-1 -bottom-1"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useHyperbeam } from 'src/use/hyperbeam'

const {
  container,
  cachedDomains,
  activeTabId,
  updateTab,
  resizeHyperbeam,
  registerTabs,
  initHyperbeam,
  destroyHyperbeam,
  refreshHyperbeamColor
} = useHyperbeam()

watch(cachedDomains, registerTabs, { deep: true, immediate: true })
watch(activeTabId, () => {
  if (activeTabId.value) {
    updateTab(activeTabId.value)
  }
}, { immediate: true })
watch([
  () => container.value?.clientWidth,
  () => container.value?.clientHeight
], resizeHyperbeam, { immediate: true })

setInterval(refreshHyperbeamColor, 200)

onMounted(initHyperbeam)
onUnmounted(destroyHyperbeam)
</script>

<route>
{
  "name": "Home"
}
</route>
