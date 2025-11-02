<template>
  <Layout>
    <!-- Cover Photo Section -->
    <div class="profile-setting-img position-relative">
      <img
        :src="
          currentUser.cover_photo
            ? `${storageBaseUrl()}/${currentUser.cover_photo}`
            : coverDummy
        "
        class="profile-wid-img"
        alt="Cover photo"
      />
      <div class="overlay-content">
        <div class="text-end p-3">
          <BButton variant="light" size="sm" @click="openCoverModal">
            <i class="ri-image-edit-line align-bottom me-1"></i>
            {{ currentUser?.cover_photo ? "Change Cover" : "Add Cover" }}
          </BButton>
        </div>
      </div>
    </div>

    <BRow>
      <BCol xxl="3">
        <!-- profile avatar -->
        <BCard no-body class="mt-n5">
          <BCardBody class="p-4">
            <div class="text-center">
              <div
                class="profile-user position-relative d-inline-block mx-auto mb-4"
              >
                <img
                  :src="
                    currentUser.avatar
                      ? `${storageBaseUrl()}/${currentUser.avatar}`
                      : userDummy
                  "
                  class="rounded-circle avatar-xl img-thumbnail user-profile-image"
                  alt="user-profile-image"
                />
                <BButton
                  variant="light"
                  size="sm"
                  class="position-absolute bottom-0 end-0 rounded-circle p-0 avatar-xs"
                  @click="openAvatarModal"
                >
                  <i class="ri-camera-fill"></i>
                </BButton>
              </div>
              <h5 class="fs-16 mb-1">{{ currentUser?.name }}</h5>
              <p class="text-muted mb-0">{{ currentUser?.email }}</p>
            </div>
          </BCardBody>
        </BCard>

        <!-- status -->
        <BCard no-body>
          <BCardBody>
            <div class="d-flex align-items-center mb-5">
              <div class="flex-grow-1">
                <h5 class="card-title mb-0">Complete Your Profile</h5>
              </div>
              <div class="flex-shrink-0">
                <BLink
                  href="javascript:void(0);"
                  class="badge bg-light text-primary fs-12"
                  ><i class="ri-edit-box-line align-bottom me-1"></i>
                  Edit</BLink
                >
              </div>
            </div>

            <BProgress class="animated-progress custom-progress progress-label">
              <BProgressBar :value="100" variant="success">
                <div class="label">100%</div>
              </BProgressBar>
            </BProgress>
          </BCardBody>
        </BCard>
      </BCol>

      <BCol xxl="9">
        <BCard no-body class="mt-xxl-n5">
          <BCardBody class="p-4 pt-2">
            <BTabs nav-class="nav-tabs-custom rounded border-bottom-0">
              <!-- Personal Details -->
              <BTab class="nav-item" title="Personal Details" active>
                <form @submit.prevent="updatePersonalInfo">
                  <BRow class="pt-4">
                    <!-- User Information Section -->
                    <BCol lg="12">
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-user-line me-2"></i>Personal Information
                        </h6>
                        <BRow>
                          <!-- Full Name -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Full Name</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': errors.name }"
                                placeholder="Juan Dela Cruz"
                                v-model="formPersonal.name"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.name">
                                {{ errors.name }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Phone Number -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Phone Number</label
                              >
                              <input
                                type="tel"
                                class="form-control"
                                :class="{ 'is-invalid': errors.telephone }"
                                placeholder="+63 912 345 6789"
                                v-model="formPersonal.telephone"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.telephone">
                                {{ errors.telephone }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Email Address -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Email Address</label
                              >
                              <input
                                type="email"
                                class="form-control"
                                :class="{ 'is-invalid': errors.email }"
                                placeholder="juan.delacruz@example.com"
                                v-model="formPersonal.email"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.email">
                                {{ errors.email }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Address -->
                          <BCol lg="12">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Address</label
                              >
                              <textarea
                                class="form-control"
                                :class="{ 'is-invalid': errors.address }"
                                placeholder="Enter your complete address including city and province"
                                rows="2"
                                v-model="formPersonal.address"
                                :disabled="submitting"
                              ></textarea>
                              <BFormInvalidFeedback v-if="errors.address">
                                {{ errors.address }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Description / About -->
                          <BCol lg="12">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Description / About</label
                              >
                              <textarea
                                class="form-control"
                                :class="{ 'is-invalid': errors.bio }"
                                placeholder="Tell us about yourself, your experience, skills, and career goals..."
                                rows="10"
                                v-model="formPersonal.bio"
                                :disabled="submitting"
                              ></textarea>
                              <BFormInvalidFeedback v-if="errors.bio">
                                {{ errors.bio }}
                              </BFormInvalidFeedback>
                              <div class="form-text">
                                Briefly describe your professional background
                                and aspirations
                              </div>
                            </div>
                          </BCol>
                        </BRow>
                      </div>
                    </BCol>

                    <!-- Job Seeker Details Section -->
                    <BCol lg="12" v-if="userType === 'job_seeker'">
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-briefcase-line me-2"></i>Professional
                          Details
                        </h6>
                        <BRow>
                          <!-- Date of Birth -->
                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Date of Birth</label
                              >
                              <input
                                type="date"
                                class="form-control"
                                :class="{ 'is-invalid': errors.date_of_birth }"
                                v-model="formPersonal.date_of_birth"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.date_of_birth">
                                {{ errors.date_of_birth }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Gender -->
                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Gender</label
                              >
                              <select
                                class="form-select"
                                :class="{ 'is-invalid': errors.gender }"
                                v-model="formPersonal.gender"
                                :disabled="submitting"
                              >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer_not_to_say">
                                  Prefer not to say
                                </option>
                              </select>
                              <BFormInvalidFeedback v-if="errors.gender">
                                {{ errors.gender }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Education Level -->
                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Education Level</label
                              >
                              <select
                                class="form-select"
                                :class="{
                                  'is-invalid': errors.education_level,
                                }"
                                v-model="formPersonal.education_level"
                                :disabled="submitting"
                              >
                                <option value="">Select education level</option>
                                <option
                                  v-for="level in qualificationDetails"
                                  :key="level.id"
                                  :value="level.name"
                                >
                                  {{ level.name }}
                                </option>
                              </select>
                              <BFormInvalidFeedback
                                v-if="errors.education_level"
                              >
                                {{ errors.education_level }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Field of Study -->
                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Field of Study</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': errors.field_of_study }"
                                placeholder="e.g. Computer Science, Business Administration"
                                v-model="formPersonal.field_of_study"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback
                                v-if="errors.field_of_study"
                              >
                                {{ errors.field_of_study }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Years of Experience -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Years of Experience</label
                              >
                              <input
                                type="number"
                                class="form-control"
                                :class="{
                                  'is-invalid': errors.years_of_experience,
                                }"
                                placeholder="e.g. 5"
                                min="0"
                                max="50"
                                v-model="formPersonal.years_of_experience"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback
                                v-if="errors.years_of_experience"
                              >
                                {{ errors.years_of_experience }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Preferred Location -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Preferred Location</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                :class="{
                                  'is-invalid': errors.preferred_location,
                                }"
                                placeholder="e.g. Manila, Cebu, Remote, Hybrid"
                                v-model="formPersonal.preferred_location"
                                disabled
                              />
                              <BFormInvalidFeedback
                                v-if="errors.preferred_location"
                              >
                                {{ errors.preferred_location }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Expected Salary -->
                          <BCol lg="4">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Expected Salary (₱)</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                :class="{
                                  'is-invalid': errors.expected_salary,
                                }"
                                placeholder="e.g. 35,000 - 40,000"
                                v-model="formPersonal.expected_salary"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback
                                v-if="errors.expected_salary"
                              >
                                {{ errors.expected_salary }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Skills & Expertise -->
                          <BCol lg="12">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Skills & Expertise</label
                              >
                              <Multiselect
                                v-model="formPersonal.skills"
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :create-option="false"
                                :options="skillDetails"
                                :value-prop="'name'"
                                :track-by="'name'"
                                :label="'name'"
                                :class="{ 'is-invalid': errors.skills }"
                                placeholder="Select or type your skills (e.g. JavaScript, Project Management)"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.skills">
                                {{ errors.skills }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Services Interest -->
                          <BCol lg="12">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Services Interest</label
                              >
                              <Multiselect
                                v-model="formPersonal.services"
                                mode="tags"
                                :close-on-select="false"
                                :searchable="true"
                                :create-option="false"
                                :options="getSubCategoriesByCategory()"
                                :class="{ 'is-invalid': errors.services }"
                                placeholder="Select services you're interested in"
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback v-if="errors.services">
                                {{ errors.services }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>
                        </BRow>
                      </div>
                    </BCol>

                    <!-- Employer Details Section -->
                    <BCol lg="12" v-if="userType === 'employer'">
                      <div class="mb-4">
                        <h6 class="text-primary mb-3 border-bottom pb-2">
                          <i class="ri-building-2-line me-2"></i>Employer
                          Details
                        </h6>

                        <BRow>
                          <!-- Company Size -->
                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Company Size</label
                              >
                              <select
                                class="form-select"
                                v-model="formPersonal.company_size"
                                :disabled="submitting"
                              >
                                <option value="">Select company size</option>
                                <option value="1-10">1–10 employees</option>
                                <option value="11-50">11–50 employees</option>
                                <option value="51-200">51–200 employees</option>
                                <option value="201-500">
                                  201–500 employees
                                </option>
                                <option value="501-1000">
                                  501-1000 employees
                                </option>
                                <option value="1000+">1000+ employees</option>
                              </select>
                              <BFormInvalidFeedback v-if="errors.company_size">
                                {{ errors.company_size }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>

                          <!-- Industry -->
                          <BCol md="6" class="mb-3">
                            <label
                              for="industry"
                              class="form-label fw-semibold"
                            >
                              Industry
                            </label>
                            <select
                              id="industry"
                              class="form-select"
                              :class="{ 'is-invalid': errors.industry }"
                              v-model="formPersonal.industry"
                              disabled
                            >
                              <option value="">Select Industry</option>
                              <option
                                v-for="industry in industryDetails"
                                :key="industry.id"
                                :value="industry.name"
                              >
                                {{ industry.name }}
                              </option>
                            </select>
                            <BFormInvalidFeedback v-if="errors.industry">
                              {{ errors.industry }}
                            </BFormInvalidFeedback>
                          </BCol>

                          <BCol lg="6">
                            <div class="mb-3">
                              <label class="form-label fw-semibold"
                                >Locator Number</label
                              >
                              <input
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': errors.locator_number }"
                                v-model="formPersonal.locator_number"
                                :disabled="submitting"
                                placeholder="e.g. RMT33W"
                              />
                              <BFormInvalidFeedback
                                v-if="errors.locator_number"
                              >
                                {{ errors.locator_number }}
                              </BFormInvalidFeedback>
                            </div>
                          </BCol>
                        </BRow>
                      </div>
                    </BCol>

                    <!-- Social Media Section -->
                    <BCol lg="12">
                      <div class="mb-4">
                        <div
                          class="d-flex justify-content-between align-items-center mb-3"
                        >
                          <h6 class="text-primary mb-0">
                            <i class="ri-share-line me-2"></i>Social Media
                            Profiles
                          </h6>
                          <BButton
                            variant="outline-primary"
                            size="sm"
                            @click="addSocialMedia"
                            :disabled="submitting"
                          >
                            <i class="ri-add-line me-1"></i>Add Social Media
                          </BButton>
                        </div>

                        <div
                          v-for="(social, index) in formPersonal.social_media"
                          :key="index"
                          class="social-media-item mb-3"
                        >
                          <BRow class="g-2 align-items-end">
                            <BCol lg="5">
                              <label class="form-label fw-semibold"
                                >Platform Name</label
                              >
                              <select
                                class="form-select"
                                v-model="social.name"
                                :class="{
                                  'is-invalid':
                                    errors[`social_media.${index}.name`],
                                }"
                                :disabled="submitting"
                              >
                                <option value="">Select Platform</option>
                                <option value="facebook">Facebook</option>
                                <option value="linkedin">LinkedIn</option>
                                <option value="twitter">Twitter</option>
                                <option value="instagram">Instagram</option>
                                <option value="github">GitHub</option>
                                <option value="portfolio">Portfolio</option>
                                <option value="other">Other</option>
                              </select>
                              <BFormInvalidFeedback
                                v-if="errors[`social_media.${index}.name`]"
                              >
                                {{ errors[`social_media.${index}.name`] }}
                              </BFormInvalidFeedback>
                            </BCol>

                            <BCol lg="6">
                              <label class="form-label fw-semibold"
                                >Profile URL</label
                              >
                              <input
                                type="url"
                                class="form-control"
                                v-model="social.url"
                                :class="{
                                  'is-invalid':
                                    errors[`social_media.${index}.url`],
                                }"
                                placeholder="https://..."
                                :disabled="submitting"
                              />
                              <BFormInvalidFeedback
                                v-if="errors[`social_media.${index}.url`]"
                              >
                                {{ errors[`social_media.${index}.url`] }}
                              </BFormInvalidFeedback>
                            </BCol>

                            <BCol lg="1">
                              <BButton
                                variant="outline-danger"
                                @click="removeSocialMedia(index)"
                                :disabled="
                                  submitting ||
                                  formPersonal.social_media.length === 1
                                "
                              >
                                <i class="ri-delete-bin-line"></i>
                              </BButton>
                            </BCol>
                          </BRow>
                        </div>

                        <!-- Empty State -->
                        <div
                          v-if="formPersonal.social_media.length === 0"
                          class="text-center py-4 border rounded bg-light"
                        >
                          <i
                            class="ri-share-line fs-1 text-muted mb-2 d-block"
                          ></i>
                          <p class="text-muted mb-0">
                            No social media profiles added yet
                          </p>
                        </div>
                      </div>
                    </BCol>

                    <!-- Submit Buttons -->
                    <BCol lg="12">
                      <div
                        class="hstack gap-2 justify-content-end border-top pt-4"
                      >
                        <BButton
                          type="submit"
                          variant="primary"
                          :disabled="submitting"
                        >
                          <template v-if="submitting">
                            <span
                              class="spinner-border spinner-border-sm me-2"
                            ></span>
                            Updating...
                          </template>
                          <template v-else>
                            <i class="ri-save-line me-2"></i>
                            Update Profile
                          </template>
                        </BButton>

                        <BButton
                          type="button"
                          variant="outline-secondary"
                          :disabled="submitting"
                        >
                          Cancel
                        </BButton>
                      </div>
                    </BCol>
                  </BRow>
                </form>
              </BTab>

              <!-- Experience -->
              <BTab title="Experiences" v-if="userType === 'job_seeker'">
                <form @submit.prevent="saveExperiences">
                  <div
                    v-for="(exp, index) in experiences"
                    :key="index"
                    class="pt-4 border-bottom pb-3"
                  >
                    <BRow>
                      <!-- Job Title -->
                      <BCol lg="12">
                        <div class="mb-3">
                          <label class="form-label"
                            >Job Title <span class="text-danger">*</span></label
                          >
                          <input
                            type="text"
                            v-model="exp.job_title"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                errors[`experiences.${index}.job_title`],
                            }"
                            placeholder="Enter job title"
                          />
                          <BFormInvalidFeedback
                            v-if="errors[`experiences.${index}.job_title`]"
                          >
                            {{ errors[`experiences.${index}.job_title`] }}
                          </BFormInvalidFeedback>
                        </div>
                      </BCol>

                      <!-- Company -->
                      <BCol lg="6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Company Name
                            <span class="text-danger">*</span></label
                          >
                          <input
                            type="text"
                            v-model="exp.company"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                errors[`experiences.${index}.company`],
                            }"
                            placeholder="Enter company name"
                          />
                          <BFormInvalidFeedback
                            v-if="errors[`experiences.${index}.company`]"
                          >
                            {{ errors[`experiences.${index}.company`] }}
                          </BFormInvalidFeedback>
                        </div>
                      </BCol>

                      <!-- Years -->
                      <BCol lg="6">
                        <div class="mb-3">
                          <label class="form-label"
                            >Experience Years
                            <span class="text-danger">*</span></label
                          >
                          <BRow>
                            <BCol lg="5">
                              <Multiselect
                                v-model="exp.start_year"
                                :options="yearOptions"
                                placeholder="Start year"
                                :class="{
                                  'is-invalid':
                                    errors[`experiences.${index}.start_year`],
                                }"
                              />
                              <BFormInvalidFeedback
                                v-if="errors[`experiences.${index}.start_year`]"
                              >
                                {{ errors[`experiences.${index}.start_year`] }}
                              </BFormInvalidFeedback>
                            </BCol>

                            <BCol cols="auto" class="align-self-center"
                              >to</BCol
                            >

                            <BCol lg="5">
                              <Multiselect
                                v-model="exp.end_year"
                                :options="yearOptions"
                                placeholder="End year"
                                :class="{
                                  'is-invalid':
                                    errors[`experiences.${index}.end_year`],
                                }"
                              />
                              <BFormInvalidFeedback
                                v-if="errors[`experiences.${index}.end_year`]"
                              >
                                {{ errors[`experiences.${index}.end_year`] }}
                              </BFormInvalidFeedback>
                            </BCol>
                          </BRow>
                        </div>
                      </BCol>

                      <!-- Description -->
                      <BCol lg="12">
                        <div class="mb-3">
                          <label class="form-label"
                            >Job Description
                            <span class="text-danger">*</span></label
                          >
                          <textarea
                            v-model="exp.job_description"
                            class="form-control"
                            :class="{
                              'is-invalid':
                                errors[`experiences.${index}.job_description`],
                            }"
                            rows="3"
                            placeholder="Describe your role and achievements"
                          ></textarea>
                          <BFormInvalidFeedback
                            v-if="
                              errors[`experiences.${index}.job_description`]
                            "
                          >
                            {{ errors[`experiences.${index}.job_description`] }}
                          </BFormInvalidFeedback>
                        </div>
                      </BCol>

                      <!-- Delete Button -->
                      <div class="hstack gap-2 justify-content-end">
                        <BButton
                          variant="danger"
                          size="sm"
                          @click="removeExperience(index)"
                          v-if="experiences.length > 1"
                        >
                          Delete
                        </BButton>
                      </div>
                    </BRow>
                  </div>

                  <!-- Submit Buttons -->
                  <BCol lg="12" class="pt-3">
                    <div class="hstack gap-2">
                      <BButton
                        type="submit"
                        variant="success"
                        :disabled="submitting"
                      >
                        {{ submitting ? "Saving..." : "Update" }}
                      </BButton>
                      <BButton
                        type="button"
                        variant="primary"
                        @click="addExperience"
                      >
                        Add New
                      </BButton>
                    </div>
                  </BCol>
                </form>
              </BTab>

              <!-- Change Password -->
              <BTab title="Change Password">
                <form @submit.prevent="handleChangePassword">
                  <BRow class="g-2 pt-4">
                    <!-- Old Password -->
                    <BCol lg="4">
                      <label for="oldpasswordInput" class="form-label"
                        >Old Password*</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.old_password }"
                        id="oldpasswordInput"
                        placeholder="Enter current password"
                        v-model="formChangePassword.old_password"
                      />
                      <BFormInvalidFeedback v-if="errors.old_password">
                        {{ errors.old_password }}
                      </BFormInvalidFeedback>
                    </BCol>

                    <!-- New Password -->
                    <BCol lg="4">
                      <label for="newpasswordInput" class="form-label"
                        >New Password*</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        :class="{ 'is-invalid': errors.new_password }"
                        id="newpasswordInput"
                        placeholder="Enter new password"
                        v-model="formChangePassword.new_password"
                      />
                      <BFormInvalidFeedback v-if="errors.new_password">
                        {{ errors.new_password }}
                      </BFormInvalidFeedback>
                    </BCol>

                    <!-- Confirm Password -->
                    <BCol lg="4">
                      <label for="confirmpasswordInput" class="form-label"
                        >Confirm Password*</label
                      >
                      <input
                        type="password"
                        class="form-control"
                        :class="{
                          'is-invalid': errors.new_password_confirmation,
                        }"
                        id="confirmpasswordInput"
                        placeholder="Confirm password"
                        v-model="formChangePassword.new_password_confirmation"
                      />
                      <BFormInvalidFeedback
                        v-if="errors.new_password_confirmation"
                      >
                        {{ errors.new_password_confirmation }}
                      </BFormInvalidFeedback>
                    </BCol>

                    <!-- Submit Button -->
                    <BCol lg="12" class="mt-5">
                      <div class="text-end">
                        <BButton
                          type="submit"
                          variant="primary"
                          :disabled="submitting"
                        >
                          <template v-if="submitting">
                            <span
                              class="spinner-border spinner-border-sm me-2"
                            ></span>
                            Updating...
                          </template>
                          <template v-else>
                            <i class="ri-save-line me-2"></i>
                            Change Password
                          </template>
                        </BButton>
                      </div>
                    </BCol>
                  </BRow>
                </form>
              </BTab>

              <!-- Notification -->
              <BTab title="Notifications">
                <div class="mt-4">
                  <h5 class="card-title text-decoration-underline mb-3">
                    Application Notifications:
                  </h5>

                  <ul class="list-unstyled mb-0">
                    <!-- Web Notification -->
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="is_web">
                          Show web notifications
                        </label>
                        <p class="text-muted">
                          Allow this application to show notifications in your
                          browser when you're online.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_web"
                            v-model="notifications.is_web"
                          />
                        </div>
                      </div>
                    </li>

                    <!-- Email Notification -->
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="is_email">
                          Show email notifications
                        </label>
                        <p class="text-muted">
                          Get updates and important alerts directly in your
                          email inbox.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_email"
                            v-model="notifications.is_email"
                          />
                        </div>
                      </div>
                    </li>

                    <!-- SMS Notification -->
                    <li class="d-flex mt-2">
                      <div class="flex-grow-1">
                        <label class="form-check-label fs-14" for="is_sms">
                          Enable SMS notifications
                        </label>
                        <p class="text-muted">
                          Receive important account alerts and reminders via
                          text message.
                        </p>
                      </div>
                      <div class="flex-shrink-0">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_sms"
                            v-model="notifications.is_sms"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>

                  <!-- ✅ Save Changes Button at End -->
                  <div class="d-flex justify-content-end hstack gap-2 mb-4">
                    <BButton
                      variant="success"
                      :disabled="savingNotif"
                      @click="saveNotificationSettings"
                    >
                      <i class="ri-save-line me-1"></i>
                      {{ savingNotif ? "Saving..." : "Save Changes" }}
                    </BButton>
                  </div>
                </div>

                <div v-if="userType === 'job_seeker'">
                  <h5 class="card-title text-decoration-underline mb-3">
                    Delete This Account:
                  </h5>
                  <p class="text-muted">
                    Deleting your account is permanent and cannot be undone.
                    Please confirm your password before proceeding.
                  </p>

                  <div>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      placeholder="Enter your password"
                      style="max-width: 265px"
                    />
                  </div>

                  <div class="hstack gap-2 mt-3">
                    <BButton
                      variant="soft-danger"
                      @click="showDeleteModal = true"
                    >
                      Close & Delete This Account
                    </BButton>
                    <BButton variant="light">Cancel</BButton>
                  </div>
                </div>
              </BTab>
            </BTabs>
          </BCardBody>
        </BCard>
      </BCol>
    </BRow>

    <!-- Confirmation Modal -->
    <BModal
      v-model="showDeleteModal"
      title="Confirm Account Deletion"
      centered
      hide-footer
      class="v-modal-custom"
    >
      <div class="text-center p-3">
        <i class="ri-error-warning-line text-danger display-5 mb-3"></i>
        <h5>Are you absolutely sure?</h5>
        <p class="text-muted">
          This action will permanently delete your profile, job applications,
          and all related data.
        </p>

        <div class="d-flex justify-content-center gap-2 mt-4">
          <BButton variant="danger" @click="confirmDelete" :disabled="deleting">
            <span v-if="!deleting">Yes, Delete</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2"></span>
              Deleting...
            </span>
          </BButton>

          <BButton variant="secondary" @click="showDeleteModal = false">
            Cancel
          </BButton>
        </div>
      </div>
    </BModal>

    <!-- Cover Photo Upload Modal -->
    <BModal
      v-model="coverModalOpen"
      hide-footer
      title="Update Cover Photo"
      class="v-modal-custom"
      size="lg"
    >
      <form @submit.prevent="uploadCoverPhoto">
        <BRow class="g-3">
          <BCol lg="12">
            <div class="text-center mb-4">
              <div class="cover-preview-container mx-auto mb-3">
                <img
                  :src="
                    coverPreview
                      ? coverPreview
                      : currentUser?.cover_photo
                      ? `${storageBaseUrl()}/${currentUser.cover_photo}`
                      : coverDummy
                  "
                  class="cover-preview-img rounded"
                  alt="Cover preview"
                />
              </div>
              <p class="text-muted mb-0">Recommended size: 1200x300 pixels</p>
            </div>
          </BCol>

          <BCol lg="12">
            <label class="form-label">Select Cover Photo</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleCoverFileSelect"
              :disabled="uploading"
            />
            <div class="form-text">
              Supported formats: JPG, PNG, GIF. Max size: 10MB
            </div>
          </BCol>

          <BCol lg="12">
            <div class="hstack gap-2 justify-content-end">
              <BButton
                type="button"
                variant="light"
                @click="coverModalOpen = false"
                :disabled="uploading"
              >
                Cancel
              </BButton>
              <BButton
                type="submit"
                variant="primary"
                :disabled="!coverFile || uploading"
              >
                <template v-if="uploading && currentUploadType === 'cover'">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Uploading...
                </template>
                <template v-else>
                  <i class="ri-upload-cloud-line me-2"></i>
                  Upload Cover
                </template>
              </BButton>
            </div>
          </BCol>
        </BRow>
      </form>
    </BModal>

    <!-- Avatar Upload Modal -->
    <BModal
      v-model="avatarModalOpen"
      hide-footer
      title="Update Profile Picture"
      class="v-modal-custom"
    >
      <form @submit.prevent="uploadAvatar">
        <BRow class="g-3">
          <BCol lg="12">
            <div class="text-center mb-4">
              <div class="avatar-preview-container mx-auto mb-3">
                <img
                  :src="
                    avatarPreview
                      ? avatarPreview
                      : currentUser?.avatar
                      ? `${storageBaseUrl()}/${currentUser.avatar}`
                      : userDummy
                  "
                  class="avatar-preview-img rounded-circle"
                  alt="Avatar preview"
                />
              </div>
              <p class="text-muted mb-0">Recommended size: 200x200 pixels</p>
            </div>
          </BCol>

          <BCol lg="12">
            <label class="form-label">Select Profile Picture</label>
            <input
              type="file"
              class="form-control"
              accept="image/*"
              @change="handleAvatarFileSelect"
              :disabled="uploading"
            />
            <div class="form-text">
              Supported formats: JPG, PNG, GIF. Max size: 5MB
            </div>
          </BCol>

          <BCol lg="12">
            <div class="hstack gap-2 justify-content-end">
              <BButton
                type="button"
                variant="light"
                @click="avatarModalOpen = false"
                :disabled="uploading"
              >
                Cancel
              </BButton>
              <BButton
                type="submit"
                variant="primary"
                :disabled="!avatarFile || uploading"
              >
                <template v-if="uploading && currentUploadType === 'avatar'">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Uploading...
                </template>
                <template v-else>
                  <i class="ri-upload-cloud-line me-2"></i>
                  Upload Avatar
                </template>
              </BButton>
            </div>
          </BCol>
        </BRow>
      </form>
    </BModal>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import Layout from "@/layouts/main.vue";

import userDummy from "@/assets/images/users/user-dummy-img.jpg";
import coverDummy from "@/assets/images/profile-bg.jpg";

import { useJobFilters } from "@/helpers/useJobFilters";
import { storageBaseUrl } from "@/helpers/useFormats";

const {
  qualificationDetails,
  skillDetails,
  getSubCategoriesByCategory,
  industryDetails,
} = useJobFilters();

import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const userType = computed(() => currentUser.value?.user_type ?? "");
const currentUser = computed(() => store.state.auth.user);
const currentToken = computed(() => store.state.auth.token);

import Toast from "@/helpers/Toast";
import {
  updateInfoProfileSetting,
  updateImgProfileSetting,
  updatePassProfileSetting,
  storeJobExpriences,
  deleteInfoProfileSetting,
  updateNotificationSettings,
} from "@/api-request";

const formPersonal = ref({
  name: "",
  email: "",
  telephone: "",
  address: "",
  bio: "",
  avatar: "",
  cover: "",

  // job seeker
  date_of_birth: "",
  gender: "",
  education_level: "",
  field_of_study: "",
  skills: [],
  services: [],
  years_of_experience: "",
  preferred_location: "",
  expected_salary: "",

  // employer
  company_size: "",
  industry: "",
  locator_number: "",

  social_media: [
    {
      name: "",
      url: "",
    },
  ],
});

const errors = ref({});
const submitting = ref(false);

// Social Media Methods
const addSocialMedia = () => {
  formPersonal.value.social_media.push({
    name: "",
    url: "",
  });
};

const removeSocialMedia = (index) => {
  if (formPersonal.value.social_media.length > 1) {
    formPersonal.value.social_media.splice(index, 1);
  }
};

const fetchDetails = () => {
  if (currentUser.value) {
    const rawDate =
      currentUser.value.date_of_birth ||
      currentUser.value.job_seeker?.date_of_birth;
    const formattedDate = rawDate ? rawDate.split("T")[0] : "";

    formPersonal.value = {
      name: currentUser.value.name || "",
      email: currentUser.value.email || "",
      address: currentUser.value.address || "",
      telephone: currentUser.value.telephone || "",
      bio: currentUser.value.bio || "",
      avatar: currentUser.value.avatar || "",
      cover: currentUser.value.cover_photo || "",

      date_of_birth: formattedDate || "",
      gender: currentUser.value.job_seeker?.gender || "",
      education_level: currentUser.value.job_seeker?.education_level || "",
      field_of_study: currentUser.value.job_seeker?.field_of_study || "",
      skills: Array.isArray(currentUser.value.job_seeker?.skills)
        ? [...currentUser.value.job_seeker.skills]
        : [],
      services: Array.isArray(currentUser.value.job_seeker?.services)
        ? [...currentUser.value.job_seeker.services]
        : [],
      years_of_experience:
        currentUser.value.job_seeker?.years_of_experience || "",
      preferred_location:
        currentUser.value.job_seeker?.preferred_location || "",
      expected_salary: currentUser.value.job_seeker?.expected_salary || "",

      company_size: currentUser.value.employer?.company_size || "",
      industry: currentUser.value.employer?.industry || "",
      locator_number: currentUser.value.employer?.locator_number || "",

      social_media: currentUser.value.social_medias?.length
        ? currentUser.value.social_medias.map((sm) => ({
            name: sm.platform_name || sm.name || "",
            url: sm.profile_url || sm.url || "",
          }))
        : [{ name: "", url: "" }],
    };

    notifications.value = {
      is_web: currentUser.value?.is_web || false,
      is_email: currentUser.value?.is_email || false,
      is_sms: currentUser.value?.is_sms || false,
    };

    if (currentUser.value?.job_seeker?.experiences) {
      experiences.value = currentUser.value.job_seeker.experiences.map(
        (exp) => ({
          id: exp.id ?? null,
          job_title: exp.job_title ?? "",
          company: exp.company ?? "",
          start_year: exp.start_year ?? "",
          end_year: exp.end_year ?? "",
          job_description: exp.job_description ?? "",
        })
      );
    } else {
      experiences.value = [
        {
          id: null,
          job_title: "",
          company: "",
          start_year: "",
          end_year: "",
          job_description: "",
        },
      ];
    }
  }
};

// 🔹 Update user data
const updatePersonalInfo = async () => {
  submitting.value = true;
  errors.value = {};

  try {
    // API call to update profile
    const response = await updateInfoProfileSetting(formPersonal.value);

    store.commit("auth/setUser", {
      token: currentToken.value ?? null,
      user: { ...response.data },
    });

    Toast.fire({
      icon: "success",
      title: response?.message || "Profile updated successfully!",
    });
  } catch (error) {
    console.error("Submit Error:", error);

    if (error.response?.status === 422 && error.response.data?.errors) {
      const backendErrors = error.response.data.errors;

      // Flatten Laravel validation messages
      Object.keys(backendErrors).forEach((field) => {
        backendErrors[field] = backendErrors[field][0];
      });

      errors.value = backendErrors;

      Toast.fire({
        icon: "error",
        title: "Please fix the validation errors below",
      });
    } else {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An unexpected error occurred while saving your profile.",
      });
    }
  } finally {
    submitting.value = false;
  }
};

