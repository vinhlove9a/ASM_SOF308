<template>
  <ClientLayout>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Thanh toán</h4>
              <div class="breadcrumb__links">
                <router-link to="/">Trang chủ</router-link>
                <router-link to="/shop">Cửa hàng</router-link>
                <span>Thanh toán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Checkout Section Begin -->
    <section class="checkout spad">
      <div class="container">
        <div class="checkout__form">
          <form @submit.prevent="placeOrder">
            <div class="row">
              <div class="col-lg-8 col-md-6">
                <h6 class="coupon__code">
                  <span class="icon_tag_alt"></span> Có mã giảm giá?
                  <a href="#" @click.prevent="showCouponForm = !showCouponForm">Nhấn vào đây</a> để
                  nhập mã của bạn
                </h6>
                <div v-if="showCouponForm" class="checkout__input mb-4">
                  <div class="d-flex">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      v-model="couponCode"
                      class="me-2"
                    />
                    <button type="button" class="btn btn-dark" @click="applyCoupon">Áp dụng</button>
                  </div>
                </div>
                <h6 class="checkout__title">Chi tiết thanh toán</h6>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Họ<span>*</span></p>
                      <input type="text" v-model="billingDetails.firstName" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Tên<span>*</span></p>
                      <input type="text" v-model="billingDetails.lastName" required />
                    </div>
                  </div>
                </div>
                <div class="checkout__input">
                  <p>Quốc gia<span>*</span></p>
                  <input type="text" v-model="billingDetails.country" required />
                </div>
                <div class="checkout__input">
                  <p>Địa chỉ<span>*</span></p>
                  <input
                    type="text"
                    placeholder="Địa chỉ đường phố"
                    v-model="billingDetails.address"
                    class="checkout__input__add"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Căn hộ, lầu, ..."
                    v-model="billingDetails.addressDetail"
                  />
                </div>
                <div class="checkout__input">
                  <p>Thành phố/Tỉnh<span>*</span></p>
                  <input type="text" v-model="billingDetails.city" required />
                </div>
                <div class="checkout__input">
                  <p>Quận/Huyện<span>*</span></p>
                  <input type="text" v-model="billingDetails.district" required />
                </div>
                <div class="checkout__input">
                  <p>Mã bưu điện / ZIP<span>*</span></p>
                  <input type="text" v-model="billingDetails.postalCode" required />
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Số điện thoại<span>*</span></p>
                      <input type="text" v-model="billingDetails.phone" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="checkout__input">
                      <p>Email<span>*</span></p>
                      <input type="email" v-model="billingDetails.email" required />
                    </div>
                  </div>
                </div>
                <div class="checkout__input__checkbox">
                  <label for="acc">
                    Tạo tài khoản?
                    <input type="checkbox" id="acc" v-model="createAccount" />
                    <span class="checkmark"></span>
                  </label>
                  <p>
                    Tạo tài khoản bằng cách nhập các thông tin sau. Nếu bạn đã là khách hàng, vui
                    lòng đăng nhập
                  </p>
                </div>
                <div v-if="createAccount" class="checkout__input">
                  <p>Mật khẩu tài khoản<span>*</span></p>
                  <input type="password" v-model="accountPassword" required />
                </div>
                <div class="checkout__input__checkbox">
                  <label for="diff-acc">
                    Gửi đến địa chỉ khác?
                    <input type="checkbox" id="diff-acc" v-model="shipToDifferentAddress" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div v-if="shipToDifferentAddress" class="mt-4">
                  <h6 class="checkout__title">Thông tin giao hàng</h6>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Họ<span>*</span></p>
                        <input type="text" v-model="shippingDetails.firstName" required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Tên<span>*</span></p>
                        <input type="text" v-model="shippingDetails.lastName" required />
                      </div>
                    </div>
                  </div>
                  <div class="checkout__input">
                    <p>Quốc gia<span>*</span></p>
                    <input type="text" v-model="shippingDetails.country" required />
                  </div>
                  <div class="checkout__input">
                    <p>Địa chỉ<span>*</span></p>
                    <input
                      type="text"
                      placeholder="Địa chỉ đường phố"
                      v-model="shippingDetails.address"
                      class="checkout__input__add"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Căn hộ, lầu, ..."
                      v-model="shippingDetails.addressDetail"
                    />
                  </div>
                  <div class="checkout__input">
                    <p>Thành phố/Tỉnh<span>*</span></p>
                    <input type="text" v-model="shippingDetails.city" required />
                  </div>
                  <div class="checkout__input">
                    <p>Quận/Huyện<span>*</span></p>
                    <input type="text" v-model="shippingDetails.district" required />
                  </div>
                  <div class="checkout__input">
                    <p>Mã bưu điện / ZIP<span>*</span></p>
                    <input type="text" v-model="shippingDetails.postalCode" required />
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Số điện thoại<span>*</span></p>
                        <input type="text" v-model="shippingDetails.phone" required />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="checkout__input">
                        <p>Email<span>*</span></p>
                        <input type="email" v-model="shippingDetails.email" required />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="checkout__input">
                  <p>Ghi chú đơn hàng<span>*</span></p>
                  <input
                    type="text"
                    placeholder="Ghi chú về đơn hàng của bạn."
                    v-model="orderNote"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="checkout__order">
                  <h4 class="order__title">Đơn hàng của bạn</h4>
                  <div class="checkout__order__products">Sản phẩm <span>Tổng</span></div>
                  <ul class="checkout__total__products">
                    <li v-for="(item, index) in cartItems" :key="index">
                      {{ index + 1 }}. {{ item.product.name }} x{{ item.quantity }}
                      <span>{{
                        formatPrice(
                          (item.product.discountPrice || item.product.price) * item.quantity,
                        )
                      }}</span>
                    </li>
                  </ul>
                  <ul class="checkout__total__all">
                    <li>
                      Tạm tính <span>{{ formatPrice(subtotal) }}</span>
                    </li>
                    <li v-if="discount > 0">
                      Giảm giá <span>- {{ formatPrice(discount) }}</span>
                    </li>
                    <li>
                      Tổng cộng <span>{{ formatPrice(total) }}</span>
                    </li>
                  </ul>
                  <div class="checkout__input__checkbox">
                    <label for="payment">
                      Thanh toán khi nhận hàng
                      <input type="checkbox" id="payment" v-model="paymentMethod" value="cod" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="checkout__input__checkbox">
                    <label for="paypal">
                      Thanh toán qua thẻ/Ví điện tử
                      <input type="checkbox" id="paypal" v-model="paymentMethod" value="online" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <button type="submit" class="site-btn">ĐẶT HÀNG</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <!-- Checkout Section End -->
  </ClientLayout>
