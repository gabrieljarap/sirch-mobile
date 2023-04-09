<template>
  <div
    ref="dom"
    class="flex-grow-0 flex-shrink-0 w-18 text-center px-1"
    @click="onSelected"
  >
    <a
      :href="domain.url"
      @click.prevent
    >
      <common-icon
        :domain="domain"
        width="28px"
        height="28px"
      />
      <div class="text-[8px] truncate mt-[6px]">
        <span v-if="domain.name">
          {{ domain.name }}
        </span>
        <span v-else>
          &nbsp;
        </span>
      </div>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue'
import { useElementBounding } from '@vueuse/core'

import { useApp } from 'src/stores/app'
import { useScroller } from 'src/stores/scroller'
import { DomainType } from 'src/types'

const props = defineProps<{
  domain: DomainType,
  idx: number
}>()

const app = useApp()
const { setActiveDomain } = app
const { activeDomain } = toRefs(app)
const { getRelLeft, getRelRight, resetActive } = useScroller()

const dom = ref()
const { left, right } = useElementBounding(dom)

const isActive = computed(() => activeDomain.value === props.idx)
const overflow = computed(() => {
  if (getRelLeft(left.value) < 0) { return 'left' }
  if (getRelRight(right.value) < 0) { return 'right' }
  return false
})

const onSelected = () => {
  if (isActive.value) {
    window.open(props.domain.url, '_blank')
  } else {
    setActiveDomain(props.idx)
  }
}

watch([isActive, left, right], () => {
  if (isActive.value && overflow.value) {
    resetActive(overflow.value)
  }
}, { immediate: true })
</script>