// Experience =============================================================
const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 51 }, (_, i) => {
  const year = currentYear - i;
  return { value: year, label: year.toString() };
});

const experiences = ref([
  {
    job_title: "",
    company: "",
    start_year: "",
    end_year: "",
    job_description: "",
  },
]);

const addExperience = () => {
  experiences.value.push({
    job_title: "",
    company: "",
    start_year: "",
    end_year: "",
    job_description: "",
  });
};

const removeExperience = (index) => {
  experiences.value.splice(index, 1);
};

const saveExperiences = async () => {
  submitting.value = true;
  errors.value = {};

  try {
    // API call to update profile
    const response = await storeJobExpriences({
      experiences: experiences.value,
    });

    store.commit("auth/setUser", {
      token: currentToken.value ?? null,
      user: { ...response.data },
    });

    Toast.fire({
      icon: "success",
      title: response?.message || "Updated successfully!",
    });
  } catch (error) {
    console.error("Submit Error:", error);

    if (error.response?.status === 422 && error.response.data?.errors) {
      const backendErrors = error.response.data.errors;

      // Flatten Laravel validation messages
      Object.keys(backendErrors).forEach((field) => {
        backendErrors[field] = backendErrors[field][0];
      });

      errors.value = backendErrors;

      Toast.fire({
        icon: "error",
        title: "Please fix the validation errors below",
      });
    } else {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An unexpected error occurred while saving your profile.",
      });
    }
  } finally {
    submitting.value = false;
  }
};

