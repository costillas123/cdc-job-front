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
                <!-- Left side -->
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
                              "Welcome back! Log in to access job
                              recommendations tailored just for you."
                            </p>
                          </SwiperSlide>

                          <SwiperSlide>
                            <p class="fs-15 fst-italic">
                              "Upload your resume, track applications, and
                              connect with top employers."
                            </p>
                          </SwiperSlide>

                          <SwiperSlide>
                            <p class="fs-15 fst-italic">
                              "New opportunities are posted daily — don’t miss
                              your next career move!"
                            </p>
                          </SwiperSlide>

                          <!-- Swiper pagination element -->
                          <div class="swiper-pagination"></div>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </BCol>

                <!-- Right side -->
                <BCol lg="6">
                  <div class="p-lg-5 p-4">
                    <div>
                      <h5 class="text-primary">Welcome Back !</h5>
                      <p class="text-muted">
                        Sign in to continue to job portal.
                      </p>
                    </div>

                    <div class="mt-4">
                      <form @submit.prevent="handleLogin">
                        <div class="mb-3">
                          <label for="username" class="form-label"
                            >Email Address</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="username"
                            placeholder="Enter email address"
                            v-model="userData.email"
                          />
                        </div>

                        <div class="mb-3">
                          <label class="form-label" for="password-input"
                            >Password</label
                          >
                          <div
                            class="position-relative auth-pass-inputgroup mb-3"
                          >
                            <input
                              :type="togglePassword ? 'text' : 'password'"
                              class="form-control pe-5"
                              placeholder="Enter password"
                              id="password-input"
                              v-model="userData.password"
                            />
                            <BButton
                              variant="link"
                              class="position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              @click="togglePassword = !togglePassword"
                            >
                              <i class="ri-eye-fill align-middle"></i>
                            </BButton>
                          </div>
                        </div>

                        <div
                          class="d-flex justify-content-between align-items-center mb-3"
                        >
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="auth-remember-check"
                            />
                            <label
                              class="form-check-label"
                              for="auth-remember-check"
                            >
                              Remember me
                            </label>
                          </div>

                          <router-link to="/forgot-password" class="text-muted">
                            Forgot password?
                          </router-link>
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
                            <span v-else>Sign in</span>
                          </BButton>
                        </div>

                        <div class="mt-4 text-center">
                          <div class="signin-other-title">
                            <h5 class="fs-13 mb-4 title">Or</h5>
                          </div>
                          <div>
                            <router-link
                              variant="secondary"
                              class="btn btn-secondary ms-1"
                              to="/"
                            >
                              <i class="ri-global-line me-1"></i> Home
                            </router-link>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div class="mt-5 text-center">
                      <p class="mb-0">
                        Don't have an account ?
                        <router-link
                          to="/register"
                          class="fw-semibold text-primary text-decoration-underline"
                        >
                          Signup
                        </router-link>
                      </p>
                    </div>
                  </div>
                </BCol>
              </BRow>
            </BCard>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <!-- Testing Accounts Modal -->
    <BModal
      v-model="showTestingAccounts"
      title="Testing Accounts"
      size="lg"
      centered
      hide-footer
      class="v-modal-custom"
    >
      <div class="table-responsive">
        <BTable
          bordered
          hover
          :items="testingAccounts"
          :fields="fields"
          class="align-middle"
        >
          <template #cell(password)="data">
            <code>{{ data.item.password }}</code>
          </template>
          <template #cell(actions)="data">
            <BButton
              size="sm"
              variant="primary"
              @click="copyCredentials(data.item)"
            >
              <i class="ri-file-copy-2-line me-1"></i> Use
            </BButton>
          </template>
        </BTable>
      </div>
    </BModal>

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
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useStore } from "vuex";

import { login } from "@/api-request";
import Loading from "@/helpers/Loading";
import Toast from "@/helpers/Toast";

// Swiper CSS
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

// router
const store = useStore();
const router = useRouter();

// states
const togglePassword = ref(false);
const isLoading = ref(false);

const userData = reactive({
  email: "",
  password: "",
});

// swiper config
const modules = [Autoplay, Navigation, Pagination];
const pagination = {
  clickable: true,
  el: ".swiper-pagination",
  renderBullet: (index, className) =>
    `<span class="${className}">${index + 1}</span>`,
};

const handleLogin = async () => {
  Loading.show("Logging in...");
  try {
    const response = await login(userData);

    store.commit("auth/setUser", {
      token: response.access_token,
      user: response.user,
    });

    Loading.close();
    Toast.fire({
      icon: "success",
      title: "Login successful! Redirecting...",
    });

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  } catch (error) {
    Loading.close();
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Login failed.",
    });
  }
};

const showTestingAccounts = ref(true); // 👈 Show modal on first load

// Table fields
const fields = [
  { key: "user_type", label: "Role", sortable: true },
  { key: "email", label: "Email", sortable: true },
  { key: "password", label: "Password" },
  { key: "actions", label: "Actions", class: "text-center" },
];

// Test accounts data (matches your seeder)
const testingAccounts = ref([
  { user_type: "Admin", email: "admin@test.com", password: "password123" },
  {
    user_type: "Secretariat",
    email: "secretariat@test.com",
    password: "password123",
  },
  {
    user_type: "Employer",
    email: "employer@test.com",
    password: "password123",
  },
  {
    user_type: "Job Seeker",
    email: "jobseeker@test.com",
    password: "password123",
  },
  {
    user_type: "PESO School",
    email: "pesoschool@test.com",
    password: "password123",
  },
  {
    user_type: "Manpower Agency",
    email: "manpower@test.com",
    password: "password123",
  },
]);

// Copy function
const copyCredentials = (account) => {
  const text = `Email: ${account.email}\nPassword: ${account.password}`;
  navigator.clipboard.writeText(text);

  userData.email = account.email;
  userData.password = account.password;

  showTestingAccounts.value = false;
};
</script>

<style scoped>
.my-swiper {
  width: 100%;
  height: 250px;
}
</style>
