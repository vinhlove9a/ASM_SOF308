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
          </ul>
        </nav>
      </div>
      <div class="col-lg-3 col-md-3">
        <div class="header__nav__option">
          <a href="#" class="search-switch" @click.prevent="showBillModal = true" title="Xem lịch sử hóa đơn">
            <img src="@/assets/img/icon/bill.png" alt="" style="width: 22px; height: 22px; object-fit: contain; vertical-align: middle;" />
          </a>
          <a href="#"><img src="@/assets/img/icon/heart.png" alt="" /></a>
          <router-link to="/cart" style="position: relative;">
            <img src="@/assets/img/icon/cart.png" alt="" />
            <span v-if="totalCartQuantity > 0"
                   style="position: absolute; top: -8px; right: -8px; background: #ff6f61; color: #fff; border-radius: 50%; padding: 0 6px; font-size: 11px; font-weight: bold; min-width: 16px; height: 16px; line-height: 16px; display: flex; align-items: center; justify-content: center;">
               {{ totalCartQuantity }}
             </span>
          </router-link>
          <router-link to="/login" class="btn btn-primary btn-sm me-2">
             <i class="fa fa-user me-1"></i> {{ isLoggedIn ? 'Tài khoản' : 'Đăng nhập' }}
           </router-link>
           <!-- Modal lịch sử hóa đơn -->
           <div v-if="showBillModal" class="custom-modal-backdrop" @click.self="showBillModal = false">
             <div class="custom-modal-content">
               <div class="d-flex justify-content-between align-items-center mb-2">
                 <span class="fw-bold">Lịch sử hóa đơn</span>
                 <button class="btn-close" @click="showBillModal = false"></button>
               </div>
               <div v-if="billHistory.length === 0" class="text-center text-secondary">Không có hóa đơn nào.</div>
               <div v-else>
                 <table class="table table-bordered table-sm mb-0">
                   <thead>
                     <tr>
                       <th>Mã đơn</th>
                       <th>Ngày đặt</th>
                       <th>Tổng tiền</th>
                       <th>Trạng thái</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr v-for="order in billHistory" :key="order.id">
                       <td>{{ order.id }}</td>
                       <td>{{ formatDate(order.createdAt) }}</td>
                       <td>{{ formatPrice(order.total) }}</td>
                       <td>{{ order.status }}</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
             </div>
           </div>
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
      cartItems: [],
      showBillDropdown: false,
      showBillModal: false,
      billHistory: [],
    }
  },
  mounted() {
    // Load cart từ localStorage khi header mount
    this.loadCart()
    this.loadBillHistory()
    // Lắng nghe sự kiện cập nhật giỏ hàng
    window.addEventListener('cart-updated', this.loadCart)
    // Lắng nghe sự kiện cập nhật đơn hàng từ các nơi khác
    window.addEventListener('storage', this.handleStorageChange)
    // Lắng nghe sự kiện cập nhật hóa đơn từ HomeView
    window.addEventListener('orders-updated', this.loadBillHistory)
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.loadCart)
    window.removeEventListener('storage', this.handleStorageChange)
    window.removeEventListener('orders-updated', this.loadBillHistory)
  },
  methods: {
    loadCart() {
      // Chỉ cập nhật data, mọi hiển thị đều lấy từ data
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    },
  },
  computed: {
    currentRoute() {
      return this.$route.path
    },
    totalCartQuantity() {
      return this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)
    }
  },
  methods: {
    loadCart() {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]')
    },
    loadBillHistory() {
      try {
        this.billHistory = JSON.parse(localStorage.getItem('orders') || '[]');
      } catch {
        this.billHistory = [];
      }
    },
    handleStorageChange(e) {
      if (e.key === 'orders') this.loadBillHistory();
    },
    toggleBillDropdown() {
      this.showBillDropdown = !this.showBillDropdown;
      if (this.showBillDropdown) {
        this.loadBillHistory();
        setTimeout(() => {
          document.addEventListener('click', this.handleClickOutsideDropdown);
        }, 0);
      } else {
        document.removeEventListener('click', this.handleClickOutsideDropdown);
      }
    },
    handleClickOutsideDropdown(event) {
      const dropdown = document.querySelector('.bill-history-dropdown');
      const btn = document.querySelector('.btn.btn-outline-secondary');
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        btn &&
        !btn.contains(event.target)
      ) {
        this.showBillDropdown = false;
        document.removeEventListener('click', this.handleClickOutsideDropdown);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleString('vi-VN');
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
    downloadOrderAsJson(order) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(order, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `order_${order.id}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    downloadAllOrders() {
      if (!this.billHistory || this.billHistory.length === 0) return;
      this.billHistory.forEach(order => {
        this.downloadOrderAsJson(order);
      });
    }
  },
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
.custom-modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(40, 40, 60, 0.25);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2.5px);
  transition: background 0.3s;
}
.custom-modal-content {
  background: #fff;
  border-radius: 18px;
  max-width: 640px;
  width: 98vw;
  max-height: 92vh;
  overflow: auto;
  padding: 44px 36px 32px 36px;
  box-shadow: 0 8px 32px rgba(40,40,60,0.18), 0 1.5px 8px rgba(0,0,0,0.06);
  animation: fadeIn 0.25s cubic-bezier(.25,.8,.25,1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.custom-modal-content .d-flex {
  margin-bottom: 18px;
}
.custom-modal-content .fw-bold {
  font-size: 1.25rem;
  color: #ff6f61;
  letter-spacing: 0.5px;
}
.btn-close {
  border: none;
  background: #f6f6f6;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}
.btn-close:hover {
  background: #ffe5e0;
  color: #ff6f61;
}
.custom-modal-content table {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background: #fafbfc;
  margin-top: 10px;
  box-shadow: 0 1px 6px rgba(60,60,90,0.06);
}
.custom-modal-content th {
  background: #ff6f61;
  color: #fff;
  font-weight: 700;
  border: none;
  padding: 10px 6px;
  font-size: 1rem;
}
.custom-modal-content td {
  padding: 9px 6px;
  border-bottom: 1px solid #eee;
  font-size: 0.98rem;
}
.custom-modal-content tr:last-child td {
  border-bottom: none;
}
.custom-modal-content tbody tr:hover {
  background: #fff3f0;
}
.custom-modal-content td:nth-child(3) {
  color: #ff6f61;
  font-weight: bold;
}
.custom-modal-content td:nth-child(4) {
  font-weight: 500;
  text-transform: capitalize;
}
@media (max-width: 600px) {
  .custom-modal-content {
    padding: 16px 4px 12px 4px;
    max-width: 99vw;
  }
  .custom-modal-content th, .custom-modal-content td {
    font-size: 0.96rem;
    padding: 7px 2px;
  }
}

.btn-close {
  border: none;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
