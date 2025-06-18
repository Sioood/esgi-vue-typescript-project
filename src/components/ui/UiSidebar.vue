<template>
  <transition name="slide">
    <div
      v-if="visible"
      class="fixed right-0 top-12 w-96 h-[calc(100vh-3rem)] bg-orange-500 shadow-lg z-50 p-4 overflow-auto text-white"
    >
      <button class="absolute top-2 right-2" @click="close">✕</button>

      <h2 class="text-2xl font-bold mb-4">{{ name }}</h2>
      <img :src="image" :alt="name" class="w-full h-48 object-cover rounded mb-4" />
      <p class="mb-4">{{ description }}</p>

      <h3 class="font-bold mb-2">Ingrédients :</h3>
      <ul class="list-disc list-inside mb-4">
        <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
      </ul>

      <div class="font-bold text-xl">{{ price.toFixed(2) }} €</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
  description: string
  price: number
  image: string
  ingredients: string[]
  visible: boolean
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

function close() {
  emit('close')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