// Update Notification ==================================================================
const savingNotif = ref(false);
const notifications = ref({
  is_web: true,
  is_email: true,
  is_sms: false,
});

const saveNotificationSettings = async () => {
  savingNotif.value = true;

  try {
    // API call to update profile
    const response = await updateNotificationSettings(notifications.value);

    store.commit("auth/setUser", {
      token: currentToken.value ?? null,
      user: { ...response.data },
    });

    Toast.fire({
      icon: "success",
      title: response?.message || "Updated successfully!",
    });
  } catch (error) {
    console.error("Submit Error:", error);

    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Processing Failed.",
    });
  } finally {
    savingNotif.value = false;
  }
};

// Delete Profile =======================================================================
const password = ref("");
const showDeleteModal = ref(false);
const deleting = ref(false);

const confirmDelete = async () => {
  if (!password.value) {
    Toast.fire({
      icon: "warning",
      title: "Please enter your password before deleting your account.",
    });
    return;
  }

  deleting.value = true;

  try {
    // Call API to delete the account
    const response = await deleteInfoProfileSetting(password.value);

    Toast.fire({
      icon: "success",
      title:
        response?.data?.message ||
        "Your account has been successfully deleted. You will be logged out in 5 seconds.",
    });

    showDeleteModal.value = false;

    // Wait 5 seconds before logout
    setTimeout(async () => {
      store.commit("auth/clearUser");
      router.push("/login");
    }, 5000);
  } catch (error) {
    console.error("Delete Account Error:", error);

    const errorMessage =
      error.response?.data?.message ||
      "An error occurred while deleting your account.";

    Toast.fire({
      icon: "error",
      title: errorMessage,
    });
  } finally {
    deleting.value = false;
  }
};

