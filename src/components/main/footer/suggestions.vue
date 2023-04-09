<template>
  <div class="bg-white opacity-90">
    <div class="py-2">
      <div class="max-h-50 overflow-y-auto">
        <q-list
          v-for="suggestion in suggestions"
          :key="suggestion.query"
        >
          <q-item
            clickable
            @mousedown="() => setPhrase(suggestion.displayText)"
          >
            <q-item-section
              class="min-w-8 pr-0"
              avatar
            >
              <q-icon name="mdi-magnify" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="ellipsis">
                {{ suggestion.displayText }}
              </q-item-label>
              <q-item-label
                class="ellipsis"
                caption
              >
                {{ suggestion.url }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              Application
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
