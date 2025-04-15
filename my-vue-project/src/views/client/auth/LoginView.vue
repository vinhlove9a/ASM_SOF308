<template>
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="w-100" style="max-width: 420px">
      <div class="card shadow-sm p-4 border-0">
        <h3 class="mb-4 text-center">Login</h3>
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Username/Phone</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-user-fill"></i></span>
              <input
                type="text"
                id="username"
                v-model="username"
                :class="['form-control', errors.username && 'is-invalid']"
                required
                placeholder="Enter your username or phone"
              />
              <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-lock-2-fill"></i></span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                :class="['form-control', errors.password && 'is-invalid']"
                required
                placeholder="Enter your password"
              />
              <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
              <button
                type="button"
                class="btn btn-outline-secondary"
                tabindex="-1"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="userType" class="form-label">User Type</label>
            <select id="userType" v-model="userType" class="form-select">
              <option value="customer">Customer</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <router-link to="/forgot-password" class="link-danger small"
              >Forgot your password?</router-link
            >
          </div>
          <button type="submit" class="btn btn-danger w-100">Login</button>
        </form>
        <div class="text-center mt-3">
          <span class="text-secondary">Don't have an account?</span>
          <router-link to="/register" class="ms-1 link-danger fw-bold">Create Account</router-link>
        </div>
      </div>

      <div v-if="billHistory.length === 0" class="text-center text-secondary">
        No bill history found.
      </div>
      <div v-else>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
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
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      userType: 'customer',
      showPassword: false,
      errors: {},
    }
  },
  methods: {
    validate() {
      this.errors = {}
      if (!this.username) {
        this.errors.username = 'Username/Phone is required.'
      }
      if (!this.password) {
        this.errors.password = 'Password is required.'
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.'
      }
      return Object.keys(this.errors).length === 0
    },
    onLogin() {
      if (!this.validate()) return
      // Xử lý đăng nhập ở đây (gửi API, validate...)
      alert('Đăng nhập thành công! (Demo)')
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
  },
}
</script>

<!-- Import CSS từ assets nếu chưa global -->

<!-- Import Remixicon CDN trong index.html hoặc dùng npm package nếu muốn -->
