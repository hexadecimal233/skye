<template>
  <div
    @click="$router.push(`/user-playlist/${props.playlist.id}`)"
    :title="playlist.title"
    class="bg-elevated custom-card-flex">
    <div class="bg-accented rounded-md">
      <img
        v-if="getImageUrl().value"
        :src="getImageUrl().value"
        alt="cover"
        class="w-full h-full object-cover rounded-md max-w-full max-h-full" />
      <USkeleton v-else class="absolute inset-0 w-full h-full rounded-md" />
    </div>
    <div class="flex flex-col p-3">
      <div class="truncate font-bold">{{ playlist.title }}</div>
      <div class="mt-1 truncate text-sm">{{ playlist.user.username }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaylistsStore } from "@/systems/stores/playlists"
import { UserPlaylist } from "@/utils/types"
import { replaceImageUrl } from "@/utils/utils"
import { computed } from "vue"

const props = defineProps<{
  playlist: UserPlaylist
}>()

const playlistsStore = usePlaylistsStore()

// get & fetch missing artwork
function getImageUrl() {
  return computed(() => {
    let artworkUrl = ""
    if (props.playlist.artwork_url) {
      artworkUrl = props.playlist.artwork_url
    } else {
      artworkUrl = playlistsStore.getCoverCache(props.playlist.id).value
    }

    if (!artworkUrl) return ""

    return replaceImageUrl(artworkUrl)
  })
}
</script>
