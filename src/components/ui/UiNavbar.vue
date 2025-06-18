<template>
  <nav class="flex justify-between items-center bg-orange-500 px-4 py-2 mb-5 text-white font-bold">
    <div class="flex items-center space-x-2 text-xl">
      <Icon icon="emojione:hamburger" width="32" height="32" />
      <span>BURGOUZZZ DE WALOUZZZZZ</span>
    </div>
    <ul class="flex space-x-6 text-lg">
      <li v-if="user?.name" class="flex items-center gap-1">
        <span>Bonjour {{ user.name }}</span>
      </li>
      <li class="flex items-center gap-1">
        <Icon icon="ic:baseline-home" width="24" height="24" />
        <a href="/">Accueil</a>
      </li>
      <li class="flex items-center gap-1">
        <Icon icon="mdi:cart" width="24" height="24" />
        <RouterLink to="/panier">Panier</RouterLink>
      </li>
      <li class="flex items-center gap-1">
        <Icon icon="carbon:delivery" width="24" height="24" />
        <a href="/">Commandes</a>
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
