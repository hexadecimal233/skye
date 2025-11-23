<template>
  <div>
    WIP - Toolbox
    <p>Soundcloud link shortener</p>
    <input type="text" v-model="soundcloudLink" placeholder="Soundcloud link" />
    <button @click="shortenSoundcloudLink">Shorten</button>
    <p>Shortened link: {{ shortenData.shortLink }}</p>
    <p>Expires at: {{ shortenData.expiresAt }}</p>
  </div>
</template>

<script lang="ts" setup name="ToolboxView">
import { shortenLink } from "@/utils/api"
import { reactive, ref } from "vue"

const soundcloudLink = ref("")
const shortenData = reactive({
  shortLink: "",
  expiresAt: -1,
})

const shortenSoundcloudLink = async () => {
  const resp = await shortenLink(soundcloudLink.value)
  shortenData.shortLink = resp.shortLink
  shortenData.expiresAt = resp.expiresAt
}
</script>
