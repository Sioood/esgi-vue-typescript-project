<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { extractStore } from '@/composables/store'

const { user } = extractStore(useUserStore())
</script>

<template>
  <main class="p-4 h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-green-600">Merci pour votre commande {{ user?.name }} !</h1>
    <h6 class="text-md text-green-600">Elle va vous être livrée le plus rapidement possible.</h6>
  </main>
</template>
