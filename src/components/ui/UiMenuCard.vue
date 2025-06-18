<template>
  <div class="bg-white rounded-xl shadow overflow-hidden">
    <img
      :src="image"
      :alt="name"
      class="h-48 w-full object-cover cursor-pointer"
      @click="toggleDetails"
    />

    <transition name="collapse">
      <div v-show="showDetails" class="overflow-hidden bg-orange-50 p-4">
        <h3 class="font-bold mb-2">Ingrédients :</h3>
        <ul class="list-disc list-inside">
          <li v-for="ingredient in ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
    </transition>

    <div class="p-4 flex flex-col justify-between">
      <h2 class="text-xl font-bold mb-2">{{ name }}</h2>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-orange-600">{{ price }} €</span>
        <button
          :id="`add-button-${id}`"
          @click.stop="addToCart()"
          class="cursor-pointer flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-lg hover:bg-orange-600 transition"
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
import { toast } from 'vue-sonner'
import { ref, nextTick } from 'vue'
import { useFlyToCart } from '@/composables/useFlyToCart'

const { fly } = useFlyToCart()
const cart = useCartStore()
const emit = defineEmits<{ (e: 'openSidebar'): void }>()
const details = ref<HTMLDivElement | null>(null)

function openSidebar() {
  emit('openSidebar')
}

const showDetails = ref(false)

function toggleDetails() {
  showDetails.value = !showDetails.value
}

// Props qu'on passe à la card
const props = defineProps<{
  id: number
  image: string
  name: string
  description: string
  price: number
  ingredients: string[]
}>()

// Event à émettre quand on clique sur "Ajouter"
const addToCart = () => {
  cart.addProduct({
    id: props.id,
    name: props.name,
    description: props.description,
    price: props.price,
    image: props.image,
    ingredients: props.ingredients,
  })
  const fromEl = document.getElementById(`add-button-${props.id}`)
  const toEl = document.getElementById('cart-icon')
  if (fromEl && toEl) {
    fly(props.image, fromEl, toEl)
  }
  toast.success(`${props.name} ajouté au panier !`)
}
</script>
