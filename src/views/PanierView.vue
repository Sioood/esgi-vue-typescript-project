<script setup lang="ts">
import UiButton from '@/components/ui/UiButton.vue'
import { useCartStore } from '@/stores/cart.ts'
import UiAddItemButton from '@/components/ui/UiAddItemButton.vue'
import { type Product, useProductStore } from '@/stores/product'
import { onMounted } from 'vue'
import { extractStore } from '@/composables/store'

const { products, getProducts} = extractStore(useProductStore())
const { items, formattedTotal } = extractStore(useCartStore())

onMounted(async () => {
  if (products.value.length === 0) {
    await getProducts()
  }
})

function getBaseIngredients(item: Product) {
  const baseProduct = products.value.find((p) => p.id === item.id)
  return baseProduct ? baseProduct.ingredients : []
}

function getRemovedIngredients(item: Product) {
  const base = getBaseIngredients(item)
  return base.filter((ingredient) => item.ingredients.filter((i) => i === ingredient).length === 0)
}

function getExtraIngredients(item: Product) {
  const base = getBaseIngredients(item)

  const baseCount = base.reduce(
    (acc, ing) => {
      acc[ing] = (acc[ing] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const currentCount = item.ingredients.reduce(
    (acc, ing) => {
      acc[ing] = (acc[ing] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.keys(currentCount).filter((ing) => currentCount[ing] > (baseCount[ing] || 0))
}

function getExtraIngredientCount(item: Product, ingredientName: string) {
  const baseProduct = products.value.find((p) => p.id === item.id)
  const baseCount = baseProduct
    ? baseProduct.ingredients.filter((i) => i === ingredientName).length
    : 0
  const currentCount = item.ingredients.filter((i) => i === ingredientName).length
  return currentCount - baseCount
}
</script>

<template>
  <main>
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-2xl font-bold mb-4">Mon Panier</h1>

      <div v-if="items.length === 0" class="text-gray-500">Votre panier est vide.</div>

      <div v-else class="space-y-4">
        <div
          v-for="item in items"
          :key="item.id"
          class="p-4 border rounded bg-white shadow space-y-2 sm:space-y-0 sm:flex sm:justify-between sm:items-center"
        >
          <div>
            <!-- Nom + indication personnalisé -->
            <div class="font-bold text-lg">
              {{ item.name }}
              <span
                v-if="
                  getRemovedIngredients(item).length > 0 || getExtraIngredients(item).length > 0
                "
                class="ml-2 text-orange-500 text-sm"
              >
                (Personnalisé)
              </span>
            </div>

            <!-- Quantité et prix -->
            <div class="text-gray-500 mb-1">{{ item.quantity }} x {{ item.price }} €</div>

            <!-- Ingrédients retirés -->
            <div class="text-sm flex flex-wrap items-center gap-1 mb-1">
              <template v-if="getRemovedIngredients(item).length === 0">
                <span class="text-gray-500">Aucun ingrédient retiré</span>
              </template>
              <template v-else>
                <template
                  v-for="removed in getRemovedIngredients(item)"
                  :key="'removed-' + removed"
                >
                  <span class="bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs">
                    - {{ removed }}
                  </span>
                </template>
              </template>
            </div>

            <!-- Ingrédients ajoutés -->
            <div class="text-sm flex flex-wrap items-center gap-1">
              <template v-if="getExtraIngredients(item).length === 0">
                <span class="text-gray-500">Aucun ingrédient ajouté</span>
              </template>
              <template v-else>
                <template v-for="added in getExtraIngredients(item)" :key="'added-' + added">
                  <span class="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs">
                    + {{ added }} (x{{ getExtraIngredientCount(item, added) }})
                  </span>
                </template>
              </template>
            </div>
          </div>
          <div class="flex justify-between items-center gap-4">
            <div class="font-bold text-lg">{{ item.price * (item.quantity || 1) }} €</div>

            <UiAddItemButton deleteAllVisible :product="item" />
          </div>
        </div>

        <div class="flex justify-between items-center mt-6 p-4 bg-orange-100 rounded-lg">
          <div class="text-xl font-bold">Total :</div>
          <div class="text-xl font-bold text-orange-600">{{ formattedTotal }}</div>
        </div>

        <div class="mt-4">
          <RouterLink to="/commande">
            <UiButton intent="primary" size="large" class="w-full">Commander</UiButton>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

