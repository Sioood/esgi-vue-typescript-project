<template>
  <main class="p-6">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      <UiMenuCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @openSidebar="openSidebar(product)"
      />
    </div>

    <UiSidebar
      v-if="sidebarVisible && selectedProduct"
      :id="selectedProduct.id"
      :name="selectedProduct.name"
      :description="selectedProduct.description"
      :price="selectedProduct.price"
      :image="selectedProduct.image"
      :ingredients="selectedProduct.ingredients"
      :visible="sidebarVisible"
      @close="closeSidebar"
    />

    <UiDialog
      :open="openModalIngredients"
      closable
      :closableOnClickOutside="true"
      @close="openModalIngredients = false"
      @update:open="openModalIngredients = $event"
      triggerClass="fixed"
    >
      <template v-slot="{ close }">
        <div
          v-if="selectedProduct"
          class="p-6 flex flex-col gap-6 items-center justify-center max-h-[80vh] w-3xl overflow-auto"
        >
          <h2 class="text-3xl font-bold mb-4">{{ selectedProduct.name }}</h2>
          <img
            :src="selectedProduct.image"
            :alt="selectedProduct.name"
            class="w-60 h-60 object-cover rounded mb-4"
          />
          <p class="mb-2">{{ selectedProduct.description }}</p>

          <h3 class="font-bold mb-2">Ingrédients :</h3>
          <ul class="list-disc list-inside">
            <li v-for="ingredient in selectedProduct.ingredients" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>

          <div class="text-xl font-bold text-orange-600 mt-4">
            {{ selectedProduct.price.toFixed(2) }} €
          </div>

          <UiButton intent="primary" size="large" @click="close">Fermer</UiButton>
        </div>
      </template>
    </UiDialog>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import UiMenuCard from '@/components/ui/UiMenuCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiSidebar from '@/components/ui/UiSidebar.vue'
import { useProductStore } from '@/stores/product'
import { extractStore } from '@/composables/store'
import type { Product } from '@/stores/product'
import { toast } from 'vue-sonner'
import UsernameForm from '@/components/UsernameForm.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import { useUserStore } from '@/stores/user.ts'

const { products, getProducts } = extractStore(useProductStore())
const selectedProduct = ref<Product | null>(null)
const sidebarVisible = ref(false)
const openModalIngredients = ref<boolean>(false)

onMounted(async () => {
  await getProducts()
})

function openSidebar(product: Product) {
  selectedProduct.value = product
  openModalIngredients.value = true
}

function closeSidebar() {
  sidebarVisible.value = false
}
</script>
