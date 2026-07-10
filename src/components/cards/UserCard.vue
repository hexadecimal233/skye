<template>
  <div @click="$router.push(`/user/${user.id}`)" :title="user.username" class="custom-card-flex">
    <div class="rounded-md">
      <img
        :src="replaceImageUrl(user.avatar_url)"
        alt="cover"
        class="w-full h-full object-cover rounded-full" />
    </div>
    <div class="flex flex-col p-3 items-center gap-1 justify-center">
      <div class="truncate font-bold">{{ user.username }}</div>
      <div class="line-clamp-2 text-sm text-center">{{ user.description }}</div>
      <UButton
        :label="userStore.followingIds.includes(user.id) ? $t('cloudie.user.unfollow') : $t('cloudie.user.follow')"
        :icon="userStore.followingIds.includes(user.id) ? 'i-mingcute-user-follow-fill' : 'i-mingcute-user-follow-line'"
        :color="userStore.followingIds.includes(user.id) ? 'primary' : 'neutral'"
        @click="userStore.toggleFollowUser(user.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/systems/stores/user"
import { SCUser } from "@/utils/types"
import { replaceImageUrl } from "@/utils/utils"

const userStore = useUserStore()

defineProps<{
  user: SCUser
}>()
</script>
