<template>
  <q-page>
    <div
      ref="container"
      class="hyperbeam"
      :class="{ 'hyperbeam--inactive': (typeof activeTabId) !== 'number' }"
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

<style lang="scss">
.hyperbeam {
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  max-width: calc(100% + 2px);
  max-height: calc(100% + 2px);
  min-width: calc(100% + 2px);
  min-height: calc(100% + 2px);

  &--inactive {
    opacity: 0;
  }
}
</style>

<route>
{
  "name": "Home"
}
</route>
