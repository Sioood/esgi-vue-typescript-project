import { defineStore } from 'pinia'
import { ref } from 'vue'
import { watch } from 'vue'
import { computed } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  quantity?: number
  ingredients: string[]
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<Product[]>([])

  const stored = localStorage.getItem('cart')
  if (stored) {
    items.value = JSON.parse(stored)
  }

  function addProduct(product: Product) {
    const existing = items.value.find((item) => item.id === product.id)
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const quantity = computed(() =>
    items.value.reduce((total, item) => total + (item.quantity || 1), 0),
  )

  function removeProduct(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  const total = computed(() => {
    return items.value.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
  })

  watch(
    items,
    () => {
      localStorage.setItem('cart', JSON.stringify(items.value))
    },
    { deep: true },
  )

  function clearCart() {
    items.value = []
  }

  const formattedTotal = computed(() => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
      total.value,
    )
  })

  return { items, addProduct, removeProduct, clearCart, total, formattedTotal, quantity }
})
