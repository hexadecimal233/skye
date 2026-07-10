<template>
  <div class="flex flex-col">
    <div class="grid-cards">
      <template v-for="item in items">
        <component v-if="item.playlist " :is="PlaylistCard" :playlist="item.playlist"></component>
        <component v-else :is="SystemPlaylistCard" :playlist="item.system_playlist"></component>
      </template>
    </div>

    <div class="flex items-center justify-center pt-4">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlaylistLike } from "@/utils/types"
import { usePlaylistsStore } from "@/systems/stores/playlists"
import SystemPlaylistCard from "./cards/SystemPlaylistCard.vue"
import PlaylistCard from "./cards/PlaylistCard.vue"

defineProps<{
  items: PlaylistLike[]
}>()

const playlistsStore = usePlaylistsStore()
</script>
