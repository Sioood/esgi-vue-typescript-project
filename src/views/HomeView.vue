<template>
<div>
  <UiNavbar />
  <main class="p-6">

    <UiDialog
      :open="openUsernameForm"
      :closableOnClickOutside="false"
      @close="openUsernameForm = false"
      @update:open="openUsernameForm = $event"
      triggerClass="fixed"
    >
      <template v-slot="{ close }">
        <UsernameForm
          :onSubmit="
            (username: string) => {
              setUser({ name: username })
              close()
            }
          "
        />
      </template>
    </UiDialog>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
      <UiMenuCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="'https://burgeraddict.fr/wp-content/uploads/2024/09/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg'"
        :name="product.name"
        :description="product.description"
        :price="product.price"
      />
    </div>
  </main>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import UiNavbar from '@/components/ui/UiNavbar.vue'
import UiMenuCard from '@/components/ui/UiMenuCard.vue'
import UiDialog from '@/components/ui/UiDialog.vue'
import UsernameForm from '@/components/UsernameForm.vue'
import { useUserStore } from '@/stores/user'
import { extractStore } from '@/composables/store'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const products = ref<Product[]>([])
const openUsernameForm = ref<boolean>(false)
const { user, setUser } = extractStore(useUserStore())

watchEffect(() => {
  if (!user.value) {
    openUsernameForm.value = true
  }
})

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/products')
    const data = await response.json()
    products.value = data
    console.log('Produits récupérés :', data)
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error)
  }
})
</script>
