import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  interface User {
    name: string
    email?: string
    adress?: string
  }

  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'))

  const setUser = (newUser: User) => {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  watch(user, () => localStorage.setItem('user', JSON.stringify(user.value)))

  return { user, setUser }
})
