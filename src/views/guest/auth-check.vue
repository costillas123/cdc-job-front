<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const type = route.params.type;

const messages = {
  success: {
    title: "Email Verified Successfully!",
    message:
      "Your email has been successfully verified. You can now log in to your account and start exploring job opportunities.",
    icon: "ri-checkbox-circle-fill",
    color: "text-success",
    bgColor: "bg-light-success",
    buttonText: "Proceed to Login",
    buttonVariant: "success",
  },
  "already-verified": {
    title: "Email Already Verified",
    message:
      "Your email address was already verified. You can log in to your account directly.",
    icon: "ri-information-fill",
    color: "text-info",
    bgColor: "bg-light-info",
    buttonText: "Go to Login",
    buttonVariant: "info",
  },
  invalid: {
    title: "Verification Failed",
    message:
      "The verification link is invalid or has expired. Please request a new verification email from your account settings.",
    icon: "ri-error-warning-fill",
    color: "text-danger",
    bgColor: "bg-light-danger",
    buttonText: "Request New Verification",
    buttonVariant: "danger",
  },
};

const info = messages[type] || messages.invalid;
</script>

<template>
  <div class="auth-page-wrapper pt-5">
    <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
      <div class="bg-overlay"></div>

      <div class="shape">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 120"
        >
          <path
            d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"
          ></path>
        </svg>
      </div>
    </div>

    <div class="auth-page-content">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center mt-sm-5 mb-4 text-white-50">
              <div>
                <router-link to="/" class="d-inline-block auth-logo">
                  <img
                    src="@/assets/images/clark-light.png"
                    alt="CDC Job Portal"
                    height="55"
                  />
                </router-link>
              </div>
              <p class="mt-3 fs-15 fw-medium">
                Career Development Center Job Portal
              </p>
            </div>
          </BCol>
        </BRow>

        <BRow class="justify-content-center">
          <BCol md="8" lg="6" xl="5">
            <BCard no-body class="mt-4 card-animate">
              <BCardBody class="p-4 text-center">
                <!-- Dynamic Icon -->
                <div class="avatar-lg mx-auto mt-2">
                  <div
                    :class="`avatar-title ${info.bgColor} ${info.color} display-3 rounded-circle`"
                  >
                    <i :class="info.icon"></i>
                  </div>
                </div>

                <!-- Dynamic Content -->
                <div class="mt-4 pt-2">
                  <h3 :class="`${info.color} mb-3`">{{ info.title }}</h3>
                  <p class="text-muted mx-4 mb-4 fs-16">
                    {{ info.message }}
                  </p>

                  <!-- Additional Info Based on Type -->
                  <div
                    v-if="type === 'success'"
                    class="alert alert-success mt-3"
                    role="alert"
                  >
                    <i class="ri-shield-check-fill me-2"></i>
                    Your account is now fully activated!
                  </div>

                  <div
                    v-if="type === 'invalid'"
                    class="alert alert-warning mt-3"
                    role="alert"
                  >
                    <i class="ri-time-line me-2"></i>
                    Verification links expire after 24 hours
                  </div>

                  <!-- Action Buttons -->
                  <div class="mt-4">
                    <BButton
                      :variant="info.buttonVariant"
                      class="w-100 py-2 fw-semibold"
                      v-if="type === 'success' || type === 'already-verified'"
                      @click="$router.push('/login')"
                    >
                      <i class="ri-login-box-line me-2"></i>
                      {{ info.buttonText }}
                    </BButton>

                    <div v-if="type === 'invalid'" class="d-grid gap-2">
                      <BButton
                        variant="primary"
                        class="py-2 fw-semibold"
                        @click="$router.push('/login')"
                      >
                        <i class="ri-login-box-line me-2"></i>
                        Go to Login
                      </BButton>
                      <BButton
                        variant="outline-secondary"
                        class="py-2"
                        @click="$router.push('/resend-verification')"
                      >
                        <i class="ri-mail-send-line me-2"></i>
                        Resend Verification Email
                      </BButton>
                    </div>
                  </div>
                </div>

                <!-- Quick Links -->
                <div class="mt-4 pt-3 border-top">
                  <p class="text-muted mb-0">
                    Need help?
                    <router-link to="/contact" class="text-primary fw-semibold"
                      >Contact Support</router-link
                    >
                  </p>
                </div>
              </BCardBody>
            </BCard>

            <!-- Stats Section -->
            <div class="text-center mt-4">
              <div class="d-flex justify-content-center gap-5">
                <div>
                  <h4 class="text-dark mb-1">1000+</h4>
                  <p class="text-dark-50 mb-0">Jobs Posted</p>
                </div>
                <div>
                  <h4 class="text-dark mb-1">5000+</h4>
                  <p class="text-dark-50 mb-0">Active Users</p>
                </div>
                <div>
                  <h4 class="text-dark mb-1">95%</h4>
                  <p class="text-dark-50 mb-0">Success Rate</p>
                </div>
              </div>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <footer class="footer start-0 end-0">
      <BContainer>
        <BRow>
          <BCol lg="12">
            <div class="text-center">
              <p class="mb-0 text-muted">
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

<style scoped>
.card-animate {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-animate:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.avatar-title {
  transition: all 0.3s ease;
}

.bg-light-success {
  background-color: rgba(25, 135, 84, 0.1) !important;
}

.bg-light-info {
  background-color: rgba(13, 202, 240, 0.1) !important;
}

.bg-light-danger {
  background-color: rgba(220, 53, 69, 0.1) !important;
}

.fs-16 {
  font-size: 16px;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-page-content {
    padding: 0 15px;
  }

  .d-flex.justify-content-center.gap-5 {
    gap: 2rem !important;
  }

  .fs-16 {
    font-size: 14px;
  }
}
</style>
