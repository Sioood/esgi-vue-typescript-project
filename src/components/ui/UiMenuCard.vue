<template>
  <div class="bg-white rounded-xl shadow overflow-hidden">
    <img :src="image" :alt="name" class="h-48 w-full object-cover" />
    <div class="p-4 flex flex-col justify-between">
      <h2 class="text-xl font-bold mb-2">{{ name }}</h2>
      <p class="text-gray-600 mb-4 line-clamp-2">{{ description }}</p>
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
import { useCartStore } from '@/stores/cart'
import { toast } from 'vue-sonner';

const cart = useCartStore()

// Props qu'on passe à la card
const props = defineProps<{
  id: number
  image: string
  name: string
  description: string
  price: number
}>()

// Event à émettre quand on clique sur "Ajouter"
const addToCart = () => {
  cart.addProduct({
    id: props.id,
    name: props.name,
    description: props.description,
    price: props.price,
    image: props.image,
  })
  toast.success(`${props.name} ajouté au panier !`)
}
</script>
