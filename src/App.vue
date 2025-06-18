<script setup lang="ts">
import UiNavbar from '@/components/ui/UiNavbar.vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <div>
    <UiNavbar />
    <RouterView />
    <Toaster richColors />
  </div>
</template>
