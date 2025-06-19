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
      <p class="text-gray-600 mb-4">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-semibold text-orange-600">{{ product.price }} €</span>

        <UiAddItemButton
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import UiAddItemButton from '@/components/ui/UiAddItemButton.vue';
import type { Product } from '@/stores/product';
const emit = defineEmits<{ (e: 'openSidebar'): void }>();
const showDetails = ref(false)

function toggleDetails() {
  showDetails.value = !showDetails.value
}

defineProps<{
  product: Product
}>();
</script>
