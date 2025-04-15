<template>
  <ClientLayout>
    <!-- Hero Section Begin -->
    <section class="hero">
      <div class="hero__slider">
        <div class="hero__items active" :style="{ backgroundImage: `url(${heroImages[0]})` }">
          <div class="container">
            <div class="row">
              <div class="col-xl-5 col-lg-7 col-md-8">
                <div class="hero__text">
                  <h6>Bộ sưu tập</h6>
                  <h2>Bộ sưu tập Thu</h2>
                  <p>Beautiful.</p>
                  <a href="#" class="primary-btn">Mua ngay <span class=""></span></a>
                  <div class="hero__social">
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-pinterest"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Hero Section End -->

    <!-- Banner Section Begin -->
    <div style="text-align: center; margin: 30px 0; animation: fadeIn 2s infinite">
      <p
        style="
          font-size: 50px;
          font-weight: bold;
          color: #000;
          animation: fadeInUp 2s 0.5s forwards;
          opacity: 0;
        "
      >
        Sản phẩm nổi bật
      </p>
    </div>

    <!-- Banner Section End -->

    <!-- Product Section Begin -->
    <section class="product spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="filter__controls">
              <li class="active" data-filter="*">Bán chạy nhất</li>
              <li data-filter=".new-arrivals">Hàng mới về</li>
              <li data-filter=".hot-sales">Bán chạy</li>
            </ul>
          </div>
        </div>
        <div class="row product__filter">
          <div
            v-for="product in products"
            :key="product.id"
            class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix"
            :class="
              product.label === 'New' ? 'new-arrivals' : product.label === 'Hot' ? 'hot-sales' : ''
            "
          >
            <div class="product__item">
              <div
                class="product__item__pic set-bg"
                :style="{ backgroundImage: `url(${product.image})` }"
              >
                <span class="label" v-if="product.label">{{ product.label }}</span>
                <ul class="product__hover">
                  <li>
                    <a href="#"><img src="@/assets/img/icon/heart.png" alt="" /></a>
                  </li>
                  <li>
                    <a href="#"
                      ><img src="@/assets/img/icon/compare.png" alt="" /> <span>So sánh</span></a
                    >
                  </li>
                  <li>
                    <a href="#"><img src="@/assets/img/icon/search.png" alt="" /></a>
                  </li>
                </ul>
              </div>
              <div class="product__item__text">
                <h6>{{ product.name }}</h6>
                <button class="btn btn-outline-primary btn-sm me-2" @click="handleAddToCart(product)">+ Thêm vào giỏ hàng</button>
                <button class="btn btn-danger btn-sm" @click="handleBuyNow(product)">Mua ngay</button>
                <div class="rating">
                  <i
                    v-for="n in Math.floor(product.rating)"
                    :key="'star' + n"
                    class="fa fa-star"
                  ></i>
                  <i v-if="product.rating % 1 !== 0" class="fa fa-star-half-o"></i>
                </div>
                <h5 v-if="product.discountPrice">
                  {{ formatPrice(product.discountPrice) }}
                  <span class="text-decoration-line-through text-muted fs-6">{{
                    formatPrice(product.price)
                  }}</span>
                </h5>
                <h5 v-else>{{ formatPrice(product.price) }}</h5>
                <div class="product__color__select">
                  <label for="pc-1">
                    <input type="radio" id="pc-1" />
                  </label>
                  <label class="active black" for="pc-2">
                    <input type="radio" id="pc-2" />
                  </label>
                  <label class="grey" for="pc-3">
                    <input type="radio" id="pc-3" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Product Section End -->

    <!-- Categories Section Begin -->
    <section class="categories spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="categories__text">
              <h2>
                Quần áo Hot <br />
                <span>Bộ sưu tập giày</span> <br />
                Phụ kiện
              </h2>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="categories__hot__deal">
              <img src="@/assets/img/product-sale.png" alt="" />
              <div class="hot__deal__sticker">
                <span>Giảm giá</span>
                <h5>150.000đ</h5>
              </div>
            </div>
          </div>
          <div class="col-lg-4 offset-lg-1">
            <div class="categories__deal__countdown">
              <span>Ưu đãi trong tuần</span>
              <h2>Áo khoác bóng chày đa năng xanh đen</h2>
              <div class="categories__deal__countdown__timer" id="countdown">
                <div class="cd-item">
                  <span>3</span>
                  <p>Ngày</p>
                </div>
                <div class="cd-item">
                  <span>1</span>
                  <p>Giờ</p>
                </div>
                <div class="cd-item">
                  <span>50</span>
                  <p>Phút</p>
                </div>
                <div class="cd-item">
                  <span>18</span>
                  <p>Giây</p>
                </div>
              </div>
              <a href="#" class="primary-btn">Mua ngay</a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Categories Section End -->

    <!-- Instagram Section Begin -->
    <section class="instagram spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="instagram__pic">
              <div
                v-for="(img, idx) in instagramImages"
                :key="idx"
                class="instagram__pic__item"
                :style="{ backgroundImage: `url(${img})` }"
              ></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="instagram__text">
              <h2>Instagram</h2>
              <p>Thông qua những ảnh này, bạn sẽ thấy kết nối giữa phong cách và cái đẹp.</p>
              <h3>#Vinh's Choice</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Instagram Section End -->

    <!-- Latest Blog Section Begin -->
    <section class="latest spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="section-title">
              <span>Tin tức mới nhất</span>
              <h2>Xu hướng thời trang mới</h2>
            </div>
          </div>
        </div>
        <div class="row">
          <div v-for="blog in blogs.slice(0, 3)" :key="blog.id" class="col-lg-4 col-md-6 col-sm-6">
            <div class="blog__item">
              <div
                class="blog__item__pic set-bg"
                :style="{ backgroundImage: `url(${blog.image})` }"
              ></div>
              <div class="blog__item__text">
                <span
                  ><img src="@/assets/img/icon/calendar.png" alt="" />
                  {{ formatDate(blog.date) }}</span
                >
                <h5>{{ blog.title }}</h5>
                <p>{{ blog.excerpt }}</p>
                <router-link to="/blog">Đọc thêm</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Latest Blog Section End -->
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import products from '@/data/products.js'
import blogs from '@/data/blogs.js'

