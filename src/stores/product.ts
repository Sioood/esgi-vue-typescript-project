import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  quantity?: number
  ingredients: string[]
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])

  const getProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products')
      const data = await response.json()
      products.value = data
    } catch (error) {
      toast.error('Une erreur est survenue lors de la récupération des produits')
      console.error('Erreur lors de la récupération des produits:', error)
    }
  }

  return { products, getProducts }
})
