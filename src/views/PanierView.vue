<script setup lang="ts">
import { onMounted } from 'vue'
import UiButton from '../components/ui/UiButton.vue'
import { useCartStore } from '@/stores/cart.ts'
import { toast } from 'vue-sonner'
import type { Product } from '@/views/HomeView.vue'

const cart = useCartStore()

const removeProduct = (product: Product) => {
  cart.removeProduct(product.id)
  toast.success(`${product.name} supprimé du panier`)
}

onMounted(async () => {
  try {
  } catch (error) {}
})
</script>

<template>
  <main>
    <!--    <UiButton intent="primary" size="medium">Button</UiButton>-->
    <div class="ps-72 pe-72">
      <h1 class="text-2xl font-bold mb-4">Mon Panier</h1>

      <div v-if="cart.items.length === 0" class="text-gray-500">Votre panier est vide.</div>

      <div v-else class="space-y-4">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex justify-between items-center p-4 border rounded bg-white shadow"
        >
          <div>
            <div class="font-bold text-lg">{{ item.name }}</div>
            <div class="text-gray-500">{{ item.quantity }} x {{ item.price }} €</div>
          </div>
          <div class="flex items-center gap-4">
            <div class="font-bold text-lg">{{ item.price * (item.quantity || 1) }} €</div>
            <UiButton intent="error" size="small" @click="removeProduct(item)">
              Supprimer
            </UiButton>
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 p-4 bg-orange-100 rounded-lg">
          <div class="text-xl font-bold">Total :</div>
          <div class="text-xl font-bold text-orange-600">{{ cart.formattedTotal }}</div>
        </div>

        <div class="mt-4">
          <RouterLink to="/commande">
            <UiButton intent="primary" size="large" class="w-full"> Commander </UiButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>
