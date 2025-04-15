<template>
  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100 forgot-hero-bg">
    <div class="w-100" style="max-width: 420px;">
      <div class="card shadow-sm p-4 border-0">
        <h3 class="mb-4 text-center">Đặt lại mật khẩu</h3>
        <form @submit.prevent="onReset">
          <div class="mb-3">
            <label for="resetEmail" class="form-label">Email</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-mail-fill"></i></span>
              <input
                type="email"
                id="resetEmail"
                v-model="email"
                :class="['form-control', errors.email && 'is-invalid']"
                required
                placeholder="Nhập email"
              />
              <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="resetPassword" class="form-label">Mật khẩu mới</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-lock-2-fill"></i></span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="resetPassword"
                v-model="password"
                :class="['form-control', errors.password && 'is-invalid']"
                required
                placeholder="Nhập mật khẩu mới"
              />
              <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
              <button type="button" class="btn btn-outline-secondary" tabindex="-1" @click="showPassword = !showPassword">
                <i :class="showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'"></i>
              </button>
            </div>
          </div>
          <div class="mb-3">
            <label for="resetPasswordConfirm" class="form-label">Xác nhận mật khẩu mới</label>
            <div class="input-group">
              <span class="input-group-text bg-white"><i class="ri-lock-password-line"></i></span>
              <input
                :type="showPassword2 ? 'text' : 'password'"
                id="resetPasswordConfirm"
                v-model="confirmPassword"
                :class="['form-control', errors.confirmPassword && 'is-invalid']"
                required
                placeholder="Xác nhận mật khẩu mới"
              />
              <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
              <button type="button" class="btn btn-outline-secondary" tabindex="-1" @click="showPassword2 = !showPassword2">
                <i :class="showPassword2 ? 'ri-eye-fill' : 'ri-eye-off-fill'"></i>
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn-danger w-100 mt-2">Reset Password</button>
        </form>
        <p class="text-center mt-4">
          Đã nhớ mật khẩu?
          <router-link to="/login">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showPassword2: false,
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.email) this.errors.email = 'Vui lòng nhập email.';
      else if (!/^\S+@\S+\.\S+$/.test(this.email)) this.errors.email = 'Email không đúng định dạng.';
      if (!this.password) this.errors.password = 'Vui lòng nhập mật khẩu mới.';
      else if (this.password.length < 6) this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
      else if (!/[a-zA-Z]/.test(this.password) || !/\d/.test(this.password)) this.errors.password = 'Mật khẩu phải có cả chữ và số.';
      if (!this.confirmPassword) this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
      else if (this.confirmPassword !== this.password) this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
      return Object.keys(this.errors).length === 0;
    },
    onReset() {
      if (!this.validate()) return;
      // Xử lý reset password ở đây
      alert('Đổi mật khẩu thành công! (Demo)')
    },
  },
};
</script>
