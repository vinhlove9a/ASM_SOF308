<template>
  <div class="container-fluid py-4">
    <h2 class="mb-4">Admin Dashboard</h2>
    <ul class="nav nav-tabs mb-4">
      <li class="nav-item">
        <a class="nav-link" :class="{active: tab==='category'}" href="#" @click.prevent="tab='category'">Quản lý Thể loại</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{active: tab==='product'}" href="#" @click.prevent="tab='product'">Quản lý Sản phẩm</a>
      </li>
    </ul>
    <div v-if="tab==='category'">
      <CategoryManager />
    </div>
    <div v-else>
      <ProductManager />
    </div>
  </div>
</template>

<script>
import CategoryManager from './CategoryManager.vue';
import ProductManager from './ProductManager.vue';
export default {
  components: { CategoryManager, ProductManager },
  data() {
    return {
      tab: 'category',
    };
  },
};
</script>
