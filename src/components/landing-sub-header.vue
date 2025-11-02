<template>
  <nav
    class="navbar navbar-expand-lg navbar-landing fixed-top job-navbar"
    id="navbar"
  >
    <BContainer fluid class="custom-container">
      <router-link class="navbar-brand py-0" to="/">
        <img
          src="@/assets/images/clark-dark.png"
          class="card-logo card-logo-dark"
          alt="logo dark"
          height="38"
        />
        <img
          src="@/assets/images/clark-dark.png"
          class="card-logo card-logo-light"
          alt="logo light"
          height="38"
        />
      </router-link>
      <BButton
        class="navbar-toggler py-0 fs-20 text-body"
        type="button"
        v-b-toggle.navbarSupportedContent
      >
        <i class="mdi mdi-menu"></i>
      </BButton>

      <BCollapse class="navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mt-2 mt-lg-0" id="navbar-example">
          <li class="nav-item">
            <BLink class="nav-link d-flex align-items-center" to="/">
              <i class="ri-home-4-line me-2 fs-5 text-primary"></i>
              Home
            </BLink>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link d-flex align-items-center text-success"
              to="/register"
            >
              <i class="ri-user-add-line me-2 fs-5"></i>
              Join Now!
            </router-link>
          </li>
        </ul>

        <div>
          <button @click="$router.back()" class="btn btn-soft-primary">
            <i class="ri-arrow-left-line align-bottom me-1 fs-16"></i>
            Back
          </button>
        </div>
      </BCollapse>
    </BContainer>
  </nav>
</template>
