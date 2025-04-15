<template>
  <ClientLayout>
    <!-- Breadcrumb Section Begin -->
    <section class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__text">
              <h4>Liên hệ</h4>
              <div class="breadcrumb__links">
                <router-link to="/">Trang chủ</router-link>
                <span>Liên hệ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Breadcrumb Section End -->

    <!-- Map Begin -->
    <div class="map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639306974364!2d105.74726179999999!3d21.038129799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1743357510750!5m2!1svi!2s"
        width="100%"
        height="450"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <!-- Map End -->

    <!-- Contact Section Begin -->
    <section class="contact spad">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="contact__text">
              <div class="section-title">
                <span>Thông tin</span>
                <h2>Vị trí của chúng tôi</h2>
                <p>
                  Chúng tôi tọa lạc tại trung tâm thành phố, dễ dàng tiếp cận và
                  thuận tiện cho khách hàng.
                </p>
              </div>
              <ul>
                <li>
                  <h4>Địa chỉ</h4>
                  <p>
                    Tòa nhà FPT Polytechnic, P. Trịnh Văn Bô, Xuân Phương, Nam
                    Từ Liêm, Hà Nội 100000 <br />Số điện thoại: 113
                  </p>
                </li>
                <li>
                  <h4>Hướng dẫn</h4>
                  <p>
                    Chúng tôi nằm gần các điểm giao thông chính, dễ dàng tìm
                    thấy trên bản đồ Google.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="contact__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8639306974364!2d105.74726179999999!3d21.038129799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1743357510750!5m2!1svi!2s"
                width="100%"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Contact Section End -->
  </ClientLayout>
</template>

<script setup>
import ClientLayout from '@/layouts/client/ClientLayout.vue'
// No script logic needed for static contact page
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
