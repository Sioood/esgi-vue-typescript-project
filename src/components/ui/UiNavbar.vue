<template>
  <nav
    class="z-[999] sticky top-0 flex justify-between items-center bg-orange-500 px-4 py-2 mb-5 text-white font-bold shadow"
  >
    <div class="flex items-center space-x-2 text-xl">
      <img
        class="size-10 rounded"
        src="https://media.fortniteapi.io/images/cosmetics/f86b3d5-a88f224-dad1a85-638e91d/v2/icon_background.png"
        alt=""
      />
      <!-- Le texte s'affiche seulement à partir de sm -->
      <span class="hidden sm:inline">BURGOUZZZ DE WALOUZZZZZ</span>
    </div>

    <ul class="flex space-x-6 text-lg">
      <li v-if="user?.name" class="flex items-center gap-1">
        <span class="hidden sm:inline">Bonjour {{ user.name }}</span>
        <button @click="logout" class="cursor-pointer">
          <Icon icon="mdi:logout" width="24" height="24" />
        </button>
      </li>
      <li class="flex items-center gap-1">
        <RouterLink to="/" class="flex items-center gap-1">
          <Icon icon="ic:baseline-home" width="24" height="24" />
          <span class="hidden sm:inline">Accueil</span>
        </RouterLink>
      </li>
      <li class="flex items-center gap-1">
        <RouterLink to="/panier" class="flex items-center gap-1 relative">
          <span
            v-if="cart.quantity > 0"
            class="absolute -top-2 left-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ cart.quantity }}
          </span>
          <Icon id="cart-icon" icon="mdi:cart" width="24" height="24" />
          <span class="hidden sm:inline">Panier</span>
        </RouterLink>
      </li>
      <li class="flex items-center gap-1">
        <RouterLink to="/commandes" class="flex items-center gap-1">
          <Icon icon="carbon:delivery" width="24" height="24" />
          <span class="hidden sm:inline">Commandes</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { extractStore } from '@/composables/store'
const { user, logout } = extractStore(useUserStore())
const cart = useCartStore()
</script>
