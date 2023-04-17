<template>
  <div
    v-if="showMenu"
    class="bg-white/85"
  >
    <div class="py-2">
      <div class="text-right px-4 mb-1">
        <q-btn
          class="text-neutral-600"
          label="close"
          size="sm"
          flat
          @click="showMenu = false"
        />
      </div>
      <div class="max-h-60 overflow-y-auto">
        <q-list
          v-for="deepLink in currentDeepLinks"
          :key="deepLink.url"
        >
          <q-item
            clickable
            :href="deepLink.url"
            target="_blank"
          >
            <q-item-section
              class="min-w-8 pr-2"
              avatar
            >
              <common-icon
                class="mx-auto mb-1"
                :domain="getDomainFromDeepLink(deepLink)"
                width="32px"
                height="32px"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="ellipsis">
                {{ deepLink.name }}
              </q-item-label>
              <q-item-label
                class="ellipsis"
                caption
              >
                {{ deepLink.url }}
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
import { ref, toRefs } from 'vue'
import { useApp } from 'src/stores/app'
import { getDomain } from 'src/utils/domain'
import { BingSearchDeepLink, DomainType } from 'src/types'

const app = useApp()
const { currentDeepLinks } = toRefs(app)
const showMenu = ref(true)

const getDomainFromDeepLink = (
  { url, name }: BingSearchDeepLink
) => ({
  url,
  name,
  domain: getDomain(url)
} as DomainType)
</script>
