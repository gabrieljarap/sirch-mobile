<template>
  <div class="bg-white/90">
    <div class="py-2">
      <div class="max-h-50 overflow-y-auto">
        <q-list
          v-for="suggestion in suggestions"
          :key="suggestion.query"
          dense
        >
          <q-item
            clickable
            @mousedown="() => setPhrase(suggestion.displayText)"
          >
            <q-item-section
              class="min-w-8 pr-0"
              avatar
            >
              <q-icon
                class="opacity-50"
                name="mdi-magnify"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="ellipsis">
                {{ suggestion.displayText }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-separator />
  </div>
</template>

<script setup lang="ts">
import { useApp } from 'src/stores/app'
import { toRefs } from 'vue'

const app = useApp()
const { setPhrase } = app
const { suggestions } = toRefs(app)
</script>
