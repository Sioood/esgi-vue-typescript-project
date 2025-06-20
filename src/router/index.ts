import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Panier from '../views/PanierView.vue'
import Commande from '../views/CommandeView.vue'
import Commandes from '../views/CommandesView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'
import { useUserStore } from '@/stores/user'
import { extractStore } from '@/composables/store'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/panier',
      name: 'panier',
      component: Panier,
    },
    {
      path: '/commande',
      name: 'commande',
      component: Commande,
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: ConfirmationView,
    },
    {
      path: '/commandes',
      name: 'commandes',
      component: Commandes,
    },
  ],
})

router.beforeEach((to) => {
  const { user } = extractStore(useUserStore())
  if (to.name !== 'login' && !user.value) return { name: 'login' }
  if (to.name === 'login' && user.value) return { name: 'home' }
})

export default router
