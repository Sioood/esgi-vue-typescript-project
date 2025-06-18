<template>
  <nav
    class="sticky top-0 flex justify-between items-center bg-orange-500 px-4 py-2 mb-5 text-white font-bold"
  >
    <div class="flex items-center space-x-2 text-xl">
      <img class="size-10 rounded" src="https://media.fortniteapi.io/images/cosmetics/f86b3d5-a88f224-dad1a85-638e91d/v2/icon_background.png" alt="">
      <!-- Le texte s'affiche seulement à partir de sm -->
      <span class="hidden sm:inline">BURGOUZZZ DE WALOUZZZZZ</span>
    </div>

    <ul class="flex space-x-6 text-lg">
      <li v-if="user?.name" class="flex items-center gap-1">
        <span class="hidden sm:inline">Bonjour {{ user.name }}</span>
      </li>
      <li class="flex items-center gap-1">
        <RouterLink to="/" class="flex items-center gap-1">
          <Icon icon="ic:baseline-home" width="24" height="24" />
          <span class="hidden sm:inline">Accueil</span>
        </RouterLink>
      </li>
      <li class="flex items-center gap-1">
        <RouterLink to="/panier" class="flex items-center gap-1">
          <Icon icon="mdi:cart" width="24" height="24" />
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
import { extractStore } from '@/composables/store'
const { user } = extractStore(useUserStore())
</script>
