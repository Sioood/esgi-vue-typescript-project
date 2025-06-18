import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Panier from '../views/PanierView.vue'
import Commande from '../views/CommandeView.vue'
import Commandes from '../views/CommandesView.vue'
import ConfirmationView from '../views/ConfirmationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    }
  ],
})

router.beforeEach((to) => {

})

export default router
