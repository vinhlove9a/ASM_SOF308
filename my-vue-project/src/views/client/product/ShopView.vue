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
                            <li><a href="#" @click.prevent="filterByBrand('Vinh\'s Choice')">Vinh's Choice</a></li>
                            <li><a href="#" @click.prevent="filterByBrand('Louis Vuitton')">Louis Vuitton</a></li>
                            <li><a href="#" @click.prevent="filterByBrand('Diesel')">Diesel</a></li>
                            <li><a href="#" @click.prevent="filterByBrand('Polo')">Polo</a></li>
                            <li><a href="#" @click.prevent="filterByBrand('Tommy Hilfiger')">Tommy Hilfiger</a></li>
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
                            <li><a href="#" @click.prevent="filterByPriceRange(0, 200000)">0đ - 200.000đ</a></li>
                            <li><a href="#" @click.prevent="filterByPriceRange(200000, 300000)">200.000đ - 300.000đ</a></li>
                            <li><a href="#" @click.prevent="filterByPriceRange(300000, 400000)">300.000đ - 400.000đ</a></li>
                            <li><a href="#" @click.prevent="filterByPriceRange(400000, 500000)">400.000đ - 500.000đ</a></li>
                            <li><a href="#" @click.prevent="filterByPriceRange(500000, Infinity)">500.000đ+</a></li>
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
                    <p>Hiển thị {{ filteredProducts.length }} trong {{ allProducts.length }} kết quả</p>
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
              <div v-for="product in displayedProducts" :key="product.id" class="col-lg-4 col-md-6 col-sm-6">
                <div class="product__item">
                  <div class="product__item__pic set-bg" :style="{ backgroundImage: `url(${product.image})` }">
                    <span class="label" v-if="product.label">{{ product.label }}</span>
                    <ul class="product__hover">
                      <li><a href="#"><img src="@/assets/img/icon/heart.png" alt=""></a></li>
                      <li><a href="#"><img src="@/assets/img/icon/compare.png" alt=""> <span>So sánh</span></a></li>
                      <li><a href="#"><img src="@/assets/img/icon/search.png" alt=""></a></li>
                    </ul>
                  </div>
                  <div class="product__item__text">
                    <h6>{{ product.name }}</h6>
                    <a href="#" class="add-cart" @click.prevent="addToCart(product)">+ Thêm vào giỏ hàng</a>
                    <div class="rating">
                      <i v-for="n in Math.floor(product.rating)" :key="'star'+n" class="fa fa-star"></i>
                      <i v-if="product.rating % 1 !== 0" class="fa fa-star-half-o"></i>
                    </div>
                    <h5 v-if="product.discountPrice">
                      {{ formatPrice(product.discountPrice) }}
                      <span class="text-decoration-line-through text-muted fs-6">{{ formatPrice(product.price) }}</span>
                    </h5>
                    <h5 v-else>{{ formatPrice(product.price) }}</h5>
                    <div class="product__color__select">
                      <label for="pc-4">
                        <input type="radio" id="pc-4">
                      </label>
                      <label class="active black" for="pc-5">
                        <input type="radio" id="pc-5">
                      </label>
                      <label class="grey" for="pc-6">
                        <input type="radio" id="pc-6">
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
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import allProducts from '@/data/products.js'
import categories from '@/data/categories.js'

export default {
  name: 'ShopView',
  components: {
    ClientLayout
  },
  data() {
    return {
      allProducts,
      categories,
      searchTerm: '',
      sortOption: 'default',
      currentPage: 1,
      itemsPerPage: 6,
      filteredProducts: [], // Sản phẩm sau khi lọc
      selectedCategory: '',
      selectedBrand: '',
      priceRange: { min: 0, max: Infinity }
    }
  },
  computed: {
    // Tổng số trang dựa trên số lượng sản phẩm và số sản phẩm mỗi trang
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    },
    // Sản phẩm hiển thị trên trang hiện tại
    displayedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
    // Lọc sản phẩm theo danh mục
    filterByCategory(category) {
      this.selectedCategory = category;
      this.applyFilters();
    },
    // Lọc sản phẩm theo thương hiệu
    filterByBrand(brand) {
      this.selectedBrand = brand;
      this.applyFilters();
    },
    // Lọc sản phẩm theo khoảng giá
    filterByPriceRange(min, max) {
      this.priceRange = { min, max };
      this.applyFilters();
    },
    // Tìm kiếm sản phẩm
    searchProducts() {
      this.applyFilters();
    },
    // Áp dụng tất cả các bộ lọc
    applyFilters() {
      let result = [...this.allProducts];
      
      // Lọc theo tên sản phẩm (tìm kiếm)
      if (this.searchTerm) {
        result = result.filter(product => 
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      
      // Lọc theo danh mục
      if (this.selectedCategory) {
        result = result.filter(product => product.category === this.selectedCategory);
      }
      
      // Lọc theo thương hiệu
      if (this.selectedBrand) {
        result = result.filter(product => product.brand === this.selectedBrand);
      }
      
      // Lọc theo khoảng giá
      result = result.filter(product => {
        const price = product.discountPrice || product.price;
        return price >= this.priceRange.min && price <= this.priceRange.max;
      });
      
      this.filteredProducts = result;
      this.currentPage = 1; // Reset về trang đầu tiên sau khi lọc
      this.sortProducts(); // Áp dụng sắp xếp
    },
    // Sắp xếp sản phẩm
    sortProducts() {
      switch (this.sortOption) {
        case 'price-asc':
          this.filteredProducts.sort((a, b) => {
            const priceA = a.discountPrice || a.price;
            const priceB = b.discountPrice || b.price;
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          this.filteredProducts.sort((a, b) => {
            const priceA = a.discountPrice || a.price;
            const priceB = b.discountPrice || b.price;
            return priceB - priceA;
          });
          break;
        case 'rating':
          this.filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          // Mặc định sắp xếp theo ID
          this.filteredProducts.sort((a, b) => a.id - b.id);
          break;
      }
    },
    // Thay đổi trang
    changePage(page) {
      this.currentPage = page;
    },
    // Thêm sản phẩm vào giỏ hàng
    addToCart(product) {
      console.log('Đã thêm sản phẩm vào giỏ hàng:', product);
      // Trong thực tế, bạn sẽ thêm sản phẩm vào Vuex store hoặc localStorage
      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    }
  },
  created() {
    // Khởi tạo filteredProducts ban đầu bằng tất cả sản phẩm
    this.filteredProducts = [...this.allProducts];
  },
  mounted() {
    // Giả lập các chức năng JS từ template gốc
    console.log('Shop view mounted - implementing JS functionality')
    
    // Giả lập set background cho các phần tử có thuộc tính data-setbg
    document.querySelectorAll('[data-setbg]').forEach(element => {
      element.style.backgroundImage = `url(${element.getAttribute('data-setbg')})`;
    });
  }
}
</script>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
</style>
