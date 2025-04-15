<template>
  <div>
    <!-- Page Preloder -->
    <div v-if="preloaderVisible" id="preloder">
      <div class="loader"></div>
    </div>

    <!-- Header Section Begin -->
    <header class="header">
      <Header />
    </header>
    <!-- Header Section End -->

    <!-- Main Content -->
    <main>
      <slot></slot>
    </main>
    
    <!-- Footer Section Begin -->
    <Footer />
    <!-- Footer Section End -->

    <!-- Search Begin -->
    <div class="search-model">
      <div class="h-100 d-flex align-items-center justify-content-center">
        <div class="search-close-switch">+</div>
        <form class="search-model-form">
          <input type="text" id="search-input" placeholder="Tìm kiếm tại đây....." />
        </form>
      </div>
    </div>
    <!-- Search End -->
  </div>
</template>

<script>
import Header from '@/components/client/header/Header.vue'
import Footer from '@/components/client/footer/Footer.vue'

export default {
  name: 'ClientLayout',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      preloaderVisible: true
    }
  },
  mounted() {
    // Hide preloader after 1 second (or when your app is ready)
    setTimeout(() => {
      this.preloaderVisible = false
    }, 1000)
  }
}
</script>

<style scoped>
/* Có thể import style từ template gốc hoặc viết lại */
</style>
