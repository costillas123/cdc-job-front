<template>
  <footer class="custom-footer bg-dark py-5 position-relative">
    <BContainer>
      <BRow>
        <BCol lg="4" class="mt-4">
          <div>
            <div>
              <img
                src="@/assets/images/clark-light.png"
                alt="logo light"
                height="55"
              />
            </div>
            <div class="mt-4 fs-13">
              <p>Your Gateway to Smarter Hiring & Career Growth</p>
              <p>
                Clark Job Portal helps job seekers discover opportunities, track
                applications, and connect with top employers. Recruiters can
                post jobs, manage applicants, and hire faster with powerful
                recruitment tools.
              </p>

              <ul class="list-inline mb-0 footer-social-link">
                <li class="list-inline-item">
                  <BLink href="#" class="avatar-xs d-block">
                    <div class="avatar-title rounded-circle">
                      <i class="ri-facebook-fill"></i>
                    </div>
                  </BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#" class="avatar-xs d-block">
                    <div class="avatar-title rounded-circle">
                      <i class="ri-github-fill"></i>
                    </div>
                  </BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#" class="avatar-xs d-block">
                    <div class="avatar-title rounded-circle">
                      <i class="ri-linkedin-fill"></i>
                    </div>
                  </BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#" class="avatar-xs d-block">
                    <div class="avatar-title rounded-circle">
                      <i class="ri-google-fill"></i>
                    </div>
                  </BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#" class="avatar-xs d-block">
                    <div class="avatar-title rounded-circle">
                      <i class="ri-dribbble-line"></i>
                    </div>
                  </BLink>
                </li>
              </ul>
            </div>
          </div>
        </BCol>

        <BCol lg="7" class="ms-lg-auto">
          <BRow>
            <BCol sm="4" class="mt-4">
              <h5 class="text-white mb-0">Company</h5>
              <div class="text-muted mt-3">
                <ul class="list-unstyled ff-secondary footer-list">
                  <li>
                    <router-link to="/pages/profile">About Us</router-link>
                  </li>
                  <li>
                    <router-link to="#">Gallery</router-link>
                  </li>
                  <li>
                    <router-link to="/pages/team">Team</router-link>
                  </li>
                  <li>
                    <router-link to="/pages/timeline">Timeline</router-link>
                  </li>
                </ul>
              </div>
            </BCol>
            <BCol sm="4" class="mt-4">
              <h5 class="text-white mb-0">For Jobs</h5>
              <div class="text-muted mt-3">
                <ul class="list-unstyled ff-secondary footer-list">
                  <li>
                    <router-link to="/jobs/lists">Job List</router-link>
                  </li>
                  <li>
                    <router-link to="/jobs/application"
                      >application</router-link
                    >
                  </li>
                  <li>
                    <router-link to="/jobs/new">New Job</router-link>
                  </li>
                  <li>
                    <router-link to="/jobs/companies-list"
                      >Company List</router-link
                    >
                  </li>
                </ul>
              </div>
            </BCol>
            <BCol sm="4" class="mt-4">
              <h5 class="text-white mb-0">Support</h5>
              <div class="text-muted mt-3">
                <ul class="list-unstyled ff-secondary footer-list">
                  <li>
                    <router-link to="/pages/faqs">FAQ</router-link>
                  </li>
                  <li>
                    <router-link to="/pages/faqs">Contact</router-link>
                  </li>
                </ul>
              </div>
            </BCol>
          </BRow>
        </BCol>
      </BRow>

      <BRow class="text-center text-sm-start align-items-center mt-5">
        <BCol sm="6">
          <div>
            <p class="copy-rights mb-0">
              {{ new Date().getFullYear() }} © Clark Job Portal
            </p>
          </div>
        </BCol>
        <BCol sm="6">
          <div class="text-sm-end mt-3 mt-sm-0">
            <ul class="list-inline mb-0 footer-list gap-4 fs-13">
              <li class="list-inline-item">
                <router-link to="/pages/privacy-policy"
                  >Privacy Policy</router-link
                >
              </li>
              <li class="list-inline-item">
                <router-link to="/pages/term-conditions"
                  >Terms & Conditions</router-link
                >
              </li>
              <li class="list-inline-item">
                <router-link to="/pages/privacy-policy">Security</router-link>
              </li>
            </ul>
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </footer>
</template>
