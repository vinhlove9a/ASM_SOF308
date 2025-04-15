<template>
  <ClientLayout>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Giỏ hàng</h4>
              <div class="breadcrumb__links">
                <router-link to="/">Trang chủ</router-link>
                <router-link to="/shop">Cửa hàng</router-link>
                <span>Giỏ hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Shopping Cart Section Begin -->
    <section class="shopping-cart spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="shopping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Tổng cộng</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in cartItems" :key="index">
                    <td class="product__cart__item">
                      <div class="product__cart__item__pic">
                        <img :src="item.product.image" alt="" style="width: 90px;">
                      </div>
                      <div class="product__cart__item__text">
                        <h6>{{ item.product.name }}</h6>
                        <h5>{{ formatPrice(item.product.discountPrice || item.product.price) }}</h5>
                      </div>
                    </td>
                    <td class="quantity__item">
                      <div class="quantity">
                        <div class="pro-qty-2">
                          <span class="fa fa-angle-left dec qtybtn" @click="decreaseQuantity(index)"></span>
                          <input type="text" :value="item.quantity" readonly>
                          <span class="fa fa-angle-right inc qtybtn" @click="increaseQuantity(index)"></span>
                        </div>
                      </div>
                    </td>
                    <td class="cart__price">{{ formatPrice((item.product.discountPrice || item.product.price) * item.quantity) }}</td>
                    <td class="cart__close"><i class="fa fa-close" @click="removeItem(index)"></i></td>
                  </tr>
                  <tr v-if="cartItems.length === 0">
                    <td colspan="4" class="text-center py-5">
                      <h5>Giỏ hàng của bạn đang trống</h5>
                      <router-link to="/shop" class="btn btn-primary mt-3">Tiếp tục mua sắm</router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="continue__btn">
                  <router-link to="/shop">Tiếp tục mua sắm</router-link>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6">
                <div class="continue__btn update__btn">
                  <a href="#" @click.prevent="updateCart"><i class="fa fa-spinner"></i> Cập nhật giỏ hàng</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="cart__discount">
              <h6>Mã giảm giá</h6>
              <form @submit.prevent="applyDiscount">
                <input type="text" placeholder="Nhập mã giảm giá" v-model="discountCode">
                <button type="submit">Áp dụng</button>
              </form>
            </div>
            <div class="cart__total">
              <h6>Tổng giỏ hàng</h6>
              <ul>
                <li>Tạm tính <span>{{ formatPrice(subtotal) }}</span></li>
                <li v-if="discount > 0">Giảm giá <span>- {{ formatPrice(discount) }}</span></li>
                <li>Tổng cộng <span>{{ formatPrice(total) }}</span></li>
              </ul>
              <router-link to="/checkout" class="primary-btn" :class="{ disabled: cartItems.length === 0 }" 
                          :disabled="cartItems.length === 0">Thanh toán</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Shopping Cart Section End -->
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import allProducts from '@/data/products.js'

export default {
  name: 'CartView',
  components: {
    ClientLayout
  },
  data() {
    return {
      cartItems: [
        // Hard-coded cart items for demo
        { 
          product: allProducts[0], 
          quantity: 1,
          color: 'Black',
          size: 'L' 
        },
        { 
          product: allProducts[2], 
          quantity: 2,
          color: 'Blue',
          size: 'M' 
        }
      ],
      discountCode: '',
      discount: 0
    }
  },
  computed: {
    // Tính tổng tiền tạm tính
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.product.discountPrice || item.product.price) * item.quantity;
      }, 0);
    },
    // Tính tổng tiền sau khi trừ giảm giá
    total() {
      return this.subtotal - this.discount;
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    },
    // Tăng số lượng sản phẩm
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    // Giảm số lượng sản phẩm
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    // Cập nhật giỏ hàng
    updateCart() {
      console.log('Đã cập nhật giỏ hàng');
      alert('Giỏ hàng đã được cập nhật!');
    },
    // Áp dụng mã giảm giá
    applyDiscount() {
      // Giả lập kiểm tra mã giảm giá
      if (this.discountCode.toLowerCase() === 'sale10') {
        this.discount = this.subtotal * 0.1; // Giảm 10%
        alert('Đã áp dụng mã giảm giá thành công!');
      } else if (this.discountCode.toLowerCase() === 'vinh20') {
        this.discount = this.subtotal * 0.2; // Giảm 20%
        alert('Đã áp dụng mã giảm giá thành công!');
      } else {
        alert('Mã giảm giá không hợp lệ!');
        this.discount = 0;
      }
    }
  },
  mounted() {
    // Nếu muốn load giỏ hàng từ localStorage hoặc Vuex store
    console.log('Cart view mounted')
  }
}
</script>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
.disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
