<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UiButton from '../components/ui/UiButton.vue'

const message = ref('');

// Appel à l'API quand le composant est monté
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/hello');
    const data = await response.json();
    message.value = data.message;
  } catch (error) {
    console.error('Erreur lors de la récupération du message:', error);
  }
});
</script>

<template>
  <main>
    {{ message }}
    <UiButton intent="primary" size="medium">Button</UiButton>
  </main>
</template>
