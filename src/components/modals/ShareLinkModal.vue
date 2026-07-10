<template>
  <UModal :close="{ onClick: () => emit('close', false) }" :title="$t('skye.shareLinkModal.title')">
    <template #body>
      <p>{{$t("skye.shareLinkModal.description")}}</p>
      <UFieldGroup class="w-full">
        <UInput class="w-full" v-model="link" readonly />
        <UTooltip :text="$t('skye.common.copy')" :content="{ side: 'right' }">
          <UButton
            :color="copied ? 'success' : 'neutral'"
            variant="outline"
            size="sm"
            :icon="copied ? 'i-mingcute-task-line' : 'i-mingcute-clipboard-line'"
            @click="copy(link); toast.add({ title: $t('skye.common.copySuccess'), color: 'success' })" />
        </UTooltip>
      </UFieldGroup>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useClipboard } from "@vueuse/core"
import { computed } from "vue"

const props = defineProps<{
  link: string
}>()

const emit = defineEmits(["close"])
const link = computed(() => props.link)

const { copy, copied } = useClipboard()
const toast = useToast()
</script>