</template>

<script>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
import allProducts from '@/data/products.js'

export default {
  name: 'CheckoutView',
  components: {
    ClientLayout,
  },
  data() {
    return {
      cartItems: [
        // Hard-coded cart items for demo
        {
          product: allProducts[0],
          quantity: 1,
          color: 'Black',
          size: 'L',
        },
        {
          product: allProducts[2],
          quantity: 2,
          color: 'Blue',
          size: 'M',
        },
      ],
      discount: 0,
      couponCode: '',
      showCouponForm: false,
      createAccount: false,
      accountPassword: '',
      shipToDifferentAddress: false,
      billingDetails: {
        firstName: '',
        lastName: '',
        country: 'Việt Nam',
        address: '',
        addressDetail: '',
        city: '',
        district: '',
        postalCode: '',
        phone: '',
        email: '',
      },
      shippingDetails: {
        firstName: '',
        lastName: '',
        country: 'Việt Nam',
        address: '',
        addressDetail: '',
        city: '',
        district: '',
        postalCode: '',
        phone: '',
        email: '',
      },
      orderNote: '',
      paymentMethod: 'cod',
    }
  },
  computed: {
    // Tính tổng tiền tạm tính
    subtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.product.discountPrice || item.product.price) * item.quantity
      }, 0)
    },
    // Tính tổng tiền sau khi trừ giảm giá
    total() {
      return this.subtotal - this.discount
    },
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    },
    // Áp dụng mã giảm giá
    applyCoupon() {
      // Giả lập kiểm tra mã giảm giá
      if (this.couponCode.toLowerCase() === 'sale10') {
        this.discount = this.subtotal * 0.1 // Giảm 10%
        alert('Đã áp dụng mã giảm giá thành công!')
      } else if (this.couponCode.toLowerCase() === 'vinh20') {
        this.discount = this.subtotal * 0.2 // Giảm 20%
        alert('Đã áp dụng mã giảm giá thành công!')
      } else {
        alert('Mã giảm giá không hợp lệ!')
        this.discount = 0
      }
    },
    // Đặt hàng
    placeOrder() {
      // Giả lập việc đặt hàng
      const orderData = {
        cartItems: this.cartItems,
        subtotal: this.subtotal,
        discount: this.discount,
        total: this.total,
        billingDetails: this.billingDetails,
        shippingDetails: this.shipToDifferentAddress ? this.shippingDetails : this.billingDetails,
        createAccount: this.createAccount,
        paymentMethod: this.paymentMethod,
        orderNote: this.orderNote,
      }

      console.log('Đơn hàng đã được đặt:', orderData)
      alert('Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã mua hàng.')

      // Chuyển hướng về trang chủ sau khi đặt hàng
      this.$router.push('/')
    },
  },
  mounted() {
    console.log('Checkout view mounted')
  },
}
</script>

<style scoped>
/* Import style từ template gốc hoặc viết lại */
</style>
