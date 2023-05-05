<template>
  <q-page>
    <div
      ref="container"
      class="hyperbeam"
      :class="{ 'hyperbeam--inactive': (typeof activeTabId) !== 'number' }"
    />

    <transition>
      <q-btn
        v-if="activeDomainData"
        class="absolute left-5 bottom-5"
        color="negative"
        :icon="isLiked(activeDomainData.url) ? 'mdi-heart' : 'mdi-heart-outline'"
        round
        @click="likeUrl(activeDomainData.url)"
      />
    </transition>

    <transition>
      <q-btn
        v-if="activeDomainData"
        class="absolute right-5 bottom-5"
        :href="activeDomainData.url"
        color="info"
        icon="mdi-open-in-new"
        round
      />
    </transition>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, toRefs, watch } from 'vue'
import { useApp } from 'src/stores/app'
import { useHyperbeam } from 'src/use/hyperbeam'
import { useFavorites } from 'src/use/favorites'

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
const { isLiked, likeUrl } = useFavorites()
const app = useApp()

const { activeDomainData } = toRefs(app)

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
