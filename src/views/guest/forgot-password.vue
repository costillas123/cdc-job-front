<template>
  <div
    class="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="bg-overlay"></div>

    <div class="auth-page-content overflow-hidden pt-lg-5">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <BCard no-body class="overflow-hidden">
              <BRow class="g-0">
                <!-- Left Slide Section -->
                <BCol lg="6">
                  <div class="p-lg-5 p-4 auth-one-bg h-100">
                    <div class="bg-overlay"></div>
                    <div class="position-relative h-100 d-flex flex-column">
                      <div class="mb-4">
                        <router-link to="/" class="d-block">
                          <img
                            src="@/assets/images/clark-light.png"
                            alt="logo"
                            height="55"
                          />
                        </router-link>
                      </div>
                      <div class="mt-auto">
                        <div class="mb-3">
                          <i
                            class="ri-double-quotes-l display-4 text-success"
                          ></i>
                        </div>

                        <Swiper
                          class="text-center text-white-50 pb-5"
                          :modules="modules"
                          :autoplay="{
                            delay: 3000,
                            disableOnInteraction: false,
                          }"
                          :loop="true"
                          :pagination="{
                            pagination,
                            clickable: true,
                            el: '.swiper-pagination',
                          }"
                        >
                          <SwiperSlide>
                            <p class="fs-15 fst-italic">
                              " Recover your account quickly and securely! "
                            </p>
                          </SwiperSlide>

                          <SwiperSlide>
                            <p class="fs-15 fst-italic">
                              " We will send you reset instructions via email. "
                            </p>
                          </SwiperSlide>

                          <SwiperSlide>
                            <p class="fs-15 fst-italic">
                              " Stay safe — keep your credentials private. "
                            </p>
                          </SwiperSlide>

                          <div class="swiper-pagination"></div>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </BCol>

                <!-- Right Form Section -->
                <BCol lg="6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary">Forgot Password?</h5>
                      <p class="text-muted">
                        Enter your email address to reset your password.
                      </p>
                    </div>

                    <div class="mt-4">
                      <form @submit.prevent="handleForgot">
                        <div class="mb-3">
                          <label class="form-label">Email Address</label>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="Enter email"
                            v-model="email"
                            :disabled="isLoading"
                          />
                        </div>

                        <div class="mt-4">
                          <BButton
                            variant="success"
                            class="btn btn-success btn-load w-100"
                            type="submit"
                            :disabled="isLoading"
                          >
                            <span
                              v-if="isLoading"
                              class="spinner-border flex-shrink-0 w-4 h-4"
                            ></span>
                            <span v-else>Send Reset Instructions</span>
                          </BButton>
                        </div>

                        <div class="mt-5 text-center">
                          <router-link to="/login" class="text-muted">
                            ← Back to Login
                          </router-link>
                        </div>
                      </form>
                    </div>
                  </div>
                </BCol>
              </BRow>
            </BCard>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <footer class="footer">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center">
              <p class="mb-0">
                &copy; {{ new Date().getFullYear() }} CDC Job Portal. Crafted
                with <i class="mdi mdi-heart text-danger"></i> by CDC I.T Team
              </p>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

const email = ref("");
const isLoading = ref(false);

const modules = [Autoplay, Navigation, Pagination];
const pagination = {
  clickable: true,
  el: ".swiper-pagination",
  renderBullet: (index, className) =>
    `<span class="${className}">${index + 1}</span>`,
};

import { forgotPassword } from "@/api-request";
import Loading from "@/helpers/Loading";
import Toast from "@/helpers/Toast";

const handleForgot = async () => {
  isLoading.value = true;
  Loading.show("Sending reset link...");

  try {
    const res = await forgotPassword(email.value);

    Loading.close();
    isLoading.value = false;

    email.value = "";

    Toast.fire({
      icon: "success",
      title: res.message ?? "Check your email!",
    });
  } catch (error) {
    Loading.close();
    isLoading.value = false;

    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Something went wrong.",
    });
  }
};
</script>
