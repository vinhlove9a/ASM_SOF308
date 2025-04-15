import { createRouter, createWebHistory } from 'vue-router'

// Import views
import HomeView from '@/views/client/home/HomeView.vue'
import ShopView from '@/views/client/product/ShopView.vue'
import CartView from '@/views/client/cart/CartView.vue'
import CheckoutView from '@/views/client/checkout/CheckoutView.vue'
import BlogView from '@/views/client/news/BlogView.vue'
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue'
import ForgotPasswordView from '@/views/auth/ForgotPasswordView.vue'
import OrdersView from '@/views/client/profile/OrdersView.vue'

// Optionally stub routes for about, auth, contact, profile
// import AboutView from '@/views/client/about/AboutView.vue';
// import AuthView from '@/views/client/auth/AuthView.vue';
import ContactView from '@/views/client/contact/ContactView.vue'
// import ProfileView from '@/views/client/profile/ProfileView.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/shop', name: 'Shop', component: ShopView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/checkout', name: 'Checkout', component: CheckoutView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
  { path: '/orders', name: 'Orders', component: OrdersView },
  // { path: '/about', name: 'About', component: AboutView },
  // { path: '/auth', name: 'Auth', component: AuthView },
  { path: '/contact', name: 'Contact', component: ContactView },
  // { path: '/profile', name: 'Profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
