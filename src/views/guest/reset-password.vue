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
                    height="70"
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
              <BCardBody class="p-4">
                <div class="text-center mt-2">
                  <h3 class="text-primary">Reset Password</h3>
                  <p class="text-muted">Enter your new password below</p>
                </div>

                <div class="p-2 mt-4">
                  <!-- Email Display -->
                  <div v-if="email" class="alert alert-info text-center mb-4">
                    Resetting password for: <strong>{{ email }}</strong>
                  </div>

                  <BAlert v-model="showError" variant="danger" dismissible>
                    {{ error }}
                  </BAlert>

                  <BAlert v-model="showSuccess" variant="success" dismissible>
                    {{ success }}
                    <div class="mt-2">
                      <BLink to="/login" class="alert-link">Go to Login</BLink>
                    </div>
                  </BAlert>

                  <BForm @submit.prevent="handleResetPassword">
                    <!-- Password -->
                    <div class="mb-3">
                      <label class="form-label" for="password-input"
                        >Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          :type="togglePassword ? 'text' : 'password'"
                          class="form-control pe-5"
                          placeholder="Enter password"
                          id="password-input"
                          v-model="form.password"
                          :class="{ 'is-invalid': errors.password }"
                          required
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
                        <BFormInvalidFeedback>
                          {{ errors.password }}
                        </BFormInvalidFeedback>
                      </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="mb-3">
                      <label class="form-label" for="confirm-password-input"
                        >Confirm Password</label
                      >
                      <div class="position-relative auth-pass-inputgroup mb-3">
                        <input
                          :type="toggleConfirmPassword ? 'text' : 'password'"
                          class="form-control pe-5"
                          placeholder="Confirm password"
                          id="confirm-password-input"
                          v-model="form.password_confirmation"
                          :class="{
                            'is-invalid': errors.password_confirmation,
                          }"
                          required
                        />
                        <BButton
                          variant="link"
                          class="position-absolute end-0 top-0 text-decoration-none text-muted"
                          type="button"
                          id="confirm-password-addon"
                          @click="
                            toggleConfirmPassword = !toggleConfirmPassword
                          "
                        >
                          <i class="ri-eye-fill align-middle"></i>
                        </BButton>
                        <BFormInvalidFeedback>
                          {{ errors.password_confirmation }}
                        </BFormInvalidFeedback>
                      </div>
                    </div>

                    <!-- Password Requirements -->
                    <BCard no-body class="bg-light">
                      <BCardBody class="p-3">
                        <p class="mb-2">
                          <strong>Password Requirements:</strong>
                        </p>
                        <ul class="list-unstyled mb-0">
                          <li>
                            <i
                              class="ri-checkbox-circle-fill align-middle text-success"
                              v-if="form.password.length >= 8"
                            ></i>
                            <i
                              class="ri-close-circle-fill align-middle text-danger"
                              v-else
                            ></i>
                            At least 8 characters
                          </li>
                          <li>
                            <i
                              class="ri-checkbox-circle-fill align-middle text-success"
                              v-if="/[A-Z]/.test(form.password)"
                            ></i>
                            <i
                              class="ri-close-circle-fill align-middle text-danger"
                              v-else
                            ></i>
                            One uppercase letter
                          </li>
                          <li>
                            <i
                              class="ri-checkbox-circle-fill align-middle text-success"
                              v-if="/[a-z]/.test(form.password)"
                            ></i>
                            <i
                              class="ri-close-circle-fill align-middle text-danger"
                              v-else
                            ></i>
                            One lowercase letter
                          </li>
                          <li>
                            <i
                              class="ri-checkbox-circle-fill align-middle text-success"
                              v-if="/\d/.test(form.password)"
                            ></i>
                            <i
                              class="ri-close-circle-fill align-middle text-danger"
                              v-else
                            ></i>
                            One number
                          </li>
                          <li>
                            <i
                              class="ri-checkbox-circle-fill align-middle text-success"
                              v-if="
                                form.password === form.password_confirmation &&
                                form.password_confirmation.length > 0
                              "
                            ></i>
                            <i
                              class="ri-close-circle-fill align-middle text-danger"
                              v-else
                            ></i>
                            Passwords match
                          </li>
                        </ul>
                      </BCardBody>
                    </BCard>

                    <!-- Submit Button -->
                    <div class="mt-4">
                      <BButton
                        variant="primary"
                        class="w-100 py-2 fw-semibold"
                        type="submit"
                        :disabled="loading"
                      >
                        <BSpinner small v-if="loading" class="me-2" />
                        <i class="ri-lock-reset-line me-2" v-if="!loading"></i>
                        {{
                          loading ? "Resetting Password..." : "Reset Password"
                        }}
                      </BButton>
                    </div>

                    <!-- Back to Login -->
                    <div class="mt-4 text-center border-top pt-3">
                      <p class="text-muted mb-0">
                        Remember your password?
                        <BLink
                          to="/login"
                          class="fw-semibold text-primary text-decoration-none"
                        >
                          Login here
                        </BLink>
                      </p>
                    </div>
                  </BForm>
                </div>
              </BCardBody>
            </BCard>
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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { resetPassword } from "@/api-request";

const route = useRoute();

// Refs
const togglePassword = ref(false);
const toggleConfirmPassword = ref(false);
const loading = ref(false);

const form = ref({
  token: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref({});
const error = ref("");
const success = ref("");

// Computed properties
const email = computed(() => route.query.email || "");
const showError = computed(() => !!error.value);
const showSuccess = computed(() => !!success.value);

// Methods
const handleResetPassword = async () => {
  loading.value = true;
  errors.value = {};
  error.value = "";
  success.value = "";

  try {
    const response = await resetPassword(form.value);

    success.value = response.message;

    // Clear form
    form.value.password = "";
    form.value.password_confirmation = "";
  } catch (err) {
    if (err.response?.status === 422) {
      errors.value = err.response.data.errors || {};
      error.value = "Please fix the validation errors above.";
    } else if (err.response?.status === 400) {
      error.value =
        err.response.data.message || "Invalid or expired reset token.";
    } else {
      error.value =
        err.response?.data?.message ||
        "An error occurred while resetting your password. Please try again.";
    }
  } finally {
    loading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  // Get token and email from URL parameters
  form.value.token = route.query.token || "";
  form.value.email = route.query.email || "";

  if (!form.value.token || !form.value.email) {
    error.value =
      "Invalid reset link. Please make sure you copied the complete link from your email.";
  }
});
</script>

<style scoped>
.card-animate {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-animate:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.auth-pass-inputgroup {
  position: relative;
}

.auth-pass-inputgroup .form-control {
  padding-right: 45px;
}

.auth-pass-inputgroup .btn {
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background: none;
  padding: 0.75rem;
}

.list-unstyled li {
  margin-bottom: 0.25rem;
}

.list-unstyled .ri {
  margin-right: 0.5rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-page-content {
    padding: 0 15px;
  }

  .d-flex.justify-content-center.gap-5 {
    gap: 2rem !important;
  }
}
</style>
