<template>
  <div
    class="container-fluid d-flex align-items-center justify-content-center min-vh-100 login-hero-bg"
  >
    <div class="w-100" style="max-width: 420px">
      <div class="card shadow-sm p-4 border-0">
        <h3 class="mb-4 text-center">Đăng nhập</h3>
        <form @submit.prevent="onLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Tên đăng nhập hoặc Số điện thoại</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-user-fill"></i></span>
              <input
                type="text"
                id="username"
                v-model="username"
                :class="['form-control', errors.username && 'is-invalid']"
                required
                placeholder="Nhập tên đăng nhập hoặc số điện thoại"
              />
              <div v-if="errors.username" class="invalid-feedback">{{ errors.username }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-lock-2-fill"></i></span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                :class="['form-control', errors.password && 'is-invalid']"
                required
                placeholder="Nhập mật khẩu"
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
            <label for="userType" class="form-label">Loại người dùng</label>
            <select id="userType" v-model="userType" class="form-select">
              <option value="customer">Khách hàng</option>
              <option value="employee">Nhân viên</option>
            </select>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <router-link to="/forgot-password" class="link-danger small"
              >Quên mật khẩu?</router-link
            >
          </div>
          <button type="submit" class="btn btn-danger w-100">Login</button>
        </form>
        <div class="text-center mt-3">
          <span class="text-secondary">Chưa có tài khoản?</span>
          <router-link to="/register" class="ms-1 link-danger fw-bold">Tạo tài khoản</router-link>
        </div>
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
        this.errors.username = 'Vui lòng nhập tên đăng nhập hoặc số điện thoại.'
      }
      if (!this.password) {
        this.errors.password = 'Vui lòng nhập mật khẩu.'
      } else if (this.password.length < 6) {
        this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'
      }
      return Object.keys(this.errors).length === 0
    },
    onLogin() {
      if (!this.validate()) return
      if (
        this.userType === 'customer' &&
        this.username === 'user' &&
        this.password === 'ab123456'
      ) {
        this.$router.push('/')
      } else if (
        this.userType === 'employee' &&
        this.username === 'admin' &&
        this.password === 'ab123456'
      ) {
        this.$router.push('/admin/dashboard')
      } else {
        this.errors.username = 'Tài khoản hoặc mật khẩu không đúng!'
        this.errors.password = 'Tài khoản hoặc mật khẩu không đúng!'
      }
    },
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
  },
}
</script>

<!-- Import CSS từ assets nếu chưa global -->

<!-- Import Remixicon CDN trong index.html hoặc dùng npm package nếu muốn -->
