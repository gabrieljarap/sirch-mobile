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
  </q-page>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useApp } from 'src/stores/app'
import { backgroundImages } from 'src/consts/backs'

const app = useApp()
const { activeDomain } = toRefs(app)
</script>

<route>
{
  "name": "Home"
}
</route>
