<template>
  <ClientLayout>
    <section class="orders spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <h4>Đơn hàng của tôi</h4>
            <table class="table table-bordered mt-4">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Chi tiết</th>
                  <th>Cập nhật trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ formatDate(order.createdAt) }}</td>
                  <td>{{ formatPrice(order.total) }}</td>
                  <td>
                    <span :class="statusClass(order.status)">{{ order.status }}</span>
                  </td>
                  <td>
                    <button class="btn btn-link p-0" @click="toggleDetail(order.id)">Xem</button>
                  </td>
                  <td>
                    <select v-model="order.status" @change="updateStatus(order)">
                      <option>Chờ xác nhận</option>
                      <option>Đã xác nhận</option>
                      <option>Đang giao</option>
                      <option>Đã nhận hàng</option>
                      <option>Đã hủy</option>
                    </select>
                  </td>
                </tr>
                <tr v-for="order in detailOrders" :key="'detail-' + order.id">
                  <td colspan="6">
                    <div>
                      <h6>Chi tiết sản phẩm:</h6>
                      <ul>
                        <li v-for="item in order.cartItems" :key="item.product.id">
                          {{ item.product.name }} x {{ item.quantity }} ({{ formatPrice((item.product.discountPrice || item.product.price) * item.quantity) }})
                        </li>
                      </ul>
                      <div><b>Ghi chú:</b> {{ order.orderNote || 'Không có' }}</div>
                    </div>
                  </td>
                </tr>
                <tr v-if="orders.length === 0">
                  <td colspan="6" class="text-center">Bạn chưa có đơn hàng nào.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'

export default {
  name: 'OrdersView',
  components: { ClientLayout },
  computed: {
    detailOrders() {
      return this.orders.filter(order => this.showDetailId === order.id);
    }
  },
  data() {
    return {
      orders: [],
      showDetailId: null
    }
  },
  methods: {
    loadOrders() {
      this.orders = JSON.parse(localStorage.getItem('orders') || '[]')
    },
    formatDate(date) {
      return new Date(date).toLocaleString('vi-VN')
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    toggleDetail(id) {
      this.showDetailId = this.showDetailId === id ? null : id
    },
    statusClass(status) {
      switch (status) {
        case 'Chờ xác nhận': return 'text-warning';
        case 'Đã xác nhận': return 'text-info';
        case 'Đang giao': return 'text-primary';
        case 'Đã nhận hàng': return 'text-success';
        case 'Đã hủy': return 'text-danger';
        default: return '';
      }
    },
    updateStatus(order) {
      // Update status in localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const idx = orders.findIndex(o => o.id === order.id)
      if (idx > -1) {
        orders[idx].status = order.status
        localStorage.setItem('orders', JSON.stringify(orders))
        this.loadOrders()
      }
    }
  },
  mounted() {
    this.loadOrders()
  }
}
</script>

<style scoped>
.text-warning { color: #ff9800; }
.text-info { color: #2196f3; }
.text-primary { color: #3f51b5; }
.text-success { color: #4caf50; }
.text-danger { color: #f44336; }
</style>
