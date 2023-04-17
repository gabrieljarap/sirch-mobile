<template>
  <q-footer class="main-footer bg-transparent text-black">
    <transition>
      <main-footer-suggestions
        v-if="showSuggestions"
        class="suggestion-panel"
      />
      <main-footer-deep-links
        v-else-if="currentDeepLinks.length"
        class="suggestion-panel"
      />
    </transition>
    <main-footer-input />
    <main-footer-scroller />
  </q-footer>
</template>

<script setup lang="ts">
import { useApp } from 'src/stores/app'
import { toRefs } from 'vue'

const app = useApp()
const { currentDeepLinks, showSuggestions } = toRefs(app)
</script>
