<template>
  <!-- TODO: Dark mode force / lyric correct display -->
  <Transition
    enter-active-class="transition-all duration-500 ease-in-out"
    enter-from-class="transform translate-y-full"
    enter-to-class="transform translate-y-0"
    leave-active-class="transition-all duration-500 ease-in-out"
    leave-from-class="transform translate-y-0"
    leave-to-class="transform translate-y-full">
    <div v-show="player.isFullscreen" class="fixed inset-0 size-full flex z-50">
      <div class="w-full h-full absolute inset-0 bg-default">
        <BackgroundRender
          :album="player.track ? replaceImageUrl(getCoverUrl(player.track), '1080x1080') : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='"
          :flow-speed="player.isPaused ? 0.01 : 2"
          class="size-full" />
      </div>
      <div class="w-full h-full flex flex-col z-1">
        <!-- 顶部控制栏 -->
        <div class="flex justify-between items-center p-4">
          <UButton
            icon="i-mingcute-close-line"
            variant="ghost"
            color="neutral"
            size="xl"
            @click="player.isFullscreen = false"></UButton>
          <div class="text-lg font-medium">Fullscreen Player</div>
          <div class="w-10"></div><!-- 占位符保持居中 -->
        </div>

        <!-- 主要内容区域 -->
        <div class="flex-1 flex size-full">
          <!-- 左侧播放器控制区域 -->
          <div class="flex flex-col items-center justify-center w-xl p-24 gap-4 shrink-0">
            <div class="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
              <img
                v-if="player.track"
                :src="replaceImageUrl(getCoverUrl(player.track), '1080x1080')"
                class="size-full  object-cover rounded-lg shadow-xl" />
            </div>

            <div v-if="player.track" class="text-center">
              <p class="text-2xl font-bold">{{ player.track.title }}</p>
              <p class="text-lg text-gray-600 dark:text-gray-400">{{ getArtist(player.track) }}</p>
            </div>

            <!-- 进度条 -->
            <PlayerProgress class="h-3" />

            <!-- 控制按钮 -->
            <PlayerControls />
          </div>

          <!-- 右侧歌词区域 -->
          <div class="flex-1 flex justify-center h-full min-w-0 px-4">
            <Lyrics
              :track="player.track"
              v-if="player.track"
              class="h-full text-4xl font-bold mix-blend-plus-lighter" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/systems/stores/player"
import { getArtist, getCoverUrl, replaceImageUrl } from "@/utils/utils"
import { BackgroundRender } from "@applemusic-like-lyrics/vue"
import Lyrics from "@/components/Lyrics.vue"

const player = usePlayerStore()
</script>
