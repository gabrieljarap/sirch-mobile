<template>
  <q-page>
    <transition>
      <img
        :key="activeDomain"
        class="fixed top-0 left-0 w-screen h-screen object-cover"
        :src="backgroundImages[activeDomain % 10]"
        alt="Background"
      >
    </transition>
    <div
      v-show="(typeof activeTabId) === 'number'"
      ref="container"
      class="absolute left-0 top-0 right-0 bottom-0"
    />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, toRefs, watch } from 'vue'
import { useApp } from 'src/stores/app'
import { backgroundImages } from 'src/consts/backs'
import { useHyperbeam } from 'src/use/hyperbeam'

const app = useApp()
const { activeDomain } = toRefs(app)

const {
  container,
  cachedDomains,
  activeTabId,
  updateTab,
  registerTabs,
  initHyperbeam,
  destroyHyperbeam
} = useHyperbeam()

watch(cachedDomains, registerTabs, { deep: true, immediate: true })
watch(activeTabId, () => {
  if (activeTabId.value) {
    updateTab(activeTabId.value)
  }
}, { immediate: true })

onMounted(initHyperbeam)
onUnmounted(destroyHyperbeam)
</script>

<route>
{
  "name": "Home"
}
</route>
