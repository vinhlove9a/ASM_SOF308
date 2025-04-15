<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-3">
        <div class="header__logo">
          <router-link
            to="/"
            style="
              font-family: 'Nunito Sans', sans-serif;
              font-size: 24px;
              font-weight: 900;
              color: #333;
              text-decoration: none;
              animation: blink 1s infinite;
            "
          >
            <span style="color: #ff6f61">Vinh's</span> Choice
          </router-link>
        </div>

      </div>
      <div class="col-lg-6 col-md-6">
        <nav class="header__menu mobile-menu">
          <ul>
            <li :class="{ active: currentRoute === '/' }">
              <router-link to="/">Trang chủ</router-link>
            </li>
            <li :class="{ active: currentRoute === '/shop' }">
              <router-link to="/shop">Cửa hàng</router-link>
            </li>
            <li :class="{ active: currentRoute === '/blog' }">
              <router-link to="/blog">Blog</router-link>
            </li>
            <li :class="{ active: currentRoute === '/contact' }">
              <router-link to="/contact">Liên hệ</router-link>
            </li>
            <li :class="{ active: currentRoute.includes('/cart') || currentRoute.includes('/checkout') }">
              <a href="#">Giỏ hàng</a>
              <ul class="dropdown">
                <li><router-link to="/cart">Chi tiết</router-link></li>
                <li><router-link to="/checkout">Thanh toán</router-link></li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-lg-3 col-md-3">
        <div class="header__nav__option">
          <a href="#" class="search-switch">
            <img src="@/assets/img/icon/search.png" alt="" />
          </a>
          <a href="#"><img src="@/assets/img/icon/heart.png" alt="" /></a>
          <router-link to="/cart">
            <img src="@/assets/img/icon/cart.png" alt="" />
            <span>{{ cartItems.length }}</span>
          </router-link>
          <router-link to="/login" class="btn btn-primary btn-sm">Đăng nhập</router-link>
        </div>
      </div>
    </div>
    <div class="canvas__open"><i class="fa fa-bars"></i></div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      cartItems: []
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
/* Import from the original styles */
</style>
