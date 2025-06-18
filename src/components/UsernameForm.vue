<template>
  <form
    class="inline-flex items-end gap-2"
    @submit.prevent="username.trim() !== '' ? onSubmit(username) : $event.preventDefault()"
  >
    <UiInput id="name" label="Votre nom" v-model="username" intent="primary" size="medium" />
    <UiButton intent="primary" size="medium" type="submit">Valider</UiButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiInput from '@/components/ui/UiInput.vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useUserStore } from '@/stores/user'

const { user } = useUserStore()
const username = ref(user?.name || '')

defineProps<{
  onSubmit: (username: string) => void
}>()
</script>
