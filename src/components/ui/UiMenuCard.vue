<template>
  <div class="bg-white rounded-xl shadow-md overflow-hidden w-72">
    <img :src="image" :alt="name" class="h-48 w-full object-cover" />
    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">{{ name }}</h2>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-orange-600">{{ price }} €</span>
        <button
          @click="addToCart()"
          class="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
        >
          <Icon icon="mdi:cart-plus" width="20" height="20" />
          Ajouter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Props qu'on passe à la card
defineProps<{
  image: string
  name: string
  description: string
  price: number
}>()

// Event à émettre quand on clique sur "Ajouter"
const addToCart = () => {
  // Ici tu peux faire un emit pour notifier le parent
  // Par exemple :
  // emit('add', { id, name, price })
  alert('Burger ajouté au panier !')
}
</script>
