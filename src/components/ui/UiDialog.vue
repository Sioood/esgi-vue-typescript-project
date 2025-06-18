<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogTrigger :class="triggerClass">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="bg-black/15 fixed top-0 w-[100vw] h-[100vh]" />
      <DialogContent
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        @interact-outside="
          (event) => {
            if (!closableOnClickOutside) return event.preventDefault()
          }
        "
      >
        <UiCard class="flex flex-col">
          <UiButton
            v-if="closable"
            intent="ghost"
            size="small"
            @click="emit('close')"
            class="w-full justify-end"
          >
            <Icon icon="mdi:close" width="20" height="20" />
          </UiButton>
          <DialogTitle>
            <slot name="title" />
          </DialogTitle>
          <DialogDescription>
            <slot name="description" />
          </DialogDescription>
          <slot :open="open" :close="() => emit('close')" />
        </UiCard>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { Icon } from '@iconify/vue'
import UiCard from './UiCard.vue'
import UiButton from './UiButton.vue'

defineProps<{
  open: boolean
  closable?: boolean
  closableOnClickOutside?: boolean
  triggerClass?: string
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'open'): void
  (e: 'close'): void
}>()
</script>