// Change Password ======================================================================
const formChangePassword = ref({
  old_password: "",
  new_password: "",
  new_password_confirmation: "",
});

const handleChangePassword = async () => {
  submitting.value = true;
  errors.value = {};

  try {
    const response = await updatePassProfileSetting(formChangePassword.value);

    Toast.fire({
      icon: "success",
      title: response?.data?.message || "Password updated successfully.",
    });

    formChangePassword.value = {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    };
  } catch (error) {
    console.error("Submit Error:", error);

    if (error.response?.status === 422 && error.response.data?.errors) {
      const backendErrors = error.response.data.errors;
      Object.keys(backendErrors).forEach((key) => {
        errors.value[key] = backendErrors[key][0];
      });
      Toast.fire({
        icon: "error",
        title: "Please fix the highlighted errors.",
      });
    } else {
      Toast.fire({
        icon: "error",
        title:
          error.response?.data?.message ||
          "An unexpected error occurred while changing your password.",
      });
    }
  } finally {
    submitting.value = false;
  }
};

// file upload ===================================================================
// Modal states
const coverModalOpen = ref(false);
const avatarModalOpen = ref(false);

// Upload states
const uploading = ref(false);
const currentUploadType = ref("");
const avatarPreview = ref(null);
const coverPreview = ref(null);
const avatarFile = ref(null);
const coverFile = ref(null);

