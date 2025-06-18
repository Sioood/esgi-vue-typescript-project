<template>
  <main class="p-6">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      <UiMenuCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg'"
        :name="product.name"
        :description="product.description"
        :price="product.price"
        :ingredients="product.ingredients"
        @openSidebar="openSidebar(product)"
      />
    </div>

    <UiSidebar
      v-if="sidebarVisible && selectedProduct"
      :id="selectedProduct.id"
      :name="selectedProduct.name"
      :description="selectedProduct.description"
      :price="selectedProduct.price"
      :image="'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg'"
      :ingredients="selectedProduct.ingredients"
      :visible="sidebarVisible"
      @close="closeSidebar"
    />

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UiMenuCard from '@/components/ui/UiMenuCard.vue'
import UiSidebar from '@/components/ui/UiSidebar.vue'
import { useProductStore } from '@/stores/product'
import { extractStore } from '@/composables/store'
import type { Product } from '@/stores/product'

const { products, getProducts } = extractStore(useProductStore())
const selectedProduct = ref<Product | null>(null);
const sidebarVisible = ref(false);

onMounted(async () => {
  await getProducts()
})

function openSidebar(product: Product) {
  if (sidebarVisible.value && selectedProduct.value?.id === product.id) {
    sidebarVisible.value = false;
  } else {
    selectedProduct.value = product;
    sidebarVisible.value = true;
  }
}

function closeSidebar() {
  sidebarVisible.value = false;
}
</script>
