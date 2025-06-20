<template>
  <div class="bg-white rounded-xl shadow overflow-hidden">
    <img
      :src="product.image"
      :alt="product.name"
      class="h-48 w-full object-cover cursor-pointer"
      @click="toggleDetails"
    />
    <transition name="collapse">
      <div v-show="showDetails" class="overflow-hidden bg-orange-50 p-4">
        <h3 class="font-bold mb-2">Ingrédients :</h3>
        <ul class="list-disc list-inside">
          <li v-for="ingredient in product.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
    </transition>

    <div class="p-4 flex flex-col justify-between">
      <h2 class="text-xl font-bold mb-2">{{ product.name }}</h2>
      <p class="text-gray-600 mb-2">{{ product.description }}</p>
      <span class="text-lg font-semibold text-orange-600">{{ product.price }} €</span>
      <div class="flex justify-between items-center">
        <UiButton
          :id="`edit-button-${product.id}`"
          intent="warning"
          class="m-2"
          @click="$emit('openEdit', product)"
        >
          <Icon icon="mdi:cookie-edit" width="20" height="20" />
          <span>Editer le produit</span>
        </UiButton>

        <UiButton
          :id="`add-button-${product.id}`"
          intent="warning"
          class="m-2"
          @click="addToCart(product)"
        >

          <Icon icon="mdi:cart-plus" width="20" height="20" />
          <span >Ajouter au panier</span>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/stores/product'
import { Icon } from '@iconify/vue'
import UiButton from '@/components/ui/UiButton.vue'
import { useCartStore } from '@/stores/cart'
import { extractStore } from '@/composables/store'
import { useFlyToCart } from '@/composables/useFlyToCart.ts'
import { toast } from 'vue-sonner'

const { fly } = useFlyToCart()

const { addProduct } = extractStore(useCartStore())

const showDetails = ref(false)

function toggleDetails() {
  showDetails.value = !showDetails.value
}

const addToCart = (product: Product) => {
  addProduct(product)
  const fromEl = document.getElementById(`add-button-${product.id}`)
  const toEl = document.getElementById('cart-icon')
  if (fromEl && toEl) {
    fly(product.image, fromEl, toEl)
  }
  toast.success(`${product.name} ajouté au panier !`)
}

defineProps<{
  product: Product
}>()
</script>
