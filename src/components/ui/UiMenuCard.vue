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
        <UiButton :id="`edit-button-${product.id}`" intent="warning" class="m-2"
                  @click="$emit('openEdit', product)">
          <Icon icon="mdi:cookie-edit" width="20" height="20"/>
          <span>Editer le produit</span>
        </UiButton>

        <UiAddItemButton
          :product="product"
        />


      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, nextTick} from 'vue'
import UiAddItemButton from '@/components/ui/UiAddItemButton.vue';
import type {Product} from '@/stores/product';
import {Icon} from "@iconify/vue";
import UiButton from "@/components/ui/UiButton.vue";
import {toast} from "vue-sonner";
import UiDialog from "@/components/ui/UiDialog.vue";

const showDetails = ref(false)
const emit = defineEmits<{
  (e: 'openEdit', product: Product): void
}>()

function toggleDetails() {
  showDetails.value = !showDetails.value
}

defineProps<{
  product: Product
}>();
</script>
