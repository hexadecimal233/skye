<template>
  <div>
    <UButton @click="openModal(ShareLinkModal, { link: 'https://www.google.com' })">google</UButton>
  </div>
</template>

<script setup lang="ts">
import ShareLinkModal from "@/components/modals/ShareLinkModal.vue"
import { openModal } from "@/utils/utils"
</script>
