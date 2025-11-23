<template>
  <div class="bg-muted relative w-full transition-transform" v-if="playerState.track">
    <!-- TODO: Progress Bar and Needle than waveform -->
    <PlayerProgress class="w-full" />

    <div class="flex w-full px-4 py-3">
      <TrackTitle :track="playerState.track" class="w-1/3" hide-play />

      <PlayerControls class="w-1/3" />

      <div class="flex items-center justify-end gap-2 w-1/3">
        <!-- Volume adjust -->
        <UPopover
          :content="{
          side: 'top',
        }">
          <UButton
            :icon="playerState.volume > 0 ? 'i-mingcute-volume-line' : 'i-mingcute-volume-mute-line'"
            class="rounded-full cursor-pointer"
            variant="ghost" />

          <template #content>
            <div class="h-40 p-4">
              <USlider v-model="volume" orientation="vertical" :default-value="50" class="h-full" />
            </div>
          </template>
        </UPopover>

        <!-- SFX Panel -->
        <UPopover
          :content="{
          side: 'top',
        }">
          <UButton
            icon="i-mingcute-sound-line-line"
            class="rounded-full cursor-pointer"
            variant="ghost" />

          <template #content>
            <Equalizer />
          </template>
        </UPopover>

        <UButton
          class="rounded-full cursor-pointer"
          icon="i-mingcute-fullscreen-line"
          variant="ghost"
          @click="playerState.isFullscreen = !playerState.isFullscreen" />

        <div class="flex items-center gap-2">
          <span class="text-sm"
            >{{ formatSecs(isNaN(playerState.currentTime) ? 0 : playerState.currentTime) }}</span
          >
          <span class="text-sm">/</span>
          <span class="text-sm"
            >{{ formatSecs(isFinite(playerState.duration) ? playerState.duration : 0) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/systems/stores/player"
import { formatSecs } from "@/utils/utils"
import { computed } from "vue"

const volume = computed({
  get: () => playerState.volume * 100,
  set: (val) => {
    playerState.setVolume(val / 100)
  },
})

const playerState = usePlayerStore()
</script>
