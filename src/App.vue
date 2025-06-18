<script setup lang="ts">
import UiNavbar from '@/components/ui/UiNavbar.vue'
import { toast, Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'
import UiDialog from '@/components/ui/UiDialog.vue'
import UsernameForm from '@/components/UsernameForm.vue'
import { useUserStore } from '@/stores/user'
import { ref, watchEffect } from 'vue'
import { extractStore } from '@/composables/store'

const openUsernameForm = ref<boolean>(false)

const { user, setUser } = extractStore(useUserStore())

watchEffect(() => {
  if (!user.value) {
    openUsernameForm.value = true
  }
})
</script>

<template>
  <div>
    <UiNavbar />
    <RouterView />
    <Toaster richColors />

    <UiDialog
      :open="openUsernameForm"
      :closableOnClickOutside="false"
      @close="openUsernameForm = false"
      @update:open="openUsernameForm = $event"
      triggerClass="fixed"
    >
      <template v-slot="{ close }">
        <div class="p-6 flex flex-col gap-6 items-center justify-center">
          <div class="flex flex-col gap-1 items-center">
            <h2 class="text-4xl font-bold">Bienvenue sur Burgouzzzzz</h2>
            <h3>Pour une expérience personnalisée, veuillez renseigner votre nom</h3>
          </div>
          <UsernameForm
            :onSubmit="
              (username: string) => {
                setUser({ name: username })
                toast.success(`Bienvenue ${user!.name}`)
                close()
              }
            "
          />
        </div>
      </template>
    </UiDialog>
  </div>
</template>
