<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Quản lý Thể loại</h4>
      <button class="btn btn-primary" @click="showAdd = true">Thêm thể loại</button>
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>#</th>
          <th>Tên thể loại</th>
          <th>Mô tả</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cat, idx) in categories" :key="cat.id">
          <td>{{ idx + 1 }}</td>
          <td>
            <span class="text-primary text-decoration-underline" style="cursor:pointer" @click="showDetail(cat)">{{ cat.name }}</span>
          </td>
          <td>{{ cat.description }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="editCategory(cat)"><i class="ri-edit-2-line"></i></button>
            <button class="btn btn-sm btn-danger" @click="deleteCategory(cat.id)"><i class="ri-delete-bin-6-line"></i></button>
          </td>
        </tr>
        <tr v-if="categories.length === 0">
          <td colspan="4" class="text-center">Chưa có thể loại nào.</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Thêm/Sửa -->
    <div class="modal fade" tabindex="-1" :class="{show: showAdd || showEdit}" style="display: block;" v-if="showAdd || showEdit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ showEdit ? 'Sửa thể loại' : 'Thêm thể loại' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Tên thể loại</label>
              <input type="text" class="form-control" v-model="form.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea class="form-control" v-model="form.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Hủy</button>
            <button class="btn btn-success" @click="saveCategory">Lưu</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showAdd || showEdit" class="modal-backdrop fade show"></div>

    <!-- Modal Chi tiết danh mục -->
    <div class="modal fade" tabindex="-1" :class="{show: showDetailModal}" style="display: block;" v-if="showDetailModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Chi tiết thể loại</h5>
            <button type="button" class="btn-close" @click="closeDetail"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Tên thể loại</label>
              <input type="text" class="form-control" v-model="detailCategory.name" />
            </div>
            <div class="mb-3">
              <label class="form-label">Mô tả</label>
              <textarea class="form-control" v-model="detailCategory.description"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeDetail">Đóng</button>
            <button class="btn btn-success" @click="saveDetail">Lưu thay đổi</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDetailModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import categoriesData from '@/data/categories.js';

export default {
  data() {
    return {
      categories: categoriesData.map(cat => ({...cat, description: cat.description || ''})),
      showAdd: false,
      showEdit: false,
      form: { id: null, name: '', description: '' },
      showDetailModal: false,
      detailCategory: { id: null, name: '', description: '' },
    };
  },
  methods: {
    closeModal() {
      this.showAdd = false;
      this.showEdit = false;
      this.form = { id: null, name: '', description: '' };
    },
    saveCategory() {
      if (!this.form.name) return alert('Tên thể loại không được để trống!');
      if (this.showAdd) {
        const newId = this.categories.length ? Math.max(...this.categories.map(c => c.id)) + 1 : 1;
        this.categories.push({ ...this.form, id: newId });
      } else if (this.showEdit) {
        const idx = this.categories.findIndex(c => c.id === this.form.id);
        if (idx !== -1) this.categories[idx] = { ...this.form };
      }
      this.closeModal();
    },
    editCategory(cat) {
      this.form = { ...cat };
      this.showEdit = true;
    },
    deleteCategory(id) {
      if (confirm('Bạn chắc chắn muốn xóa?')) {
        this.categories = this.categories.filter(c => c.id !== id);
      }
    },
  },
};
</script>
