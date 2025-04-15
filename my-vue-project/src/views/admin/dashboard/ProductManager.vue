<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Quản lý Sản phẩm</h4>
      <button class="btn btn-primary" @click="showAdd = true">Thêm sản phẩm</button>
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Thể loại</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(prod, idx) in products" :key="prod.id">
          <td>{{ idx + 1 }}</td>
          <td>
            <img
              :src="prod.image"
              alt="Ảnh sản phẩm"
              style="width: 48px; height: 48px; object-fit: cover; border-radius: 6px"
            />
          </td>
          <td>
            <span
              class="text-primary text-decoration-underline"
              style="cursor: pointer"
              @click="showDetail(prod)"
              >{{ prod.name }}</span
            >
          </td>
          <td>{{ getCategoryName(prod.categoryId) }}</td>
          <td>{{ prod.price.toLocaleString() }} đ</td>
          <td>{{ prod.description }}</td>
          <td>
            <button class="btn btn-sm btn-info me-2" @click="showDetail(prod)">
              <i class="ri-eye-line"></i>
            </button>
            <button class="btn btn-sm btn-warning me-2" @click="editProduct(prod)">
              <i class="ri-edit-2-line"></i>
            </button>
            <button class="btn btn-sm btn-danger" @click="deleteProduct(prod.id)">
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="6" class="text-center">Chưa có sản phẩm nào.</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Thêm/Sửa -->
    <div
      class="modal fade"
      tabindex="-1"
      :class="{ show: showAdd || showEdit }"
      style="display: block"
      v-if="showAdd || showEdit"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ showEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Tên sản phẩm</label>
              <input type="text" class="form-control" v-model="form.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Thể loại</label>
              <select class="form-select" v-model="form.categoryId">
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label">Giá</label>
              <input type="number" class="form-control" v-model.number="form.price" min="0" />
            </div>
            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea class="form-control" v-model="form.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Hủy</button>
            <button class="btn btn-success" @click="saveProduct">Lưu</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAdd || showEdit" class="modal-backdrop fade show"></div>

    <!-- Modal Chi tiết sản phẩm -->
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
                    class="ri-star-fill"
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
                <span class="text-danger fs-5">{{ detailProduct?.price?.toLocaleString() }} đ</span>
                <span
                  v-if="detailProduct?.discountPrice"
                  class="text-decoration-line-through ms-2 text-muted"
                  >{{ detailProduct?.discountPrice?.toLocaleString() }} đ</span
                >
              </div>
              <div class="mb-2">
                <b>Thể loại:</b> {{ getCategoryName(detailProduct?.categoryId) }}
              </div>
              <div class="mb-2"><b>Thương hiệu:</b> {{ detailProduct?.brand }}</div>
              <div class="mb-2"><b>Mô tả:</b> {{ detailProduct?.description }}</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetail">Đóng</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetailModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import productsData from '@/data/products.js'
import categoriesData from '@/data/categories.js'

export default {
  data() {
    return {
      products: productsData.map((p, idx) => ({
        id: p.id || idx + 1,
        name: p.name,
        image: p.image,
        price: p.price || 0,
        discountPrice: p.discountPrice,
        label: p.label,
        rating: p.rating,
        reviewCount: p.reviewCount,
        brand: p.brand,
        categoryId: categoriesData.find((c) => c.name === p.category)?.id || '',
        description: p.description || '',
      })),
      categories: categoriesData,
      showAdd: false,
      showEdit: false,
      showDetailModal: false,
      detailProduct: null,
      form: { id: null, name: '', categoryId: '', price: 0, description: '' },
    }
  },
  methods: {
    closeModal() {
      this.showAdd = false
      this.showEdit = false
      this.form = { id: null, name: '', categoryId: '', price: 0, description: '' }
    },
    saveProduct() {
      if (!this.form.name || !this.form.categoryId) return alert('Vui lòng nhập đủ thông tin!')
      if (this.showAdd) {
        const newId = this.products.length ? Math.max(...this.products.map((p) => p.id)) + 1 : 1
        this.products.push({ ...this.form, id: newId })
      } else if (this.showEdit) {
        const idx = this.products.findIndex((p) => p.id === this.form.id)
        if (idx !== -1) this.products[idx] = { ...this.form }
      }
      this.closeModal()
    },
    editProduct(prod) {
      this.form = { ...prod }
      this.showEdit = true
    },
    deleteProduct(id) {
      if (confirm('Bạn chắc chắn muốn xóa?')) {
        this.products = this.products.filter((p) => p.id !== id)
      }
    },
    getCategoryName(id) {
      const cat = this.categories.find((c) => c.id === id)
      return cat ? cat.name : ''
    },
    showDetail(prod) {
      this.detailProduct = prod
      this.showDetailModal = true
    },
    closeDetail() {
      this.showDetailModal = false
      this.detailProduct = null
    },
  },
}
</script>
