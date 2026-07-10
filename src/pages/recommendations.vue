<template>
  <!-- FIXME: incorrect layout test -->
  <div class="flex flex-col gap-4">
    <div v-for="selection in recommendations" :key="selection.id" class="flex gap-2 flex-col">
      <p class="font-bold text-xl mb-2">{{ selection.title }}</p>
      <div class="flex h-72 gap-4 overflow-x-auto">
        <template v-for="item in selection.items.collection">
          <component
            v-if="item.kind === 'playlist'"
            :is="PlaylistCard"
            :playlist="item as UserPlaylist" />
          <component
            v-else-if="item.kind === 'system-playlist'"
            :is="SystemPlaylistCard"
            :playlist="item as SystemPlaylist" />
          <component v-else-if="item.kind === 'user'" :is="UserCard" :user="item as SCUser" />
          <component v-else-if="item.kind === 'track'" :is="TrackCard" :track="item as Track" />
          <p v-else>{{ item.kind }}</p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RecommendationView">
import PlaylistCard from "@/components/cards/PlaylistCard.vue"
import SystemPlaylistCard from "@/components/cards/SystemPlaylistCard.vue"
import TrackCard from "@/components/cards/TrackCard.vue"
import UserCard from "@/components/cards/UserCard.vue"
import { getRecommendations } from "@/utils/api"
import { SCUser, Selection, SystemPlaylist, Track, UserPlaylist } from "@/utils/types"
import { onMounted, ref } from "vue"

const recommendations = ref<Selection[]>([])

onMounted(async () => {
  recommendations.value = await getRecommendations()
})
</script>
