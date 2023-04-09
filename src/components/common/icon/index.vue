<template>
  <q-img
    :src="iconMap[domain.domain]"
    fit="contain"
  >
    <template #loading>
      <q-spinner-ios size="30px" />
    </template>
    <template #error>
      <q-icon
        class="text-gray-600"
        name="mdi-earth"
        size="30px"
      />
    </template>
  </q-img>
</template>

<script setup lang="ts">
import { computed, toRefs, watch } from 'vue'
import { useApp } from 'src/stores/app'
import { getElegantDomain } from 'src/utils/domain'
import { DomainType } from 'src/types'

const props = defineProps<{
  domain: DomainType
}>()

const app = useApp()
const { iconMap } = toRefs(app)
const elegantDomain = computed(() => getElegantDomain(props.domain.domain))

watch(() => props.domain.domain, () => {
  if (props.domain.logo) {
    iconMap.value[props.domain.domain] = props.domain.logo || ''
    return
  }

  fetch(`https://logo.clearbit.com/${elegantDomain.value}`, { mode: 'no-cors' })
    .then(() => {
      if (iconMap.value[props.domain.domain]) { return }
      iconMap.value[props.domain.domain] =
        `https://logo.clearbit.com/${elegantDomain.value}`
    }).catch(() => { /** */ })

  fetch(`https://${props.domain.domain}/favicon.ico`, { mode: 'no-cors' })
    .then(() => {
      if (iconMap.value[props.domain.domain]) { return }
      iconMap.value[props.domain.domain] =
        `https://${props.domain.domain}/favicon.ico`
    }).catch(() => { /** */ })
}, { immediate: true, deep: true })
</script>
