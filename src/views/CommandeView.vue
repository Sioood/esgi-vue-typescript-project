<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import UiNavbar from '../components/ui/UiNavbar.vue'
import UiButton from '../components/ui/UiButton.vue'

const cart = useCartStore();
const router = useRouter()

const name = ref('');
const email = ref('');
const address = ref('');
const error = ref('');

function isValidEmail(mail: string) {
  return /\S+@\S+\.\S+/.test(mail);
}

async function submitOrder() {
  error.value = '';

  if (!name.value || !email.value || !address.value) {
    error.value = 'Tous les champs sont requis';
    return;
  }

  if (!isValidEmail(email.value)) {
    error.value = 'Email invalide';
    return;
  }

  const order = {
    customer: {
      name: name.value,
      email: email.value,
      address: address.value
    },
    items: cart.items
  };

  try {
    const response = await fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi de la commande');
    }

    cart.clearCart();

    router.push('/confirmation');
  } catch (err: any) {
    error.value = err.message || 'Erreur inattendue';
  }
}
</script>

<template>
  <main class="p-4">
    <UiNavbar />

    <h1 class="text-2xl font-bold mb-4">Finaliser ma commande</h1>

    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <div class="space-y-4">
      <input v-model="name" type="text" placeholder="Nom" class="w-full p-2 border rounded" />
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" />
      <input v-model="address" type="text" placeholder="Adresse" class="w-full p-2 border rounded" />

      <UiButton intent="primary" size="large" class="w-full" @click="submitOrder">
        Valider ma commande
      </UiButton>
    </div>
  </main>
</template>
