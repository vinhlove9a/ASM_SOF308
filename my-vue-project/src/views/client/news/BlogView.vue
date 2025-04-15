<template>
  <ClientLayout>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Blog</h4>
              <div class="breadcrumb__links">
                <router-link to="/">Trang chủ</router-link>
                <span>Blog</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Blog Section Begin -->
    <section class="blog spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-12 mb-4">
            <div class="blog__sidebar" style="padding-right: 16px">
              <div class="blog__sidebar__search">
                <form @submit.prevent="searchBlogs" class="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    v-model="searchTerm"
                    class="search-input"
                  />
                  <button type="submit" class="search-btn" aria-label="Tìm kiếm">
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </button>
                </form>
              </div>
              <div class="blog__sidebar__item">
                <h4>Danh mục</h4>
                <div class="blog__sidebar__categories">
                  <a
                    v-for="cat in ['Tất cả', 'Thời trang', 'Phong cách', 'Xu hướng']"
                    :key="cat"
                    href="#"
                    :class="['category-filter', { active: selectedCategory === cat }]"
                    @click.prevent="filterCategory(cat)"
                  >
                    {{ cat }}
                  </a>
                </div>
              </div>
              <div class="blog__sidebar__item">
                <h4>Bài viết gần đây</h4>
                <div
                  class="blog__sidebar__recent"
                  v-for="blog in recentBlogs"
                  :key="'recent-' + blog.id"
                >
                  <a
                    href="#"
                    @click.prevent="showBlogDetail(blog.id)"
                    class="blog__sidebar__recent__item"
                  >
                    <div class="blog__sidebar__recent__item__pic">
                      <img
                        :src="blog.image"
                        alt=""
                        style="width: 70px; height: 70px; object-fit: cover"
                      />
                    </div>
                    <div class="blog__sidebar__recent__item__text">
                      <h6>{{ blog.title }}</h6>
                      <span>{{ formatDate(blog.date) }}</span>
                    </div>
                  </a>
                </div>
              </div>
              <div class="blog__sidebar__item">
                <h4>Tags</h4>
                <div class="blog__sidebar__tags">
                  <a
                    v-for="tag in [
                      'Thời trang',
                      'Phong cách',
                      'Diversity',
                      'Quần áo',
                      'Đa dạng',
                      'Nam',
                      'Nữ',
                    ]"
                    :key="tag"
                    href="#"
                    :class="['tag-filter', { active: selectedTag === tag }]"
                    @click.prevent="filterTag(tag)"
                  >
                    {{ tag }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-9 col-md-12">
            <div class="row gx-4 gy-4">
              <div v-for="blog in displayedBlogs" :key="blog.id" class="col-lg-6 col-md-6 mb-4">
                <div class="blog__item h-100 d-flex flex-column">
                  <div class="blog__item__pic mb-3">
                    <img
                      :src="blog.image"
                      alt=""
                      style="width: 100%; height: 220px; object-fit: cover; border-radius: 8px"
                    />
                  </div>
                  <div class="blog__item__text flex-grow-1 d-flex flex-column">
                    <span
                      class="mb-2 d-flex align-items-center"
                      style="font-size: 14px; color: #888"
                      ><img
                        src="@/assets/img/icon/calendar.png"
                        alt=""
                        class="me-2"
                        style="width: 16px"
                      />
                      {{ formatDate(blog.date) }}</span
                    >
                    <h5 class="mb-2" style="font-size: 1.1rem; font-weight: 700; line-height: 1.3">
                      {{ blog.title }}
                    </h5>
                    <p class="mb-3" style="flex-grow: 1">{{ blog.excerpt }}</p>
                    <a
                      href="#"
                      @click.prevent="showBlogDetail(blog.id)"
                      class="mt-auto"
                      style="font-weight: 600; letter-spacing: 1px; text-transform: uppercase"
                      >ĐỌC THÊM</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div v-if="displayedBlogs.length === 0" class="text-center py-5">
              <h5>Không tìm thấy bài viết nào</h5>
            </div>
            <div class="row" v-if="filteredBlogs.length > itemsPerPage">
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
    <!-- Blog Section End -->

    <!-- Blog Detail Modal (Thay vì tạo trang riêng, hiển thị modal cho đơn giản) -->
    <div
      v-if="selectedBlog"
      class="modal fade show"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedBlog.title }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <img
              :src="selectedBlog.image"
              alt=""
              class="img-fluid mb-4"
              style="width: 100%; height: 300px; object-fit: cover"
            />
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/img/icon/calendar.png" alt="" class="me-2" />
              <span class="me-3">{{ formatDate(selectedBlog.date) }}</span>
              <span>Tác giả: {{ selectedBlog.author }}</span>
            </div>
            <p>{{ selectedBlog.content }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import blogs from '@/data/blogs.js'

export default {
  name: 'BlogView',
  components: {
    ClientLayout,
  },
  data() {
    return {
      blogs,
      searchTerm: '',
      selectedCategory: 'Tất cả',
      selectedTag: '',
      currentPage: 1,
      itemsPerPage: 4,
      selectedBlog: null, // Blog được chọn để xem chi tiết
    }
  },
  computed: {
    // Lọc blog dựa trên tìm kiếm, danh mục và tag
    filteredBlogs() {
      let result = [...this.blogs]

      // Lọc theo tìm kiếm
      if (this.searchTerm) {
        result = result.filter(
          (blog) =>
            blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            blog.content.toLowerCase().includes(this.searchTerm.toLowerCase()),
        )
      }

      // Lọc theo danh mục (giả lập vì không có trường category)
      if (this.selectedCategory !== 'Tất cả') {
        // Giả lập: chia blog vào các danh mục dựa trên ID
        if (this.selectedCategory === 'Thời trang') {
          result = result.filter((blog) => blog.id % 3 === 0)
        } else if (this.selectedCategory === 'Phong cách') {
          result = result.filter((blog) => blog.id % 3 === 1)
        } else if (this.selectedCategory === 'Xu hướng') {
          result = result.filter((blog) => blog.id % 3 === 2)
        }
      }

      // Lọc theo tag (giả lập vì không có trường tags)
      if (this.selectedTag) {
        // Giả lập: chia blog vào các tag dựa trên ID
        if (this.selectedTag === 'Thời trang' || this.selectedTag === 'Diversity') {
          result = result.filter((blog) => blog.id % 2 === 0)
        } else if (this.selectedTag === 'Phong cách' || this.selectedTag === 'Quần áo') {
          result = result.filter((blog) => blog.id % 2 === 1)
        } else if (this.selectedTag === 'Đa dạng') {
          result = result.filter((blog) => blog.id % 3 === 0)
        } else if (this.selectedTag === 'Nam') {
          result = result.filter((blog) => blog.id % 3 === 1)
        } else if (this.selectedTag === 'Nữ') {
          result = result.filter((blog) => blog.id % 3 === 2)
        }
      }

      return result
    },
    // Các blog hiển thị trên trang hiện tại
    displayedBlogs() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredBlogs.slice(start, end)
    },
    // Tổng số trang
    totalPages() {
      return Math.ceil(this.filteredBlogs.length / this.itemsPerPage)
    },
    // 3 blog gần đây nhất
    recentBlogs() {
      return [...this.blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('vi-VN', options)
    },
    // Tìm kiếm blog
    searchBlogs() {
      this.currentPage = 1 // Reset về trang 1 khi tìm kiếm
    },
    // Lọc theo danh mục
    filterCategory(category) {
      this.selectedCategory = category
      this.currentPage = 1
    },
    // Lọc theo tag
    filterTag(tag) {
      this.selectedTag = tag
      this.currentPage = 1
    },
    // Chuyển trang
    changePage(page) {
      this.currentPage = page
    },
    // Hiển thị chi tiết blog
    showBlogDetail(blogId) {
      this.selectedBlog = this.blogs.find((blog) => blog.id === blogId)
    },
    // Đóng modal chi tiết blog
    closeModal() {
      this.selectedBlog = null
    },
  },
  mounted() {
    // Set background cho các phần tử có thuộc tính data-setbg
    document.querySelectorAll('[data-setbg]').forEach((element) => {
      element.style.backgroundImage = `url(${element.getAttribute('data-setbg')})`
    })
  },
}
</script>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
.blog__item__pic {
  height: 260px;
  overflow: hidden;
}
.blog__item__pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.active {
  background-color: #111111;
  color: #ffffff;
}
.blog__sidebar__search {
  margin-bottom: 22px;
}
.search-input {
  flex: 1 1 auto;
  border-radius: 18px;
  border: 1px solid #e0e0e0;
  padding: 7px 14px;
  font-size: 1rem;
  outline: none;
  background: #f9f9f9;
  transition: border 0.2s;
}
.search-input:focus {
  border: 1.5px solid #ff6f61;
  background: #fff;
}
.search-btn {
  border: none;
  background: #ff6f61;
  color: #fff;
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.search-btn:hover {
  background: #222;
}
.blog__sidebar__categories {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.category-filter {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.97rem;
  color: #333;
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  margin-bottom: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}
.category-filter:hover {
  background: #ff6f61;
  color: #fff;
  border-color: #ff6f61;
}
.category-filter.active {
  background: #222;
  color: #fff;
  border-color: #222;
}
.blog__sidebar__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag-filter {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 0.97rem;
  color: #333;
  background: #f2f2f2;
  border: 1px solid #e0e0e0;
  margin-bottom: 4px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}
.tag-filter:hover {
  background: #ff6f61;
  color: #fff;
  border-color: #ff6f61;
}
.tag-filter.active {
  background: #222;
  color: #fff;
  border-color: #222;
}
@media (max-width: 991px) {
  .blog__sidebar {
    margin-bottom: 32px;
  }
}
</style>
