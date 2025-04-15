<template>
  <ClientLayout>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Cửa hàng</h4>
              <div class="breadcrumb__links">
                <router-link to="/">Trang chủ</router-link>
                <span>Cửa hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->
    <!-- Shop Section Begin -->
    <section class="shop spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="shop__sidebar">
              <div class="shop__sidebar__search">
                <form @submit.prevent="searchProducts">
                  <input type="text" placeholder="Tìm kiếm..." v-model="searchTerm" />
                  <button type="submit">
                    <span class="icon_search"></span>
                  </button>
                </form>
              </div>
              <div class="shop__sidebar__accordion">
                <div class="accordion" id="accordionExample">
                  <div class="card">
                    <div class="card-heading">
                      <a data-toggle="collapse" data-target="#collapseOne">Danh mục</a>
                    </div>
                    <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                      <div class="card-body">
                        <div class="shop__sidebar__categories">
                          <ul class="nice-scroll">
                            <li v-for="category in categories" :key="category.id">
                              <a href="#" @click.prevent="filterByCategory(category.name)">
                                {{ category.name }} ({{ category.count }})
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-heading">
                      <a data-toggle="collapse" data-target="#collapseTwo">Thương hiệu</a>
                    </div>
                    <div id="collapseTwo" class="collapse show" data-parent="#accordionExample">
                      <div class="card-body">
                        <div class="shop__sidebar__brand">
                          <ul>
                            <li>
                              <a href="#" @click.prevent="filterByBrand('Vinh\'s Choice')"
                                >Vinh's Choice</a
                              >
                            </li>
                            <li>
                              <a href="#" @click.prevent="filterByBrand('Louis Vuitton')"
                                >Louis Vuitton</a
                              >
                            </li>
                            <li><a href="#" @click.prevent="filterByBrand('Diesel')">Diesel</a></li>
                            <li><a href="#" @click.prevent="filterByBrand('Polo')">Polo</a></li>
                            <li>
                              <a href="#" @click.prevent="filterByBrand('Tommy Hilfiger')"
                                >Tommy Hilfiger</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-heading">
                      <a data-toggle="collapse" data-target="#collapseThree">Giá</a>
                    </div>
                    <div id="collapseThree" class="collapse show" data-parent="#accordionExample">
                      <div class="card-body">
                        <div class="shop__sidebar__price">
                          <ul>
                            <li>
                              <a href="#" @click.prevent="filterByPriceRange(0, 200000)"
                                >0đ - 200.000đ</a
                              >
                            </li>
                            <li>
                              <a href="#" @click.prevent="filterByPriceRange(200000, 300000)"
                                >200.000đ - 300.000đ</a
                              >
                            </li>
                            <li>
                              <a href="#" @click.prevent="filterByPriceRange(300000, 400000)"
                                >300.000đ - 400.000đ</a
                              >
                            </li>
                            <li>
                              <a href="#" @click.prevent="filterByPriceRange(400000, 500000)"
                                >400.000đ - 500.000đ</a
                              >
                            </li>
                            <li>
                              <a href="#" @click.prevent="filterByPriceRange(500000, Infinity)"
                                >500.000đ+</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="shop__product__option">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="shop__product__option__left">
                    <p>
                      Hiển thị {{ filteredProducts.length }} trong {{ allProducts.length }} kết quả
                    </p>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                  <div class="shop__product__option__right">
                    <p>Sắp xếp theo:</p>
                    <select v-model="sortOption" @change="sortProducts">
                      <option value="default">Mặc định</option>
                      <option value="price-asc">Giá: Thấp đến Cao</option>
                      <option value="price-desc">Giá: Cao đến Thấp</option>
                      <option value="rating">Đánh giá</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                v-for="product in displayedProducts"
                :key="product.id"
                class="col-lg-4 col-md-6 col-sm-6"
              >
                <div class="product__item">
                  <div
                    class="product__item__pic set-bg"
                    :style="{ backgroundImage: `url(${product.image})` }"
                    style="cursor: pointer"
                    @click="showDetail(product)"
                  >
                    <span class="label" v-if="product.label">{{ product.label }}</span>
                    <ul class="product__hover">
                      <li>
                        <a href="#"><img src="@/assets/img/icon/heart.png" alt="" /></a>
                      </li>
                      <li>
                        <a href="#"
                          ><img src="@/assets/img/icon/compare.png" alt="" />
                          <span>So sánh</span></a
                        >
                      </li>
                      <li>
                        <a href="#" @click.prevent="showDetail(product)"
                          ><img src="@/assets/img/icon/search.png" alt=""
                        /></a>
                      </li>
                    </ul>
                  </div>
                  <div class="product__item__text">
                    <h6 style="cursor: pointer" @click="showDetail(product)">{{ product.name }}</h6>
                    <a href="#" class="add-cart" @click.prevent="addToCart(product)"
                      >+ Thêm vào giỏ hàng</a
                    >
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
                      <label for="pc-4">
                        <input type="radio" id="pc-4" />
                      </label>
                      <label class="active black" for="pc-5">
                        <input type="radio" id="pc-5" />
                      </label>
                      <label class="grey" for="pc-6">
                        <input type="radio" id="pc-6" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="product__pagination">
                  <a
                    v-for="page in totalPages"
                    :key="page"
                    href="#"
                    @click.prevent="changePage(page)"
                    :class="{ active: currentPage === page }"
                  >
                    {{ page }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shop Section End -->

    <!-- Modal Chi tiết sản phẩm (đặt ngoài section, root-level) -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: showDetailModal }"
      style="display: block"
      v-if="showDetailModal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết sản phẩm</h5>
            <button type="button" class="btn-close" @click="closeDetail"></button>
          </div>
          <div class="modal-body d-flex flex-wrap">
            <img
              :src="detailProduct?.image"
              alt="Ảnh sản phẩm"
              style="width: 220px; height: 220px; object-fit: cover; border-radius: 10px"
              class="me-4 mb-3"
            />
            <div style="min-width: 220px; flex: 1 1 0">
              <h4>{{ detailProduct?.name }}</h4>
              <div class="mb-2">
                <span class="badge bg-success me-2" v-if="detailProduct?.label">{{
                  detailProduct.label
                }}</span>
                <span class="text-warning">
                  <i
                    class="fa fa-star"
                    v-for="n in Math.floor(detailProduct?.rating || 0)"
                    :key="n"
                  ></i>
                  <span class="text-secondary ms-1"
                    >({{ detailProduct?.reviewCount }} đánh giá)</span
                  >
                </span>
              </div>
              <div class="mb-2">
                <b>Giá:</b>
                <span class="text-danger fs-5">{{
                  formatPrice(detailProduct?.discountPrice || detailProduct?.price)
                }}</span>
                <span
                  v-if="detailProduct?.discountPrice"
                  class="text-decoration-line-through ms-2 text-muted"
                  >{{ formatPrice(detailProduct?.price) }}</span
                >
              </div>
              <div class="mb-2"><b>Thể loại:</b> {{ detailProduct?.category }}</div>
              <div class="mb-2"><b>Thương hiệu:</b> {{ detailProduct?.brand }}</div>
              <div class="mb-2"><b>Mô tả:</b> {{ detailProduct?.description }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetail">Đóng</button>
            <button class="btn btn-success me-2" @click="addToCart(detailProduct, false)">
              Thêm vào giỏ hàng
            </button>
            <button class="btn btn-danger" @click="buyNow(detailProduct)">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetailModal" class="modal-backdrop fade show"></div>
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import allProducts from '@/data/products.js'
import categories from '@/data/categories.js'

export default {
  name: 'ShopView',
  components: {
    ClientLayout,
  },
  data() {
    return {
      showDetailModal: false,
      detailProduct: null,
      allProducts,
      categories,
      searchTerm: '',
      sortOption: 'default',
      currentPage: 1,
      itemsPerPage: 6,
      filteredProducts: [], // Sản phẩm sau khi lọc
      selectedCategory: '',
      selectedBrand: '',
      priceRange: { min: 0, max: Infinity },
    }
  },
  computed: {
    // Tổng số trang dựa trên số lượng sản phẩm và số sản phẩm mỗi trang
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    },
    // Sản phẩm hiển thị trên trang hiện tại
    displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },
  },
  methods: {
    // Hiển thị modal chi tiết sản phẩm
    showDetail(product) {
      this.detailProduct = { ...product }
      this.showDetailModal = true
    },
    // Đóng modal chi tiết sản phẩm
    closeDetail() {
      this.showDetailModal = false
      this.detailProduct = null
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    // Lọc sản phẩm theo danh mục
    filterByCategory(category) {
      this.selectedCategory = category
      this.applyFilters()
    },
    // Lọc sản phẩm theo thương hiệu
    filterByBrand(brand) {
      this.selectedBrand = brand
      this.applyFilters()
    },
    // Lọc sản phẩm theo khoảng giá
    filterByPriceRange(min, max) {
      this.priceRange = { min, max }
      this.applyFilters()
    },
    // Tìm kiếm sản phẩm
    searchProducts() {
      this.applyFilters()
    },
    // Áp dụng tất cả các bộ lọc
    applyFilters() {
      let result = [...this.allProducts]

      // Lọc theo tên sản phẩm (tìm kiếm)
      if (this.searchTerm) {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchTerm.toLowerCase()),
        )
      }

      // Lọc theo danh mục
      if (this.selectedCategory) {
        result = result.filter((product) => product.category === this.selectedCategory)
      }

      // Lọc theo thương hiệu
      if (this.selectedBrand) {
        result = result.filter((product) => product.brand === this.selectedBrand)
      }

      // Lọc theo khoảng giá
      result = result.filter((product) => {
        const price = product.discountPrice || product.price
        return price >= this.priceRange.min && price <= this.priceRange.max
      })

      this.filteredProducts = result
      this.currentPage = 1 // Reset về trang đầu tiên sau khi lọc
      this.sortProducts() // Áp dụng sắp xếp
    },
    // Sắp xếp sản phẩm
    sortProducts() {
      switch (this.sortOption) {
        case 'price-asc':
          this.filteredProducts.sort((a, b) => {
            const priceA = a.discountPrice || a.price
            const priceB = b.discountPrice || b.price
            return priceA - priceB
          })
          break
        case 'price-desc':
          this.filteredProducts.sort((a, b) => {
            const priceA = a.discountPrice || a.price
            const priceB = b.discountPrice || b.price
            return priceB - priceA
          })
          break
        case 'rating':
          this.filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        default:
          // Mặc định sắp xếp theo ID
          this.filteredProducts.sort((a, b) => a.id - b.id)
          break
      }
    },
    // Thay đổi trang
    changePage(page) {
      this.currentPage = page
    },
    // Thêm sản phẩm vào giỏ hàng
    addToCart(product, showAlert = true) {
      let cart = JSON.parse(localStorage.getItem('cartItems') || '[]')
      const idx = cart.findIndex((item) => item.product.id === product.id)
      if (idx > -1) {
        cart[idx].quantity += 1
      } else {
        cart.push({ product, quantity: 1 })
      }
      localStorage.setItem('cartItems', JSON.stringify(cart))
      window.dispatchEvent(new Event('cart-updated'))
      // --- Đồng bộ hóa đơn chờ thanh toán ---
      let orders = JSON.parse(localStorage.getItem('orders') || '[]')
      let pendingIndex = orders.findIndex(order => order.status === 'chờ thanh toán')
      if (pendingIndex === -1) {
        // Tạo mới hóa đơn chờ thanh toán
        const newOrder = {
          id: 'HD' + Date.now(),
          createdAt: new Date().toISOString(),
          status: 'chờ thanh toán',
          items: [...cart],
          total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        }
        orders.push(newOrder)
      } else {
        // Cập nhật hóa đơn chờ thanh toán với giỏ hàng mới nhất
        orders[pendingIndex].items = [...cart]
        orders[pendingIndex].total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      }
      localStorage.setItem('orders', JSON.stringify(orders))
      window.dispatchEvent(new Event('orders-updated'))
      this.$emit('cart-updated')
      if (showAlert) alert(`Đã thêm ${product.name} vào giỏ hàng và cập nhật hóa đơn!`)
    },
    // Mua ngay: thêm vào giỏ rồi chuyển hướng checkout
    buyNow(product) {
      this.addToCart(product, false)
      this.closeDetail()
      this.$router.push('/checkout')
    },
  },
  created() {
    // Khởi tạo filteredProducts ban đầu bằng tất cả sản phẩm
    this.filteredProducts = [...this.allProducts]
  },
  mounted() {
    // Giả lập các chức năng JS từ template gốc
    console.log('Shop view mounted - implementing JS functionality')

    // Giả lập set background cho các phần tử có thuộc tính data-setbg
    document.querySelectorAll('[data-setbg]').forEach((element) => {
      element.style.backgroundImage = `url(${element.getAttribute('data-setbg')})`
    })
  },
}
</script>

<!-- Modal Chi tiết sản phẩm (nằm trong template chính) -->

<style scoped>
/* Import style từ template gốc hoặc viết lại */
</style>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
</style>