export default {
  name: 'HomeView',
  components: {
    ClientLayout,
    Carousel,
    Slide,
  },
  data() {
    return {
      heroImages: [
        new URL('@/assets/img/hero/hero-3.jpg', import.meta.url).href,
        new URL('@/assets/img/hero/hero-4.jpg', import.meta.url).href,
      ],
      products,
      blogs,
      instagramImages: [
        new URL('@/assets/img/instagram/instagram-1.jpg', import.meta.url).href,
        new URL('@/assets/img/instagram/instagram-2.jpg', import.meta.url).href,
        new URL('@/assets/img/instagram/instagram-3.jpg', import.meta.url).href,
        new URL('@/assets/img/instagram/instagram-4.jpg', import.meta.url).href,
        new URL('@/assets/img/instagram/instagram-5.jpg', import.meta.url).href,
        new URL('@/assets/img/instagram/instagram-6.jpg', import.meta.url).href,
      ],
    }
  },
  methods: {
    handleAddToCart(product) {
      let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const index = cart.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      this.syncOrders();
      alert('Đã thêm vào giỏ hàng và cập nhật hóa đơn!');
    },
    syncOrders() {
      let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      let orders = JSON.parse(localStorage.getItem('orders') || '[]');
      let pendingIndex = orders.findIndex(order => order.status === 'chờ thanh toán');
      if (pendingIndex === -1) {
        // Tạo mới hóa đơn chờ thanh toán
        const newOrder = {
          id: 'HD' + Date.now(),
          createdAt: new Date().toISOString(),
          status: 'chờ thanh toán',
          items: [...cart],
          total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        };
        orders.push(newOrder);
      } else {
        // Cập nhật hóa đơn chờ thanh toán với giỏ hàng mới nhất
        orders[pendingIndex].items = [...cart];
        orders[pendingIndex].total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      }
      localStorage.setItem('orders', JSON.stringify(orders));
      window.dispatchEvent(new Event('orders-updated'));
    },
    handleBuyNow(product) {
      let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const index = cart.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ product, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cart));
      window.dispatchEvent(new Event('cart-updated'));
      this.$router.push('/cart');
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('vi-VN', options)
    },
  },
  mounted() {
    // Giả lập các chức năng JS từ template gốc
    // Trong thực tế, bạn cần mặc định/convert các plugin jQuery thành Vue native hoặc sử dụng các plugin Vue tương ứng
    console.log('Home view mounted - implementing JS functionality')

    // Giả lập set background cho các phần tử có thuộc tính data-setbg
    document.querySelectorAll('[data-setbg]').forEach((element) => {
      element.style.backgroundImage = `url(${element.getAttribute('data-setbg')})`
    })
  },
}
</script>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Đảm bảo chữ hero luôn hiện */
.hero__items .hero__text h6,
.hero__items .hero__text h2,
.hero__items .hero__text p,
.hero__items .hero__text .primary-btn {
  opacity: 1 !important;
  top: 0 !important;
  animation: fadeInUp 0.6s ease-in-out;
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}
</style>
