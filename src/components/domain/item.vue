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
      <div class="relative w-7 h-7 mx-auto">
        <common-icon
          :domain="domain"
          width="28px"
          height="28px"
        />
        <q-badge
          v-if="vote"
          class="-top-2 -right-2 border-2 border-secondary text-[8px] px-1"
          floating
          rounded
        >
          {{ vote }}
        </q-badge>
        <transition>
          <heart-svg
            v-if="isFavoriteUrl"
            class="absolute -left-[6px] -bottom-[6px] text-negative"
            width="16"
            height="16"
          />
        </transition>
      </div>
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

import HeartSvg from 'src/assets/svg/heart.svg?component'
import { useFavorites } from 'src/use/favorites'

const props = defineProps<{
  domain: DomainType,
  vote: number,
  idx: number
}>()

const app = useApp()
const { setActiveDomain } = app
const { activeDomain } = toRefs(app)
const { getRelLeft, getRelRight, resetActive } = useScroller()

const dom = ref()
const { left, right } = useElementBounding(dom)
const { isLiked, likeUrl } = useFavorites()

const isFavoriteUrl = ref(isLiked(props.domain.url))
const favoriteUrl = () => {
  isFavoriteUrl.value = likeUrl(props.domain.url)
}

const isActive = computed(() => activeDomain.value === props.idx)
const overflow = computed(() => {
  if (getRelLeft(left.value) < 0) { return 'left' }
  if (getRelRight(right.value) < 0) { return 'right' }
  return false
})

const onSelected = () => {
  if (isActive.value) {
    favoriteUrl()
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
