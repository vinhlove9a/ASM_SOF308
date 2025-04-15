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
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="blog__sidebar">
              <div class="blog__sidebar__search">
                <form @submit.prevent="searchBlogs">
                  <input type="text" placeholder="Tìm kiếm..." v-model="searchTerm">
                  <button type="submit"><span class="icon_search"></span></button>
                </form>
              </div>
              <div class="blog__sidebar__item">
                <h4>Danh mục</h4>
                <ul>
                  <li><a href="#" @click.prevent="filterCategory('Tất cả')">Tất cả</a></li>
                  <li><a href="#" @click.prevent="filterCategory('Thời trang')">Thời trang</a></li>
                  <li><a href="#" @click.prevent="filterCategory('Phong cách')">Phong cách</a></li>
                  <li><a href="#" @click.prevent="filterCategory('Xu hướng')">Xu hướng</a></li>
                </ul>
              </div>
              <div class="blog__sidebar__item">
                <h4>Bài viết gần đây</h4>
                <div class="blog__sidebar__recent" v-for="blog in recentBlogs" :key="'recent-'+blog.id">
                  <a href="#" @click.prevent="showBlogDetail(blog.id)" class="blog__sidebar__recent__item">
                    <div class="blog__sidebar__recent__item__pic">
                      <img :src="blog.image" alt="" style="width: 70px; height: 70px; object-fit: cover;">
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
                  <a href="#" @click.prevent="filterTag('Thời trang')">Thời trang</a>
                  <a href="#" @click.prevent="filterTag('Phong cách')">Phong cách</a>
                  <a href="#" @click.prevent="filterTag('Diversity')">Diversity</a>
                  <a href="#" @click.prevent="filterTag('Quần áo')">Quần áo</a>
                  <a href="#" @click.prevent="filterTag('Đa dạng')">Đa dạng</a>
                  <a href="#" @click.prevent="filterTag('Nam')">Nam</a>
                  <a href="#" @click.prevent="filterTag('Nữ')">Nữ</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 col-md-6 col-sm-6">
            <div class="row">
              <div v-for="blog in displayedBlogs" :key="blog.id" class="col-lg-6 col-md-6 col-sm-6">
                <div class="blog__item">
                  <div class="blog__item__pic">
  <img :src="blog.image" alt="" style="width:100%;height:260px;object-fit:cover;">
</div>
                  <div class="blog__item__text">
                    <span><img src="@/assets/img/icon/calendar.png" alt=""> {{ formatDate(blog.date) }}</span>
                    <h5>{{ blog.title }}</h5>
                    <p>{{ blog.excerpt }}</p>
                    <a href="#" @click.prevent="showBlogDetail(blog.id)">ĐỌC THÊM</a>
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
    <div v-if="selectedBlog" class="modal fade show" style="display: block; background-color: rgba(0,0,0,0.5);" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedBlog.title }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <img :src="selectedBlog.image" alt="" class="img-fluid mb-4" style="width: 100%; height: 300px; object-fit: cover;">
            <div class="d-flex align-items-center mb-3">
              <img src="@/assets/img/icon/calendar.png" alt="" class="me-2">
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
    ClientLayout
  },
  data() {
    return {
      blogs,
      searchTerm: '',
      selectedCategory: 'Tất cả',
      selectedTag: '',
      currentPage: 1,
      itemsPerPage: 4,
      selectedBlog: null // Blog được chọn để xem chi tiết
    }
  },
  computed: {
    // Lọc blog dựa trên tìm kiếm, danh mục và tag
    filteredBlogs() {
      let result = [...this.blogs];
      
      // Lọc theo tìm kiếm
      if (this.searchTerm) {
        result = result.filter(blog => 
          blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          blog.excerpt.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
      
      // Lọc theo danh mục (giả lập vì không có trường category)
      if (this.selectedCategory !== 'Tất cả') {
        // Giả lập: chia blog vào các danh mục dựa trên ID
        if (this.selectedCategory === 'Thời trang') {
          result = result.filter(blog => blog.id % 3 === 0);
        } else if (this.selectedCategory === 'Phong cách') {
          result = result.filter(blog => blog.id % 3 === 1);
        } else if (this.selectedCategory === 'Xu hướng') {
          result = result.filter(blog => blog.id % 3 === 2);
        }
      }
      
      // Lọc theo tag (giả lập vì không có trường tags)
      if (this.selectedTag) {
        // Giả lập: chia blog vào các tag dựa trên ID
        if (this.selectedTag === 'Thời trang' || this.selectedTag === 'Diversity') {
          result = result.filter(blog => blog.id % 2 === 0);
        } else if (this.selectedTag === 'Phong cách' || this.selectedTag === 'Quần áo') {
          result = result.filter(blog => blog.id % 2 === 1);
        } else if (this.selectedTag === 'Đa dạng') {
          result = result.filter(blog => blog.id % 3 === 0);
        } else if (this.selectedTag === 'Nam') {
          result = result.filter(blog => blog.id % 3 === 1);
        } else if (this.selectedTag === 'Nữ') {
          result = result.filter(blog => blog.id % 3 === 2);
        }
      }
      
      return result;
    },
    // Các blog hiển thị trên trang hiện tại
    displayedBlogs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredBlogs.slice(start, end);
    },
    // Tổng số trang
    totalPages() {
      return Math.ceil(this.filteredBlogs.length / this.itemsPerPage);
    },
    // 3 blog gần đây nhất
    recentBlogs() {
      return [...this.blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('vi-VN', options);
    },
    // Tìm kiếm blog
    searchBlogs() {
      this.currentPage = 1; // Reset về trang 1 khi tìm kiếm
    },
    // Lọc theo danh mục
    filterCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
    },
    // Lọc theo tag
    filterTag(tag) {
      this.selectedTag = tag;
      this.currentPage = 1;
    },
    // Chuyển trang
    changePage(page) {
      this.currentPage = page;
    },
    // Hiển thị chi tiết blog
    showBlogDetail(blogId) {
      this.selectedBlog = this.blogs.find(blog => blog.id === blogId);
    },
    // Đóng modal chi tiết blog
    closeModal() {
      this.selectedBlog = null;
    }
  },
  mounted() {
    // Set background cho các phần tử có thuộc tính data-setbg
    document.querySelectorAll('[data-setbg]').forEach(element => {
      element.style.backgroundImage = `url(${element.getAttribute('data-setbg')})`;
    });
  }
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
</style>
