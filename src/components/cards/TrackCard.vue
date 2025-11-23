<template>
  <div
    @click="$router.push(`/track/${track.id}`)"
    :title="track.title"
    class="bg-elevated custom-card-flex">
    <div class="bg-accented rounded-md">
      <img
        :src="replaceImageUrl(getCoverUrl(track))"
        :alt="track.title"
        class="w-full h-full object-cover rounded-md max-w-full max-h-full" />
    </div>
    <div class="flex flex-col p-3">
      <div class="truncate font-bold">{{ track.title }}</div>
      <div class="mt-1 truncate text-sm">{{ getArtist(track) }}</div>
      <div class="mt-auto pt-2 text-xs text-muted flex justify-between">
        <span>{{ formatMillis(track.full_duration) }}</span>
        <span v-if="track.playback_count">{{ formatNumber(track.playback_count) }}plays</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Track } from "@/utils/types"
import { getArtist, getCoverUrl, formatMillis, formatNumber, replaceImageUrl } from "@/utils/utils"

defineProps<{
  track: Track
}>()
</script>
