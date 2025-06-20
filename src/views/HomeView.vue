<template>
  <main class="p-6">
    <!-- Grille de tous les produits -->
    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      <UiMenuCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @openSidebar="openSidebar(product)"
        @openEdit="openEdit(product)"
      />
    </div>

    <!-- Sidebar détails produits -->
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

    <!-- Modal simple affichage ingrédients -->
    <UiDialog
      :open="openModalIngredients"
      closable
      :closableOnClickOutside="true"
      @close="openModalIngredients = false"
      @update:open="openModalIngredients = $event"
      triggerClass="fixed"
    >
      <template v-slot="{ close }">
        <div v-if="selectedProduct" class="p-6 flex flex-col gap-6 items-center justify-center max-h-[80vh] w-3xl overflow-auto">
          <h2 class="text-3xl font-bold mb-4">{{ selectedProduct.name }}</h2>
          <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-60 h-60 object-cover rounded mb-4" />
          <p class="mb-2">{{ selectedProduct.description }}</p>

          <h3 class="font-bold mb-2">Ingrédients :</h3>
          <ul class="list-disc list-inside">
            <li v-for="ingredient in selectedProduct.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>

          <div class="text-xl font-bold text-orange-600 mt-4">{{ selectedProduct.price.toFixed(2) }} €</div>

          <UiButton intent="primary" size="large" @click="close">Fermer</UiButton>
        </div>
      </template>
    </UiDialog>

    <!-- Modal de personnalisation avancée -->
    <UiDialog
      :open="openEditModal"
      closable
      :closableOnClickOutside="true"
      @close="openEditModal = false"
      @update:open="openEditModal = $event"
      triggerClass="fixed"
    >
      <template v-slot="{ close }">
        <div v-if="selectedProduct" class="p-4 flex flex-col gap-6 items-center justify-center max-h-[80vh] w-full overflow-auto">
          <h2 class="text-3xl font-bold mb-4 text-center">Personnaliser {{ selectedProduct.name }}</h2>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
            <div v-for="ingredient in ingredientStates" :key="ingredient.name"
                 class="flex flex-col items-center bg-white shadow rounded-lg p-3">
              <div :class="[ingredient.count === 0 ? 'text-gray-400' : 'text-black']" class="flex flex-col items-center gap-2">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600">
                  {{ ingredient.name[0] }}
                </div>
                <div class="text-xs font-semibold text-center">{{ ingredient.name }}</div>
              </div>

              <div class="flex items-center gap-2 mt-3">
                <UiButton size="small" intent="secondary" @click="decrement(ingredient)">-</UiButton>
                <div class="font-semibold w-6 text-center">{{ ingredient.count }}</div>
                <UiButton size="small" intent="primary" @click="increment(ingredient)">+</UiButton>
              </div>
            </div>
          </div>

          <div class="flex gap-4 mt-8">
            <UiButton intent="secondary" @click="close">Annuler</UiButton>
            <UiButton intent="primary" @click="confirmChanges(close)">Valider</UiButton>
          </div>
        </div>
      </template>
    </UiDialog>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import UiMenuCard from '@/components/ui/UiMenuCard.vue'
import UiButton from '@/components/ui/UiButton.vue'
import UiSidebar from '@/components/ui/UiSidebar.vue'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { extractStore } from '@/composables/store'
import type { Product } from '@/stores/product'
import UiDialog from '@/components/ui/UiDialog.vue'

const { products, getProducts } = extractStore(useProductStore())
const cartStore = useCartStore()

const selectedProduct = ref<Product | null>(null)
const sidebarVisible = ref(false)
const openModalIngredients = ref(false)
const openEditModal = ref(false)

onMounted(async () => {
  await getProducts()
})

// Gestion ouverture modale simple
function openSidebar(product: Product) {
  selectedProduct.value = product
  openModalIngredients.value = true
}

function closeSidebar() {
  sidebarVisible.value = false
}

// Gestion ouverture modale de personnalisation
function openEdit(product: Product) {
  selectedProduct.value = product
  initIngredientStates(product)
  openEditModal.value = true
}

// Liste complète de tous les ingrédients possibles
const allIngredients = [
  'Pain', 'Steak', 'Fromage', 'Salade', 'Tomate', 'Bacon', 'Oignon', 'Champignons', 'Œuf'
]

interface IngredientState {
  name: string
  count: number
}

const ingredientStates = ref<IngredientState[]>([])

function initIngredientStates(product: Product) {
  ingredientStates.value = allIngredients.map(ingredient => {
    const baseCount = product.ingredients.filter(i => i === ingredient).length
    return { name: ingredient, count: baseCount }
  })
}

function increment(ingredient: IngredientState) {
  ingredient.count += 1
}

function decrement(ingredient: IngredientState) {
  if (ingredient.count > 0) {
    ingredient.count -= 1
  }
}

function confirmChanges(close: Function) {
  if (selectedProduct.value) {
    const updatedIngredients = ingredientStates.value.flatMap(ing => Array(ing.count).fill(ing.name))
    const updatedProduct = { ...selectedProduct.value, ingredients: updatedIngredients }
    cartStore.addProduct(updatedProduct)
    close()
  }
}
</script>
