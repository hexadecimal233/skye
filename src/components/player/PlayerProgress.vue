<template>
  <div class="h-2 w-full flex items-center">
    <div
      ref="progressContainer"
      class="relative w-full h-2/3 transition-all hover:h-full cursor-pointer group"
      @mousedown.prevent="dragging = true">
      <!-- Background track -->
      <div class="absolute inset-0 bg-neutral-300 dark:bg-neutral-600 rounded-full overflow-hidden">
        <!-- Progress fill -->
        <div
          class="h-full bg-primary transition-all duration-100 ease-out"
          :style="{ width: `${displayProgress * 100}%` }" />
      </div>

      <!-- Drag handle -->
      <div
        class="absolute top-1/2 w-4 h-4 -mt-2 -ml-2 bg-white border-2 border-primary rounded-full shadow-lg transition-all duration-150 ease-out opacity-0 group-hover:opacity-100 group-active:opacity-100 group-active:scale-125 pointer-events-none"
        :style="{ left: `${displayProgress * 100}%` }" />

      <!-- Loading indicator -->
      <div
        v-if="player.loading"
        class="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/systems/stores/player"
import { useMouseInElement, useMousePressed } from "@vueuse/core"
import { computed, ref, watch } from "vue"

const player = usePlayerStore()
const progressContainer = ref<HTMLDivElement | null>(null)
const { elementX, elementWidth } = useMouseInElement(progressContainer)
const { pressed } = useMousePressed()

const temporaryProgress = ref(0)
const dragging = ref(false)

const displayProgress = computed(() => {
  return dragging.value ? temporaryProgress.value : player.playProgress
})

watch([elementX], ([x]) => {
  if (dragging) {
    temporaryProgress.value = Math.min(Math.max(0, x / elementWidth.value), 1)
  }
})

watch(pressed, (pressed) => {
  if (!pressed && dragging.value) {
    player.seek(temporaryProgress.value * player.duration)
    dragging.value = false
  }
})
</script>
