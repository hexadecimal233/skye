<template>
  <div
    @click="$router.push(`/system-playlist/${props.playlist.permalink}`)"
    :title="playlist.title"
    class="bg-elevated custom-card-flex">
    <div class="bg-accented rounded-md">
      <img
        :src="playlist.artwork_url"
        alt="cover"
        class="w-full h-full object-cover rounded-md max-w-full max-h-full" />
    </div>
    <div class="flex flex-col p-3">
      <div class="truncate font-bold">{{ playlist.title }}</div>
      <div class="mt-1 truncate text-sm">
        {{
              (playlist.made_for
                ? $t("skye.library.madeFor", {
                  name: playlist.made_for?.username,
                })
                : playlist.description)
            }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SystemPlaylist } from "@/utils/types"

const props = defineProps<{
  playlist: SystemPlaylist
}>()
</script>
