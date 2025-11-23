<template>
  <div v-if="currentPlaylist" class="flex flex-col h-full">
    <div class="text-xl">{{ currentPlaylist.title }}</div>
    <TrackList :tracks="tracks" :playlist-id="currentPlaylist.id" :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { SystemPlaylist, Track } from "@/utils/types"
import { onMounted, ref } from "vue"
import { i18n } from "@/systems/i18n"
import { getSystemPlaylist, getTracks } from "@/utils/api"
import { useRoute } from "vue-router"

const loading = ref(true)
const currentPlaylist = ref<SystemPlaylist>()
const tracks = ref<Track[]>([])
const toast = useToast()

onMounted(async () => {
  try {
    currentPlaylist.value = await getSystemPlaylist(useRoute().params.permalink)
    tracks.value = await getTracks(currentPlaylist.value.tracks.map((t) => t.id))
    loading.value = false
  } catch (e) {
    toast.add({
      color: "error",
      title: i18n.global.t("skye.common.error"),
    })
  }
})
</script>
