<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { extractStore } from '@/composables/store'
import UiButton from '@/components/ui/UiButton.vue'
import JSConfetti from 'js-confetti'
import { onMounted } from 'vue'


onMounted(() => {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    emojis: ['🍔', '🍕', '🍟'],
  })
})

const { user } = extractStore(useUserStore())
</script>

<template>
  <main class="p-4 h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-green-600">Merci pour votre commande {{ user?.name }} !</h1>
    <h6 class="text-md text-green-600">Elle va vous être livrée le plus rapidement possible.</h6>

    <RouterLink to="/" class="mt-4">
      <UiButton intent="primary" size="medium">Retourner à l'accueil</UiButton>
    </RouterLink>
  </main>
</template>
