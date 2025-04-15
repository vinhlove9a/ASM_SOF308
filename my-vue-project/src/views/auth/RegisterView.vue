<template>
  <div class="container-fluid d-flex align-items-center justify-content-center min-vh-100 register-hero-bg">
    <div class="w-100" style="max-width: 500px;">
      <div class="card shadow-sm p-4 border-0">
        <h3 class="mb-4 text-center">Đăng ký tài khoản</h3>
        <form @submit.prevent="onRegister">
          <div class="row g-3">
            <div class="col-md-6">
              <label for="fullName" class="form-label">Họ và tên</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-id-card-fill"></i></span>
                <input
                  type="text"
                  id="fullName"
                  v-model="fullName"
                  :class="['form-control', errors.fullName && 'is-invalid']"
                  required
                  placeholder="Nhập họ và tên"
                />
                <div v-if="errors.fullName" class="invalid-feedback">{{ errors.fullName }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="phone" class="form-label">Số điện thoại</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-phone-fill"></i></span>
                <input
                  type="tel"
                  id="phone"
                  v-model="phone"
                  :class="['form-control', errors.phone && 'is-invalid']"
                  required
                  pattern="[0-9]+"
                  title="Only numbers allowed"
                  placeholder="Nhập số điện thoại"
                />
                <div v-if="errors.phone" class="invalid-feedback">{{ errors.phone }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="address" class="form-label">Địa chỉ</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-map-pin-fill"></i></span>
                <input
                  type="text"
                  id="address"
                  v-model="address"
                  class="form-control"
                  placeholder="Nhập địa chỉ"
                />
              </div>
            </div>
            <div class="col-md-6">
              <label for="gender" class="form-label">Giới tính</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-user-3-fill"></i></span>
                <select id="gender" v-model="gender" class="form-select">
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <label for="birthDate" class="form-label">Ngày sinh</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-calendar-2-fill"></i></span>
                <input type="date" id="birthDate" v-model="birthDate" class="form-control" />
              </div>
            </div>
            <div class="col-md-6">
              <label for="emailCreate" class="form-label">Email</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-mail-fill"></i></span>
                <input
                  type="email"
                  id="emailCreate"
                  v-model="email"
                  :class="['form-control', errors.email && 'is-invalid']"
                  required
                  placeholder="Nhập email"
                />
                <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
              </div>
            </div>
            <div class="col-md-6">
              <label for="passwordCreate" class="form-label">Mật khẩu</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-lock-2-fill"></i></span>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="passwordCreate"
                  v-model="password"
                  :class="['form-control', errors.password && 'is-invalid']"
                  required
                  placeholder="Nhập mật khẩu"
                />
                <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
                <button type="button" class="btn btn-outline-secondary" tabindex="-1" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'"></i>
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <label for="passwordConfirm" class="form-label">Xác nhận mật khẩu</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-lock-password-line"></i></span>
                <input
                  :type="showPassword2 ? 'text' : 'password'"
                  id="passwordConfirm"
                  v-model="confirmPassword"
                  :class="['form-control', errors.confirmPassword && 'is-invalid']"
                  required
                  placeholder="Xác nhận mật khẩu"
                />
                <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>
                <button type="button" class="btn btn-outline-secondary" tabindex="-1" @click="showPassword2 = !showPassword2">
                  <i :class="showPassword2 ? 'ri-eye-fill' : 'ri-eye-off-fill'"></i>
                </button>
              </div>
            </div>
            <div class="col-md-12">
              <label for="registerType" class="form-label">Đăng ký với vai trò</label>
              <div class="input-group">
                <span class="input-group-text bg-white"><i class="ri-user-settings-line"></i></span>
                <select id="registerType" v-model="registerType" :class="['form-select', errors.registerType && 'is-invalid']">
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
                <div v-if="errors.registerType" class="invalid-feedback">{{ errors.registerType }}</div>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-danger w-100 mt-4">Register</button>
        </form>
        <div class="text-center mt-3">
          <span class="text-secondary">Đã có tài khoản?</span>
          <router-link to="/login" class="ms-1 link-danger fw-bold">Đăng nhập</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      phone: '',
      address: '',
      gender: '',
      birthDate: '',
      email: '',
      password: '',
      confirmPassword: '',
      registerType: '',
      showPassword: false,
      showPassword2: false,
      errors: {},
    };
  },
  methods: {
    validate() {
      this.errors = {};
      if (!this.fullName) this.errors.fullName = 'Vui lòng nhập họ và tên.';
      if (!this.phone) this.errors.phone = 'Vui lòng nhập số điện thoại.';
      else if (!/^\d{9,12}$/.test(this.phone)) this.errors.phone = 'Số điện thoại phải từ 9-12 chữ số.';
      if (!this.email) this.errors.email = 'Vui lòng nhập email.';
      else if (!/^\S+@\S+\.\S+$/.test(this.email)) this.errors.email = 'Email không đúng định dạng.';
      if (!this.password) this.errors.password = 'Vui lòng nhập mật khẩu.';
      else if (this.password.length < 6) this.errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
      else if (!/[a-zA-Z]/.test(this.password) || !/\d/.test(this.password)) this.errors.password = 'Mật khẩu phải có cả chữ và số.';
      if (!this.confirmPassword) this.errors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
      else if (this.confirmPassword !== this.password) this.errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
      if (!this.registerType) this.errors.registerType = 'Vui lòng chọn vai trò.';
      return Object.keys(this.errors).length === 0;
    },
    onRegister() {
      if (!this.validate()) return;
      // Xử lý đăng ký ở đây
      alert('Đăng ký thành công! (Demo)')
    },
  },
};
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}
.auth-form {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
  width: 100%;
  max-width: 400px;
}
.auth-form h2 {
  margin-bottom: 2rem;
  color: #333;
  font-weight: 900;
  text-align: center;
}
.input-group {
  margin-bottom: 1.5rem;
}
.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}
.input-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #eee;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  background: #f9f9f9;
  transition: border 0.2s;
}
.input-group input:focus {
  border-color: #ff6f61;
}
.primary-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ff6f61;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.primary-btn:hover {
  background: #ff3b2e;
}
.switch-link {
  margin-top: 1.5rem;
  text-align: center;
}
.switch-link a {
  color: #ff6f61;
  font-weight: 700;
}
</style>
