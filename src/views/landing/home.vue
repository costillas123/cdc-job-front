<template>
  <div class="layout-wrapper landing">
    <!-- navbar -->
    <nav
      class="navbar navbar-expand-lg navbar-landing fixed-top job-navbar"
      id="navbar"
    >
      <BContainer fluid class="custom-container">
        <router-link class="navbar-brand py-0" to="/">
          <img
            src="@/assets/images/clark-dark.png"
            class="card-logo card-logo-dark p-0"
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
              <BLink
                class="nav-link d-flex align-items-center"
                href="#hero"
                @click.prevent="scrollToSection('hero')"
              >
                <i class="ri-home-4-line me-2 fs-5 text-primary"></i>
                Home
              </BLink>
            </li>

            <li class="nav-item">
              <BLink
                class="nav-link d-flex align-items-center"
                href="#process"
                @click.prevent="scrollToSection('jobs')"
              >
                <i class="ri-briefcase-line me-2 fs-5 text-primary"></i>
                Jobs
              </BLink>
            </li>

            <li class="nav-item">
              <BLink
                class="nav-link d-flex align-items-center"
                href="#categories"
                @click.prevent="scrollToSection('categories')"
              >
                <i class="ri-grid-line me-2 fs-5 text-primary"></i>
                Categories
              </BLink>
            </li>

            <li class="nav-item">
              <BLink
                class="nav-link d-flex align-items-center"
                href="#contact"
                @click.prevent="scrollToSection('contact')"
              >
                <i class="ri-phone-line me-2 fs-5 text-primary"></i>
                Contact
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
            <template v-if="currentToken">
              <router-link to="/dashboard" class="btn btn-soft-primary">
                <i class="ri-home-4-line align-bottom me-1 fs-16"></i>
                Dashboard
              </router-link>
            </template>

            <template v-else>
              <router-link to="/login" class="btn btn-soft-primary">
                <i class="ri-user-3-line align-bottom me-1"></i>
                Login & Register
              </router-link>
            </template>
          </div>
        </BCollapse>
      </BContainer>
    </nav>

    <section class="section job-hero-section bg-light pb-0" id="hero">
      <BContainer>
        <BRow class="justify-content-between align-items-center">
          <BCol lg="6">
            <div>
              <h1 class="display-6 fw-semibold text-capitalize mb-3 lh-base">
                Find your next job and build your dream here
              </h1>
              <p class="lead text-muted lh-base mb-4">
                Find jobs, create trackable resumes and enrich your
                applications. Carefully crafted after analyzing the needs of
                different industries.
              </p>
              <form action="#" class="job-panel-filter">
                <BRow class="g-md-0 g-2">
                  <BCol md="4">
                    <div>
                      <input
                        type="search"
                        id="job-title"
                        class="form-control filter-input-box"
                        placeholder="Job, Company name..."
                      />
                    </div>
                  </BCol>
                  <BCol md="4">
                    <div>
                      <select class="form-control" data-choices>
                        <option value="">Select job type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </BCol>
                  <BCol md="4">
                    <div class="h-100">
                      <BButton
                        variant="primary"
                        class="submit-btn w-100 h-100"
                        type="submit"
                        ><i class="ri-search-2-line align-bottom me-1"></i> Find
                        Job</BButton
                      >
                    </div>
                  </BCol>
                </BRow>
              </form>

              <ul class="treding-keywords list-inline mb-0 mt-3 fs-13">
                <li class="list-inline-item text-danger fw-semibold">
                  <i class="mdi mdi-tag-multiple-outline align-middle"></i>
                  Trending Keywords:
                </li>
                <li class="list-inline-item">
                  <BLink href="#">Design,</BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#">Development,</BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#">Manager,</BLink>
                </li>
                <li class="list-inline-item">
                  <BLink href="#">Senior</BLink>
                </li>
              </ul>
            </div>
          </BCol>
          <BCol lg="4">
            <div class="position-relative home-img text-center mt-5 mt-lg-0">
              <BCard no-body class="p-3 rounded shadow-lg inquiry-box">
                <div class="d-flex align-items-center">
                  <div class="avatar-sm flex-shrink-0 me-3">
                    <div
                      class="avatar-title bg-warning-subtle text-warning rounded fs-18"
                    >
                      <i class="ri-mail-send-line"></i>
                    </div>
                  </div>
                  <h5 class="fs-15 lh-base mb-0">
                    Work Inquiry from Clark Job Portal
                  </h5>
                </div>
              </BCard>

              <BCard no-body class="p-3 rounded shadow-lg application-box">
                <h5 class="fs-15 lh-base mb-3">Applications</h5>
                <div class="avatar-group">
                  <BLink
                    href="#"
                    class="avatar-group-item"
                    v-b-tooltip.hover
                    title="Ellen Smith"
                  >
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-info">J</div>
                    </div>
                  </BLink>
                  <BLink
                    href="#"
                    class="avatar-group-item"
                    v-b-tooltip.hover
                    title="Ellen Smith"
                  >
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-danger">S</div>
                    </div>
                  </BLink>
                  <BLink href="#" class="avatar-group-item">
                    <div class="avatar-xs">
                      <div class="avatar-title rounded-circle bg-success">
                        Z
                      </div>
                    </div>
                  </BLink>
                  <BLink
                    href="#"
                    class="avatar-group-item"
                    v-b-tooltip.hover
                    title="More Appliances"
                  >
                    <div class="avatar-xs">
                      <div
                        class="avatar-title fs-13 rounded-circle bg-light border-dashed border text-primary"
                      >
                        2k+
                      </div>
                    </div>
                  </BLink>
                </div>
              </BCard>
              <img src="@/assets/images/test001.png" alt="" class="user-img" />

              <div class="circle-effect">
                <div class="circle"></div>
                <div class="circle2"></div>
                <div class="circle3"></div>
                <div class="circle4"></div>
              </div>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <section class="section" id="process">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="8">
            <div class="text-center mb-5">
              <h1 class="mb-3 ff-secondary fw-semibold lh-base">
                How <span class="text-primary">it's work</span> creative jobs &
                quickly features
              </h1>
              <p class="text-muted">
                A creative person has the ability to invent and develop original
                ideas, especially in the arts. Like so many creative people, he
                was never satisfied.
              </p>
            </div>
          </BCol>
        </BRow>
        <BRow>
          <BCol lg="3" md="6">
            <BCard no-body class="shadow-lg">
              <BCardBody class="p-4">
                <h1
                  class="fw-bold display-5 ff-secondary mb-4 text-success position-relative"
                >
                  <div class="job-icon-effect"></div>
                  <span>1</span>
                </h1>
                <h6 class="fs-17 mb-2">Register Account</h6>
                <p class="text-muted mb-0 fs-15">
                  First, You need to make a account.
                </p>
              </BCardBody>
            </BCard>
          </BCol>
          <BCol lg="3" md="6">
            <BCard no-body class="shadow-none">
              <BCardBody class="p-4">
                <h1
                  class="fw-bold display-5 ff-secondary mb-4 text-success position-relative"
                >
                  <div class="job-icon-effect"></div>
                  <span>2</span>
                </h1>
                <h6 class="fs-17 mb-2">Create Resume</h6>
                <p class="text-muted mb-0 fs-15">
                  Create a resume for your job.
                </p>
              </BCardBody>
            </BCard>
          </BCol>
          <BCol lg="3" md="6">
            <BCard no-body class="shadow-none">
              <BCardBody class="p-4">
                <h1
                  class="fw-bold display-5 ff-secondary mb-4 text-success position-relative"
                >
                  <div class="job-icon-effect"></div>
                  <span>3</span>
                </h1>

                <h6 class="fs-17 mb-2">Find Job</h6>
                <p class="text-muted mb-0 fs-15">
                  Search for your dream jobs from job portal.
                </p>
              </BCardBody>
            </BCard>
          </BCol>
          <BCol lg="3" md="6">
            <BCard no-body class="shadow-none">
              <BCardBody class="p-4">
                <h1
                  class="fw-bold display-5 ff-secondary mb-4 text-success position-relative"
                >
                  <div class="job-icon-effect"></div>
                  <span>4</span>
                </h1>
                <h6 class="fs-17 mb-2">Apply Job</h6>
                <p class="text-muted mb-0 fs-15">
                  Apply to the company and wait for interview.
                </p>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <section class="section bg-light">
      <BContainer>
        <BRow
          class="align-items-center justify-content-lg-between justify-content-center gy-4"
        >
          <BCol lg="5" sm="7">
            <img
              src="@/assets/images/sitting-girl-with-laptop.png"
              alt=""
              class="img-fluid mx-auto rounded-3"
            />
          </BCol>
          <BCol lg="6">
            <div class="text-muted">
              <h1 class="mb-3 lh-base">
                Find Your <span class="text-primary">Dream Job</span> in One
                Place
              </h1>
              <p class="ff-secondary fs-16 mb-2">
                The first step in finding your <b>dream job </b> is deciding
                where to look for first-hand insight. Contact professionals who
                are already working in industries or positions that interest
                you.
              </p>
              <p class="ff-secondary fs-16">
                Schedule informational interviews and phone calls or ask for the
                opportunity to shadow them on the job.
              </p>

              <div class="vstack gap-2 mb-4 pb-1">
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <div class="avatar-xs icon-effect">
                      <div
                        class="avatar-title bg-transparent text-success rounded-circle h2"
                      >
                        <i class="ri-check-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <p class="mb-0">Dynamic Content</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <div class="avatar-xs icon-effect">
                      <div
                        class="avatar-title bg-transparent text-success rounded-circle h2"
                      >
                        <i class="ri-check-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <p class="mb-0">Setup plugin's information.</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="flex-shrink-0 me-2">
                    <div class="avatar-xs icon-effect">
                      <div
                        class="avatar-title bg-transparent text-success rounded-circle h2"
                      >
                        <i class="ri-check-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <p class="mb-0">Themes customization information</p>
                  </div>
                </div>
              </div>

              <div>
                <router-link to="/view-vacancies" class="btn btn-primary">
                  Find Your Jobs
                  <i class="ri-arrow-right-line align-bottom ms-1"></i>
                </router-link>
              </div>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <!-- Jobs -->
    <section class="section" id="jobs">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="7">
            <div class="text-center mb-5">
              <h1 class="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                Find Your <span class="text-primary">Career</span> You Deserve
                it
              </h1>
              <p class="text-muted">
                Post a job to tell us about your project. We'll quickly match
                you with the right freelancers.
              </p>
            </div>
          </BCol>
        </BRow>

        <BRow>
          <BCol v-for="job in jobs" :key="job.id" lg="6" class="mb-4">
            <BCard no-body class="shadow-lg rounded-2 hover-shadow transition">
              <BCardBody>
                <!-- 🧑‍💼 Header: Company + Rating -->
                <div
                  class="d-flex justify-content-between align-items-start flex-wrap"
                >
                  <!-- Left: Company Info -->
                  <div class="d-flex align-items-start flex-grow-1 min-w-0">
                    <!-- Avatar -->
                    <div class="avatar-sm flex-shrink-0">
                      <div
                        class="avatar-title bg-light rounded-circle d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
                      >
                        <img
                          :src="
                            job.company?.avatar
                              ? `${storageBaseUrl()}/${job.company.avatar}`
                              : require('@/assets/images/task.png')
                          "
                          alt="Company Logo"
                          class="img-fluid"
                          style="width: 32px; height: 32px"
                        />
                      </div>
                    </div>

                    <!-- Job Details -->
                    <div class="ms-3 text-truncate">
                      <router-link
                        :to="`/view-job-details/${job.code}`"
                        class="text-decoration-none"
                      >
                        <h5
                          class="mb-1 fw-semibold text-dark hover-primary text-truncate"
                        >
                          {{ job.title }}
                        </h5>
                      </router-link>

                      <!-- Meta Info -->
                      <ul class="list-unstyled text-muted mb-1 small lh-sm">
                        <li class="d-flex align-items-center text-truncate">
                          <i
                            class="ri-building-line align-bottom me-1 text-primary"
                          ></i>
                          {{ job.company?.name || "Unknown Company" }}
                        </li>
                        <li class="d-flex align-items-center text-truncate">
                          <i
                            class="ri-map-pin-2-line align-bottom me-1 text-danger"
                          ></i>
                          {{ job.job_location || "Location not specified" }}
                        </li>
                        <li class="d-flex align-items-center text-truncate">
                          <i
                            class="ri-money-dollar-circle-line align-bottom me-1 text-success"
                          ></i>
                          {{ job.salary || "Negotiable" }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Right: Rating + Views -->
                  <div class="text-end small text-muted mt-2 mt-md-0 ms-3">
                    <div
                      class="d-flex align-items-center justify-content-end mb-1"
                    >
                      <i class="ri-star-fill text-warning me-1"></i>
                      <span class="fw-semibold">{{ job.average_rate }}</span>
                      <span class="ms-1">/ 5</span>
                    </div>
                    <div class="d-flex align-items-center justify-content-end">
                      <i class="ri-eye-line me-1"></i>
                      <span>{{ job.views }} views</span>
                    </div>
                  </div>
                </div>

                <!-- 🏷️ Tags -->
                <div class="d-flex flex-wrap gap-2 mt-3">
                  <BBadge
                    v-if="job.category"
                    variant="success-subtle"
                    class="bg-success-subtle text-success fw-medium px-2 py-1 rounded-pill"
                  >
                    {{ job.category }}
                  </BBadge>

                  <BBadge
                    v-for="(sub, i) in job.sub_categories"
                    :key="i"
                    variant="primary-subtle"
                    class="bg-primary-subtle text-primary fw-medium px-2 py-1 rounded-pill"
                  >
                    {{ sub }}
                  </BBadge>
                </div>

                <!-- 🕒 Footer -->
                <div
                  class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top"
                >
                  <small class="text-muted">
                    <i class="ri-time-line align-bottom me-1"></i>
                    Apply before {{ formatShortDate(job.deadline) }}
                  </small>
                  <BButton
                    size="sm"
                    variant="outline-primary"
                    class="rounded-pill px-3 fw-semibold"
                    @click="showdetail(job)"
                  >
                    View Details
                  </BButton>
                </div>
              </BCardBody>
            </BCard>
          </BCol>

          <BCol lg="12">
            <div class="text-center mt-2">
              <router-link to="/view-vacancies" class="btn btn-primary"
                >View More Jobs<i
                  class="ri-arrow-right-line ms-1 align-bottom"
                ></i
              ></router-link>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <!-- Categories -->
    <section class="section bg-light" id="categories">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="7">
            <div class="text-center mb-5">
              <h1 class="mb-3 ff-secondary fw-semibold text-capitalize lh-base">
                High demand jobs
                <span class="text-primary">Categories</span> featured
              </h1>
              <p class="text-muted">
                Post a job to tell us about your project. We'll quickly match
                you with the right freelancers.
              </p>
            </div>
          </BCol>
        </BRow>

        <BRow class="justify-content-center">
          <BCol
            v-for="cat in categories"
            :key="cat.id"
            lg="3"
            md="6"
            class="mb-4"
          >
            <BCard no-body class="shadow-none text-center py-3">
              <BCardBody class="py-4">
                <div class="avatar-sm position-relative mb-4 mx-auto">
                  <div class="job-icon-effect"></div>
                  <div
                    class="avatar-title bg-transparent text-success rounded-circle"
                  >
                    <i :class="`${cat.icon} fs-1`"></i>
                  </div>
                </div>

                <router-link
                  :to="`/categories/${cat.slug}`"
                  class="stretched-link"
                >
                  <h5 class="fs-17 pt-1">{{ cat.name }}</h5>
                </router-link>

                <p class="mb-0 text-muted">
                  <count-to
                    :duration="1000"
                    :startVal="0"
                    :endVal="cat.job_vacancies_count"
                  />
                  Jobs
                </p>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <!-- Contact -->
    <section class="section" id="contact">
      <BContainer>
        <BRow class="justify-content-center">
          <BCol lg="8">
            <div class="text-center mb-5">
              <h3 class="mb-3 fw-semibold">Get In Touch</h3>
              <p class="text-muted mb-4 ff-secondary">
                We thrive when coming up with innovative ideas but also
                understand that a smart concept should be supported with
                faucibus sapien odio measurable results.
              </p>
            </div>
          </BCol>
        </BRow>

        <BRow class="gy-4">
          <BCol lg="4">
            <div>
              <div class="mt-4">
                <h5 class="fs-13 text-muted text-uppercase">
                  CSR, Jobs and Manpower Agency
                </h5>
                <div class="ff-secondary fw-semibold">
                  Email Address: <br />
                  csrpd@clark.com.ph
                </div>
              </div>
              <div class="mt-4">
                <h5 class="fs-13 text-muted text-uppercase">
                  Zoning Clearances:
                </h5>
                <div class="ff-secondary fw-semibold">
                  Tel. Nos.: (+6345) 499-2265 / <br />
                  499-8264 / 599-3855
                </div>
              </div>
              <div class="mt-4">
                <h5 class="fs-13 text-muted text-uppercase">Working Hours:</h5>
                <div class="ff-secondary fw-semibold">9:00am to 6:00pm</div>
              </div>
            </div>
          </BCol>

          <BCol lg="8">
            <div>
              <form @submit.prevent="handleSubmit">
                <BRow>
                  <BCol lg="6">
                    <div class="mb-4">
                      <label for="name" class="form-label fs-13">Name</label>
                      <input
                        name="name"
                        id="name"
                        type="text"
                        class="form-control bg-light"
                        placeholder="Your name*"
                        v-model="form.name"
                      />
                    </div>
                  </BCol>

                  <BCol lg="6">
                    <div class="mb-4">
                      <label for="email" class="form-label fs-13">Email</label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        class="form-control bg-light"
                        placeholder="Your email*"
                        v-model="form.email"
                      />
                    </div>
                  </BCol>
                </BRow>

                <BRow>
                  <BCol lg="12">
                    <div class="mb-4">
                      <label for="subject" class="form-label fs-13"
                        >Subject</label
                      >
                      <input
                        type="text"
                        class="form-control bg-light"
                        id="subject"
                        name="subject"
                        placeholder="Your Subject.."
                        v-model="form.subject"
                      />
                    </div>
                  </BCol>
                </BRow>

                <BRow>
                  <BCol lg="12">
                    <div class="mb-3">
                      <label for="comments" class="form-label fs-13"
                        >Message</label
                      >
                      <textarea
                        name="comments"
                        id="comments"
                        rows="3"
                        class="form-control bg-light"
                        placeholder="Your message..."
                        v-model="form.message"
                      ></textarea>
                    </div>
                  </BCol>
                </BRow>

                <BRow>
                  <BCol lg="12" class="text-end">
                    <button
                      type="submit"
                      class="submitBnt btn btn-primary"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? "Sending..." : "Send Message" }}
                    </button>
                  </BCol>
                </BRow>
              </form>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <section class="py-5 bg-primary position-relative">
      <div class="bg-overlay bg-overlay-pattern opacity-50"></div>
      <BContainer>
        <BRow class="align-items-center gy-4">
          <BCol sm="">
            <div>
              <h4 class="text-white fw-semibold">Get New Jobs Notification!</h4>
              <p class="text-white text-opacity-75 mb-0">
                Join & get all related jobs notification.
              </p>
            </div>
          </BCol>

          <BCol sm="auto">
            <BButton type="button" variant="danger" @click="joinNow"
              >Register Now <i class="ri-arrow-right-line align-bottom"></i
            ></BButton>
          </BCol>
        </BRow>
      </BContainer>
    </section>

    <!-- footer -->
    <Footer />

    <BButton
      variant="info"
      @click="topFunction"
      class="btn-icon"
      id="back-to-top"
    >
      <i class="ri-arrow-up-line"></i>
    </BButton>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import Footer from "@/components/landing-footer.vue";
