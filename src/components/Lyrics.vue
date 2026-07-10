<template>
  <!-- FIXME: lyrics keeps glitching -->
  <LyricPlayer
    align-anchor="top"
    :lyric-lines="toRaw(lines)"
    :current-time="player.currentTime * 1000"
    @line-click="onClickLine" />
</template>

<script setup lang="ts">
import { Track } from "@/utils/types"
import { ref, watch, toRaw } from "vue"
import { LyricPlayer } from "@applemusic-like-lyrics/vue"
import { LyricLine, LyricLineMouseEvent } from "@applemusic-like-lyrics/core"
import { usePlayerStore } from "@/systems/stores/player"
import { fetchTrackLyrics } from "@/utils/lyrics"

function onClickLine(event: LyricLineMouseEvent) {
  if (isCurrentLyricsSynced.value) {
    player.seek(event.line.getLine().startTime / 1000)
    player.resume()
  }
}

const props = defineProps<{
  track: Track
}>()

const isCurrentLyricsSynced = ref(false)

const player = usePlayerStore()

const lines = ref<LyricLine[]>([])

watch(
  () => props.track,
  async (track) => {
    // TODO: Lyrics cache

    lines.value = []
    isCurrentLyricsSynced.value = false

    const result = await fetchTrackLyrics(track)

    if (!result) return

    isCurrentLyricsSynced.value = result.synced

    lines.value = result.lyrics.map((line, i) => ({
      words: [
        {
          word: line.text,
          startTime: (line.startTime ?? 0) * 1000, // The LRC parsed results are in seconds
          endTime: (result.lyrics[i + 1]?.startTime ?? track.full_duration / 1000) * 1000,
          romanWord: "",
          obscene: false,
        },
      ],
      startTime: (line.startTime ?? 0) * 1000,
      endTime: (result.lyrics[i + 1]?.startTime ?? track.full_duration / 1000) * 1000,
      translatedLyric: "",
      romanLyric: "",
      isBG: false,
      isDuet: false,
    })) as LyricLine[]
  },
  { immediate: true },
)
</script>
