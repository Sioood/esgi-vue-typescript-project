<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UiButton from '../components/ui/UiButton.vue'
import UiNavbar from '../components/ui/UiNavbar.vue'
import UiCard from '../components/ui/UiCard.vue'

onMounted(async () => {
  try {
  } catch (error) {}
})
</script>

<template>
  <main>
    <UiNavbar></UiNavbar>
    <UiButton intent="primary" size="medium">Button</UiButton>
  </main>
</template>