import { CountTo } from "vue3-count-to";

import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { viewJobs, viewCategories, storeGetInTouch } from "@/api-request";

import { storageBaseUrl, formatShortDate } from "@/helpers/useFormats";
import Toast from "@/helpers/Toast";
import Loading from "@/helpers/Loading";

const router = useRouter();
const store = useStore();
const currentToken = computed(() => store.state.auth.token);

const jobs = ref([]);
const categories = ref([]);
const page = ref(1);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});
const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  Loading.show("Sending message...");

  try {
    const res = await storeGetInTouch(form.value);

    Loading.close();
    isSubmitting.value = false;
    Toast.fire({
      icon: "success",
      title: res.message || "Message sent! We'll reach out soon.",
    });

    // Reset form
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
  } catch (error) {
    Loading.close();
    isSubmitting.value = false;

    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Something went wrong!",
    });
  }
};

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

const showdetail = (job) => {
  router.push(`/view-job-details/${job.code}`);
};

const joinNow = () => {
  router.push("/register");
};

const fetchAllData = async () => {
  try {
    const [jobRes, categororyRes] = await Promise.all([
      viewJobs({
        page: page.value,
        per_page: 8,
      }),
      viewCategories(),
    ]);

    categories.value = categororyRes?.data || [];
    jobs.value = jobRes?.data?.items || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    Toast.fire({
      icon: "error",
      title: "Failed to load form options. Please refresh the page.",
    });
  }
};

onMounted(() => {
  fetchAllData();
  const backToTop = document.getElementById("back-to-top");

  // Show/hide Back-to-Top button
  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });
  }

  // Sticky navbar
  window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (
        document.body.scrollTop >= 50 ||
        document.documentElement.scrollTop >= 50
      ) {
        navbar.classList.add("is-sticky");
      } else {
        navbar.classList.remove("is-sticky");
      }
    }
  });
});
</script>
