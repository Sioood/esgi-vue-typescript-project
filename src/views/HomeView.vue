<script setup lang="ts">
import { ref, onMounted } from 'vue';
import UiButton from '../components/ui/UiButton.vue'
import UiNavbar from '../components/ui/UiNavbar.vue'
import UiCard from '../components/ui/UiCard.vue'

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

const products = ref<Product[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const data = await response.json();
    products.value = data;
    console.log('Produits récupérés :', data);
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
  }
});
</script>

<template>
  <main>
    <UiNavbar></UiNavbar>
    <UiButton intent="primary" size="medium">Button</UiButton>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      <UiCard
        v-for="product in products"
        :key="product.id"
        :image="'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg'"
        :name="product.name"
        :description="product.description"
        :price="product.price"
      />
    </div>

  </main>
</template>
