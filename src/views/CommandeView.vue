<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'
import UiButton from '@/components/ui/UiButton.vue'
import UiInput from '@/components/ui/UiInput.vue'
import { useUserStore } from '@/stores/user'
import { extractStore } from '@/composables/store'
import { toast } from 'vue-sonner'

const cart = useCartStore()
const router = useRouter()

const { user, setUser } = extractStore(useUserStore())

const name = ref(user.value?.name || '')
const email = ref(user.value?.email || '')
const address = ref(user.value?.address || '')
const error = ref('')

function isValidEmail(mail: string) {
  return /\S+@\S+\.\S+/.test(mail)
}

async function submitOrder() {
  error.value = ''

  if (!name.value || !email.value || !address.value) {
    error.value = 'Tous les champs sont requis'
    return
  }

  if (!isValidEmail(email.value)) {
    error.value = 'Email invalide'
    return
  }

  const order = {
    customer: {
      name: name.value,
      email: email.value,
      address: address.value,
    },
    items: cart.items,
  }

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'envoi de la commande")
    }

    cart.clearCart()
    toast.success('Commande envoyée')

    router.push('/confirmation')
  } catch (err: any) {
    error.value = err.message || 'Erreur inattendue'
  }
}
</script>

<template>
  <div>
    <main class="p-6">
      <h1 class="text-2xl font-bold mb-4">Finaliser ma commande</h1>

      <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

      <form class="space-y-4" @submit.prevent="submitOrder">
        <UiInput
          id="name"
          label="Nom"
          v-model="name"
          intent="primary"
          size="medium"
          @update:model-value="setUser({ name })"
        />
        <UiInput
          id="email"
          label="Email"
          type="email"
          v-model="email"
          intent="primary"
          size="medium"
          @update:model-value="setUser({ name, email })"
        />
        <UiInput
          id="address"
          label="Adresse"
          v-model="address"
          intent="primary"
          size="medium"
          @update:model-value="setUser({ name, address })"
        />

        <UiButton intent="primary" size="large" class="w-full" type="submit">
          Valider ma commande
        </UiButton>
      </form>
    </main>
  </div>
</template>

<style>
@import url('vue-sonner/style.css');
</style>