// Open modals
const openCoverModal = () => {
  coverPreview.value = null;
  coverFile.value = null;
  coverModalOpen.value = true;
};

const openAvatarModal = () => {
  avatarPreview.value = null;
  avatarFile.value = null;
  avatarModalOpen.value = true;
};

// Handle file selection
const handleCoverFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file
  if (!validateImageFile(file, "cover")) return;

  coverFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    coverPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const handleAvatarFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file
  if (!validateImageFile(file, "avatar")) return;

  avatarFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

// Validate image file
const validateImageFile = (file, type) => {
  if (!file.type.startsWith("image/")) {
    Toast.fire({
      icon: "error",
      title: "Please select a valid image file",
    });
    return false;
  }

  const maxSize = type === "avatar" ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    Toast.fire({
      icon: "error",
      title: `Image size should be less than ${
        type === "avatar" ? "5MB" : "10MB"
      }`,
    });

    return false;
  }

  return true;
};

// Upload functions
const uploadCoverPhoto = async () => {
  if (!coverFile.value) return;
  await uploadImage(coverFile.value, "cover");
};

const uploadAvatar = async () => {
  if (!avatarFile.value) return;
  await uploadImage(avatarFile.value, "avatar");
};

// Upload image to backend
const uploadImage = async (file, type) => {
  uploading.value = true;
  currentUploadType.value = type;

  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", type);

    // ✅ Use PUT for updating
    const response = await updateImgProfileSetting(
      currentUser.value.id,
      formData
    );

    const user = response.data.data;

    store.commit("auth/setUser", {
      token: currentToken.value ?? null,
      user: { ...user },
    });

    Toast.fire({
      icon: "success",
      title: response?.message || "Image has been updated successfully.",
    });

    // ✅ Close modal and clear
    if (type === "avatar") {
      avatarModalOpen.value = false;
      avatarPreview.value = null;
      avatarFile.value = null;
    } else {
      coverModalOpen.value = false;
      coverPreview.value = null;
      coverFile.value = null;
    }
  } catch (error) {
    console.error("Upload failed:", error);
    Toast.fire({
      icon: "error",
      title: error.response?.data?.message || "Failed to upload.",
    });
  } finally {
    uploading.value = false;
    currentUploadType.value = "";
  }
};

onMounted(() => {
  fetchDetails();
});
</script>

<style scoped>
.cover-preview-container {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  border: 2px dashed #dee2e6;
}

.cover-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-preview-container {
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px dashed #dee2e6;
}

.avatar-preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-setting-img {
  height: 250px;
  overflow: hidden;
}

.profile-wid-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.user-profile-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.position-absolute.bottom-0.end-0 {
  transform: translate(25%, 25%);
}
</style>
