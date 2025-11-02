<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<template>
  <div
    class="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100"
  >
    <div class="auth-page-content overflow-hidden p-0">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol xl="7" lg="8">
            <div class="text-center">
              <img
                src="@/assets/images/error400-cover.png"
                alt="error img"
                class="img-fluid"
              />
              <div class="mt-3">
                <h3 class="text-uppercase">Sorry, Page not Found 😭</h3>
                <p class="text-muted mb-4">
                  The page you are looking for not available!
                </p>

                <!-- Back Button -->
                <button @click="goBack" class="btn btn-success">
                  <i class="mdi mdi-home me-1"></i> Go Back
                </button>
              </div>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </div>
  </div>
</template>
