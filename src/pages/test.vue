<template>
  <div>
    <Lyrics :track="tratck" />
    <!--
    <CommentSection :track="track"></CommentSection>
    <FullTrack :track="track" :stream-item="trackRepost" />
    <FullPlaylist :playlist="playlist" :stream-items="undefined" />
    <TwitterFullTrack :track="track" :stream-item="trackRepost" />
    <TwitterFullPlaylist :playlist="playlist" :stream-items="undefined" />
    <MiniUser :user="user" />
    <MiniTrack :track="track" />
    <MiniPlaylist :playlist="playlist" />
    <MiniSystemPlaylist :playlist="systemPlaylist" />
-->
  </div>
</template>

<script setup lang="ts">
import Lyrics from "@/components/Lyrics.vue"
// @ts-ignore
import { user, playlist, systemPlaylist, track, trackRepost } from "@/utils/testdata"
import { Track } from "@/utils/types"

const tratck = {
  title: "Against All Odds",
  publisher_metadata: {
    artist: "AMIDY, SpaceYeti",
  },
  user: {
    username: "AMIDY",
  },
} as Track
</script>
