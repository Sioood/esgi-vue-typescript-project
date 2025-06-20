<script setup lang="ts">
import UiNavbar from '@/components/ui/UiNavbar.vue'
import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import { useUserStore } from '@/stores/user'
import { ref, watchEffect } from 'vue'
import { extractStore } from '@/composables/store'

const openUsernameForm = ref<boolean>(false)

const { user } = extractStore(useUserStore())

watchEffect(() => {
  if (!user.value) {
    openUsernameForm.value = true
  }
})
</script>

<template>
  <div>
    <UiNavbar />

    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <Toaster richColors />
  </div>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
