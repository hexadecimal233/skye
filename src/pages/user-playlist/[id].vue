<template>
  <div v-if="currentPlaylist" class="flex flex-col h-full">
    <div class="text-xl">{{ currentPlaylist.title }}</div>
    <TrackList
      :tracks="(tracks as Track[])"
      :playlist-id="currentPlaylist.id.toString()"
      :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import { Track, UserPlaylist } from "@/utils/types"
import { computed, onMounted, ref } from "vue"
import { fetchUserPlaylist } from "@/systems/playlist-cache"
import { i18n } from "@/systems/i18n"
import { useRoute } from "vue-router"

const loading = ref(true)
const currentPlaylist = ref<UserPlaylist>()
const tracks = computed(() => currentPlaylist.value?.tracks || [])
const toast = useToast()

onMounted(async () => {
  try {
    currentPlaylist.value = await fetchUserPlaylist(Number(useRoute().params.id))
    loading.value = false
  } catch (e) {
    toast.add({
      color: "error",
      title: i18n.global.t("skye.common.loadFail"),
      description: e instanceof Error ? e.message : String(e),
    })
  }
})
</script>
