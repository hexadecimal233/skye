<template>
  <div class="lyrics">
    <div v-for="(line, index) in lines" :key="index" class="line">{{ line }}</div>
  </div>
</template>

<script setup lang="ts">
import { Track } from "@/utils/types"
import { Client } from "lrclib-api"
import { ref } from "vue"

const props = defineProps<{
  track: Track
}>()

const client = new Client()

const lines = ref<string[]>([])

async function fetchLyrics() {
  let artists = []
  if (props.track.publisher_metadata?.artist) {
    // soundcloud still does not support multiple artists :/
    artists = props.track.publisher_metadata.artist.split(", ").map((artist) => artist.trim())
  } else {
    artists = [props.track.user.username.trim()]
  }
  for (const a of artists) {
    const query = {
      track_name: props.track.title,
      artist_name: a,
    }
    try {
      const unsynced = await client.getUnsynced(query)

      if (unsynced) {
        lines.value = unsynced.map((line) => line.text)
        return
      }
    } catch (error) {
      console.error("Error fetching lyrics:", error)
    }
  }
}

fetchLyrics()
</script>
