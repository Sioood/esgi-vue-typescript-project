<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/stores/product'

interface Customer {
  name: string
  email: string
  address: string
}

interface Order {
  id: number
  date: string
  customer: Customer
  items: Product[]
}

const orders = ref<Order[]>([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/orders')
    if (!response.ok) throw new Error('Erreur lors de la récupération des commandes')
    orders.value = await response.json()
  } catch (err: any) {
    error.value = err.message || 'Erreur inattendue'
  }
})
</script>

<template>
  <main>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Liste des commandes</h1>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <div v-if="orders.length === 0">
        <p>Aucune commande enregistrée.</p>
      </div>

      <div v-else class="space-y-6">
        <div v-for="order in orders" :key="order.id" class="p-4 border rounded-lg shadow bg-white">
          <div class="mb-2 font-bold text-lg">
            Commande #{{ order.id }} - {{ new Date(order.date).toLocaleString() }}
          </div>

          <div class="mb-2">
            Client : <strong>{{ order.customer.name }}</strong> ({{ order.customer.email }})
            <br />
            Adresse : {{ order.customer.address }}
          </div>

          <div class="space-y-1">
            <div v-for="item in order.items" :key="item.id" class="flex justify-between">
              <div>{{ item.quantity }} x {{ item.name }}</div>
              <div>{{ (item.price * (item.quantity || 1)).toFixed(2) }} €</div>
            </div>
          </div>

          <div class="mt-2 font-bold text-right">
            Total :
            {{
              order.items
                .reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)
                .toFixed(2)
            }}
            €
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
