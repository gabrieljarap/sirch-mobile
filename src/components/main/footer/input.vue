<template>
  <div class="bg-white">
    <div class="h-10 flex items-center p-2 pr-3">
      <q-icon
        class="text-xl mr-2"
        name="mdi-magnify"
      />
      <input
        ref="searchBox"
        v-model="app.phrase"
        class="flex-grow bg-transparent outline-none caret-red-500"
        placeholder="Type to Sirch"
        spellcheck="false"
        autocapitalize="off"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useApp } from 'src/stores/app'

const app = useApp()
const { searchBox } = toRefs(app)
</script>
