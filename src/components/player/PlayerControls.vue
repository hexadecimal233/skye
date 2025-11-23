<template>
  <div class="flex items-center justify-center gap-4">
    <ListeningListButton />
    <UButton
      size="xl"
      class="rounded-full cursor-pointer"
      icon="i-mingcute-skip-previous-line"
      variant="soft"
      @click="playerState.nextTrack(-1)" />
    <UButton
      :loading="playerState.loading"
      :icon="playerState.isPaused ? 'i-mingcute-play-line' : 'i-mingcute-pause-line'"
      size="xl"
      class="rounded-full cursor-pointer"
      @click="togglePlay" />
    <UButton
      size="xl"
      class="rounded-full cursor-pointer"
      icon="i-mingcute-skip-forward-line"
      variant="soft"
      @click="playerState.nextTrack()" />
    <PlayOrderButton />
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/systems/stores/player"

const playerState = usePlayerStore()

async function togglePlay() {
  if (!playerState.isPaused) {
    playerState.pause()
  } else {
    await playerState.resume()
  }
}
</script>
