<template>
  <div class="auth-container">
    <div class="auth-form">
      <h2>Đăng ký</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <label for="name">Tên</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="input-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="input-group">
          <label for="password">Mật khẩu</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="primary-btn">Đăng ký</button>
      </form>
      <p class="switch-link">Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleRegister() {
      // TODO: Add registration logic
      alert('Đăng ký thành công (demo)!');
    }
  }
}
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
