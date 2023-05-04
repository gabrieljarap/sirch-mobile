<template>
  <div class="main-footer-scroller">
    <div
      ref="scrollerDOM"
      class="main-footer-scroller__contents overflow-x-auto py-2"
    >
      <div class="relative h-14 flex-align-center flex-nowrap">
        <div class="w-8 min-w-8">
          &nbsp;
        </div>
        <domain-item
          v-for="(domain, domainIdx) in domains"
          :key="domain.url"
          :domain="domain"
          :idx="domainIdx"
          :vote="domainVoteMap[getBaseDomain(domain.domain)] || 0"
        />
        <div class="w-8 min-w-8">
          &nbsp;
        </div>

        <div
          v-if="domains.length"
          class="main-footer-scroller__index"
        />
      </div>
    </div>
    <div class="main-footer-scroller__average-color" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useDraggable, useElementBounding, useScroll } from '@vueuse/core'

import events from 'src/events'
import { useApp } from 'src/stores/app'
import { useScroller } from 'src/stores/scroller'
import { useVote } from 'src/stores/vote'
import { getBaseDomain } from 'src/utils/domain'
import { ScrollerItemWidth } from 'src/consts/scroller'
import { useHyperbeamColor } from 'src/use/hyperbeam'

const app = useApp()
const { focused, domains, activeDomain } = toRefs(app)
const scroller = useScroller()
const { domainVoteMap, updateVoteMap } = useVote()
const { hyperbeamBg } = useHyperbeamColor()
const { scrollerWidth, scrollerX } = toRefs(scroller)

const scrollerDOM = ref<HTMLDivElement>()
const { x, arrivedState } = useScroll(scrollerDOM)
const { width } = useElementBounding(scrollerDOM)
useDraggable(scrollerDOM, {
  onStart: () => {
    focused.value = false
  }
})

const gradientWidth = computed(() => ({
  left: arrivedState.left ? '32px' : '48px',
  right: arrivedState.right ? '32px' : '48px'
}))

const indexerPos = computed(() => activeDomain.value * ScrollerItemWidth + 'px')

const reset = () => {
  x.value = 0
}

watch(width, () => {
  scrollerWidth.value = width.value
}, { immediate: true })
watch(x, () => {
  scrollerX.value = x.value
}, { deep: true, immediate: true })

onMounted(() => {
  events.on('reset', reset)
  updateVoteMap()
})
onUnmounted(() => {
  events.off('reset', reset)
})
</script>

<style lang="scss">
.main-footer-scroller {
  position: relative;
  background-color: var(--q-secondary);
  padding-bottom: env(safe-area-inset-bottom);

  &:before, &:after {
    content: '';
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    transition: all .3s;
    background-color: red;
  }
  &:before {
    left: 0;
    width: v-bind('gradientWidth.left');
    background: linear-gradient(to right, #D8DADE 16px, #D8DADE00);
  }
  &:after {
    right: 0;
    width: v-bind('gradientWidth.right');
    background: linear-gradient(to left, #D8DADE 16px, #D8DADE00);
  }

  &__contents {
    transition: all .3s;

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__index {
    position: absolute;
    left: v-bind(indexerPos);
    bottom: 0;
    width: 64px;
    height: 4px;
    border-radius: 2px;
    background-color: #0006;
    transition: all .15s;
    transform: translate(calc(32px + 4px));
  }

  &__average-color {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background-color: v-bind(hyperbeamBg);
    pointer-events: none;
    transition: all .2s ease;
  }
}
</style>
