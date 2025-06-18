<template>
  <div class="flex flex-wrap gap-2 items-center justify-center">
    <UiButton v-if="deleteAllVisible" intent="error" @click="removeFromCart()">
      <Icon icon="mdi:trashcan" width="20" height="20" />
    </UiButton>

    <UiButton v-if="total > 0 && (!deleteAllVisible || total > 1)" :intent="total === 1 ? 'error' : 'warning'" @click="subtractFromCart()">
      <Icon v-if="total === 1" icon="mdi:trashcan" width="20" height="20" />
      <Icon v-else icon="mdi:minus" width="20" height="20" />
    </UiButton>

    <span v-if="total > 0" class="mx-3 font-bold">
      {{ total }}
    </span>

    <UiButton intent="warning" @click="addToCart">
      <Icon icon="mdi:cart-plus" width="20" height="20" />
      <span v-if="!isProductInCart">Ajouter au panier</span>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UiButton from '@/components/ui/UiButton.vue'
import type { Product } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { extractStore } from '@/composables/store'
import { computed } from 'vue'
import { toast } from 'vue-sonner'

const { items, addProduct, subtractProduct, removeProduct } = extractStore(useCartStore())

const props = withDefaults(
  defineProps<{
    product: Product
    deleteAllVisible?: boolean
  }>(),
  {
    deleteAllVisible: false,
  },
)

const isProductInCart = computed(() => items.value.some((item) => item.id === props.product?.id))
const total = computed(() => {
  if (!isProductInCart.value) return 0

  return items.value
    .filter((item) => item.id === props.product?.id)
    .reduce((acc, item) => acc + (item.quantity || 1), 0)
})

const addToCart = () => {
  addProduct(props.product)
  toast.success(`${props.product.name} ajouté au panier !`)
}

const subtractFromCart = () => {
  subtractProduct(props.product.id)
  toast.success(`${props.product.name} supprimé du panier`)
}

const removeFromCart = () => {
  removeProduct(props.product.id)
  toast.success(`${props.product.name} supprimé du panier`)
}
</script>
