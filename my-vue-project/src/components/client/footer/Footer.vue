<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="footer__about">
            <div class="footer__logo">
              <a
                href="#"
                style="
                  font-family: 'Nunito Sans', sans-serif;
                  font-size: 24px;
                  font-weight: 900;
                  color: #333;
                  text-decoration: none;
                "
              >
                <span style="color: #ff6f61">Vinh's</span> Choice
              </a>
            </div>
            <p>
              Khách hàng là trung tâm của mô hình kinh doanh độc đáo của chúng
              tôi, bao gồm thiết kế.
            </p>
            <a href="#"><img src="@/assets/img/payment.png" alt="" /></a>
          </div>
        </div>
        <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
          <div class="footer__widget">
            <h6>Mua sắm</h6>
            <ul>
              <li><a href="#">Cửa hàng quần áo</a></li>
              <li><a href="#">Giày xu hướng</a></li>
              <li><a href="#">Phụ kiện</a></li>
              <li><a href="#">Giảm giá</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-3 col-sm-6">
          <div class="footer__widget">
            <h6>Mua sắm</h6>
            <ul>
              <li><a href="#">Liên hệ</a></li>
              <li><a href="#">Phương thức thanh toán</a></li>
              <li><a href="#">Giao hàng</a></li>
              <li><a href="#">Đổi trả & Hoàn tiền</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
          <div class="footer__widget">
            <h6>Bản tin</h6>
            <div class="footer__newslatter">
              <p>
                Hãy là người đầu tiên biết về hàng mới về, look books, giảm
                giá & khuyến mãi!
              </p>
              <form @submit.prevent="subscribeNewsletter">
                <input type="text" placeholder="Email của bạn" v-model="email"/>
                <button type="submit">
                  <span class="icon_mail_alt"></span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribeNewsletter() {
      // Xử lý đăng ký nhận bản tin
      console.log('Đã đăng ký bản tin với email:', this.email);
      this.email = '';
      alert('Cảm ơn bạn đã đăng ký nhận bản tin!');
    }
  }
}
</script>

<style scoped>
/* Các style từ CSS gốc */
</style>
