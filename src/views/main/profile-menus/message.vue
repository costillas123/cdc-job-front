<template>
  <Layout>
    <div class="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
      <div class="chat-leftsidebar">
        <!-- Header -->
        <div class="px-4 pt-4 mb-3">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mb-0 fw-semibold">Chats</h5>
          </div>

          <!-- Search Box -->
          <div
            class="input-group input-group-sm shadow-sm rounded-3 overflow-hidden"
          >
            <input
              type="text"
              class="form-control bg-light border-0"
              placeholder="Search here..."
              v-model="searchQuery"
            />
            <button
              class="btn btn-primary d-flex align-items-center justify-content-center"
              type="button"
              @click="fetchData()"
              title="Search"
            >
              <i class="ri-search-2-line fs-6"></i>
            </button>
          </div>
        </div>

        <!-- Chat List -->
        <simplebar class="chat-room-list" data-simplebar>
          <!-- Loading State -->
          <template v-if="isLoading">
            <div
              class="d-flex flex-column justify-content-center align-items-center py-5"
            >
              <lottie :options="defaultFind" :height="75" :width="75" />
              <h6 class="mt-2 text-muted">Loading...</h6>
            </div>
          </template>

          <!-- Empty State -->
          <template v-else-if="userData.length === 0">
            <div
              class="d-flex flex-column justify-content-center align-items-center text-center py-5"
            >
              <lottie :options="defaultTalk" :height="150" :width="150" />
              <div class="mt-3 pt-2">
                <h5 class="mb-2">No Chats Found</h5>
                <p class="text-muted mb-0">
                  Try adjusting your search or start a new conversation.
                </p>
              </div>
            </div>
          </template>

          <!-- Chat List -->
          <template v-else>
            <div class="d-flex align-items-center px-4 mb-2">
              <div class="flex-grow-1">
                <h6 class="mb-0 fs-11 text-muted text-uppercase">
                  Direct Messages
                </h6>
              </div>
            </div>

            <div class="chat-message-list">
              <ul class="list-unstyled chat-list chat-user-list mb-0">
                <li
                  v-for="data in userData"
                  :key="data.id"
                  @click="chatUsername(data.name, data.image, data.id)"
                  :class="{ active: username === data.name }"
                  class="cursor-pointer px-3 py-2 rounded-3 hover-bg-light"
                >
                  <BLink href="javascript:void(0);" class="text-reset d-block">
                    <div class="d-flex align-items-center">
                      <!-- Avatar -->
                      <div class="flex-shrink-0 chat-user-img me-2">
                        <template v-if="data.image">
                          <div class="avatar-xxs">
                            <img
                              :src="data.image"
                              class="rounded-circle img-fluid userprofile"
                              alt="User avatar"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div class="avatar-xxs">
                            <div
                              class="avatar-title rounded-circle bg-danger text-white"
                            >
                              {{ data.name.charAt(0) }}
                            </div>
                          </div>
                        </template>
                      </div>

                      <!-- Name -->
                      <div class="flex-grow-1 overflow-hidden">
                        <p class="text-truncate mb-0 fw-medium">
                          {{ data.name }}
                        </p>
                      </div>

                      <!-- Time -->
                      <div class="flex-shrink-0 ms-2">
                        <BBadge
                          variant="dark-subtle"
                          class="bg-dark-subtle text-body rounded p-1 fs-11"
                        >
                          {{ data.time }}
                        </BBadge>
                      </div>
                    </div>
                  </BLink>
                </li>
              </ul>
            </div>
          </template>
        </simplebar>
      </div>

      <!-- Message Convo -->
      <div
        class="user-chat w-100 overflow-hidden"
        :class="{ 'user-chat-show': showChat }"
      >
        <div class="chat-content d-lg-flex">
          <div class="w-100 overflow-hidden position-relative">
            <div class="position-relative">
              <template v-if="showChat">
                <!-- header -->
                <div class="p-3 user-chat-topbar">
                  <BRow class="align-items-center">
                    <BCol sm="4" cols="8">
                      <div class="d-flex align-items-center">
                        <div class="flex-shrink-0 d-block d-lg-none me-3">
                          <BLink
                            href="javascript: void(0);"
                            class="user-chat-remove fs-18 p-1"
                            @click="closeChat"
                            ><i class="ri-arrow-left-s-line align-bottom"></i
                          ></BLink>
                        </div>
                        <div class="flex-grow-1 overflow-hidden">
                          <div class="d-flex align-items-center">
                            <div
                              class="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0"
                            >
                              <img
                                :src="
                                  profile
                                    ? profile
                                    : require('@/assets/images/users/user-dummy-img.jpg')
                                "
                                class="rounded-circle avatar-xs"
                                alt=""
                              />
                              <span class="user-status"></span>
                            </div>
                            <div class="flex-grow-1 overflow-hidden">
                              <h5 class="text-truncate mb-0 fs-16">
                                <BLink
                                  class="text-reset username"
                                  @click="showOffcanvas = !showOffcanvas"
                                  >{{ username }}
                                </BLink>
                              </h5>
                              <p
                                class="text-truncate text-muted fs-14 mb-0 userStatus"
                              >
                                <small>Online</small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </BCol>
                    <BCol sm="8" cols="4">
                      <ul class="list-inline user-chat-nav text-end mb-0">
                        <!-- <li
                          class="list-inline-item d-none d-lg-inline-block m-0"
                        >
                          <BButton
                            type="button"
                            variant="ghost-secondary"
                            class="btn-icon"
                            @click="showOffcanvas = !showOffcanvas"
                          >
                            <info-icon class="icon-sm"></info-icon>
                          </BButton>
                        </li> -->

                        <li class="list-inline-item m-0">
                          <BDropdown
                            variant="link"
                            class="btn btn-ghost-secondary btn-icon"
                            toggle-class=" arrow-none"
                            menu-class="dropdown-menu"
                            aria-haspopup="true"
                          >
                            <template #button-content>
                              <more-vertical-icon
                                class="icon-sm"
                              ></more-vertical-icon>
                            </template>
                            <!-- <BDropdownItem
                              ><i
                                class="ri-inbox-archive-line align-bottom text-muted me-2"
                              ></i>
                              Archive
                            </BDropdownItem>
                            <BDropdownItem
                              ><i
                                class="ri-mic-off-line align-bottom text-muted me-2"
                              ></i>
                              Muted</BDropdownItem
                            > -->
                            <BDropdownItem @click="openDeleteModal()"
                              ><i
                                class="ri-delete-bin-5-line align-bottom text-muted me-2"
                              ></i>
                              Delete</BDropdownItem
                            >
                          </BDropdown>
                        </li>
                      </ul>
                    </BCol>
                  </BRow>
                </div>

                <!-- content -->
                <div class="position-relative" id="users-chat">
                  <simplebar
                    class="chat-conversation p-3 p-lg-4"
                    id="chat-conversation"
                    data-simplebar
                    ref="current"
                  >
                    <!-- If chat has messages -->
                    <ul
                      v-if="chatData.length > 0"
                      class="list-unstyled chat-conversation-list"
                    >
                      <li
                        v-for="(data, index) in chatData"
                        :key="index"
                        :class="['chat-list', data.align]"
                      >
                        <div class="conversation-list">
                          <div
                            class="chat-avatar"
                            v-if="data.align !== 'right'"
                          >
                            <img
                              :src="
                                profile
                                  ? profile
                                  : require('@/assets/images/users/user-dummy-img.jpg')
                              "
                              alt=""
                            />
                          </div>
                          <div class="user-chat-content">
                            <div class="ctext-wrap">
                              <div class="ctext-wrap-content">
                                <p class="mb-0 ctext-content">
                                  {{ data.message }}
                                </p>
                              </div>
                              <div class="conversation-name mx-2">
                                <small class="text-muted time">
                                  {{ data.time }}
                                </small>

                                <!-- ✅ Show check marks only for messages I sent -->
                                <span
                                  v-if="data.align === 'right'"
                                  class="check-message-icon"
                                >
                                  <!-- Sent only -->
                                  <i
                                    v-if="
                                      data.msgStatus.isSent &&
                                      !data.msgStatus.isDelivered
                                    "
                                    class="ri-check-line align-bottom text-muted"
                                  ></i>

                                  <!-- Delivered (2 gray checks) -->
                                  <i
                                    v-if="
                                      data.msgStatus.isDelivered &&
                                      !data.msgStatus.isSeen
                                    "
                                    class="ri-check-double-line align-bottom text-muted"
                                  ></i>

                                  <!-- Seen (2 green checks) -->
                                  <i
                                    v-if="data.msgStatus.isSeen"
                                    class="ri-check-double-line align-bottom text-success"
                                  ></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>

                    <!-- If no chat messages -->
                    <div
                      v-else
                      class="d-flex flex-column justify-content-center align-items-center text-center"
                    >
                      <lottie
                        colors="primary:#405189,secondary:#0ab39c"
                        trigger="loop"
                        :options="defaultTalk"
                        :height="150"
                        :width="150"
                      />
                      <div class="mt-4 pt-3">
                        <h4 class="mb-3">Start Conversation</h4>
                        <p class="text-muted mb-4">
                          Start connecting with the people by sending the first
                          message.
                        </p>
                      </div>
                    </div>
                  </simplebar>
                </div>

                <!-- footer -->
                <div class="chat-input-section p-3 p-lg-4">
                  <form @submit.prevent="formSubmit">
                    <BRow class="g-0 align-items-center">
                      <BCol cols="auto">
                        <div class="chat-input-links me-2">
                          <div class="links-list-item">
                            <BButton
                              type="button"
                              variant="link"
                              class="text-decoration-none emoji-btn"
                              id="emoji-btn"
                            >
                              <i class="bx bx-smile align-middle"></i>
                            </BButton>
                          </div>
                        </div>
                      </BCol>
                      <BCol>
                        <div class="chat-input-feedback">
                          Please Enter a Message
                        </div>

                        <input
                          type="text"
                          v-model="form.message"
                          class="form-control chat-input bg-light border-light"
                          placeholder="Enter Message..."
                          :class="{
                            'is-invalid': submitted && v$.form.message.$error,
                          }"
                        />
                        <div
                          v-if="submitted && v$.form.message.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="v$.form.message.required.$message">{{
                            v$.form.message.required.$message
                          }}</span>
                        </div>
                      </BCol>
                      <BCol cols="auto">
                        <div class="chat-input-links ms-2">
                          <div class="links-list-item">
                            <BButton
                              variant="success"
                              type="submit"
                              class="chat-send"
                            >
                              <i class="ri-send-plane-2-fill align-bottom"></i>
                            </BButton>
                          </div>
                        </div>
                      </BCol>
                    </BRow>
                  </form>
                </div>

                <!-- end footer -->
              </template>

              <template v-else>
                <div class="position-relative" id="users-chat">
                  <simplebar class="chat-conversation p-3 p-lg-4 text-center">
                    <lottie
                      class="avatar-xl icon-primary"
                      colors="primary:#405189"
                      :options="defaultSingle"
                      trigger="hover"
                      :height="130"
                      :width="130"
                    />
                    <div class="mt-4">
                      <h4 class="mb-3">Start Conversation</h4>
                      <p class="text-muted mb-4">
                        Start connecting with the people by selecting one of the
                        contacts on the left
                      </p>
                    </div>
                  </simplebar>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <BOffcanvas
      v-model="showOffcanvas"
      body-class="border-0 p-0 overflow-hidden"
      header-class="border-bottom"
    >
      <div class="offcanvas-body profile-offcanvas p-0">
        <div class="team-cover">
          <img src="@/assets/images/small/img-9.jpg" alt="" class="img-fluid" />
        </div>
        <div class="p-1 pb-4 pt-0">
          <div class="team-settings">
            <div class="row g-0">
              <div class="col"></div>
              <div class="col-auto">
                <div class="user-chat-nav d-flex">
                  <BButton variant="link" class="nav-btn favourite-btn active">
                    <i class="ri-star-fill"></i>
                  </BButton>

                  <div class="dropdown">
                    <BLink
                      class="btn nav-btn"
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="ri-more-2-fill"></i>
                    </BLink>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <BLink class="dropdown-item" href="javascript:void(0);"
                          ><i
                            class="ri-inbox-archive-line align-bottom text-muted me-2"
                          ></i
                          >Archive</BLink
                        >
                      </li>
                      <li>
                        <BLink class="dropdown-item" href="javascript:void(0);"
                          ><i
                            class="ri-mic-off-line align-bottom text-muted me-2"
                          ></i
                          >Muted</BLink
                        >
                      </li>
                      <li>
                        <BLink class="dropdown-item" href="javascript:void(0);"
                          ><i
                            class="ri-delete-bin-5-line align-bottom text-muted me-2"
                          ></i
                          >Delete</BLink
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-3 text-center">
          <img
            :src="profile"
            alt=""
            class="avatar-lg img-thumbnail rounded-circle mx-auto profile-img"
          />
          <div class="mt-3">
            <h5 class="fs-16 mb-1">
              <BLink href="javascript:void(0);" class="link-primary username">
                {{ username }}</BLink
              >
            </h5>
            <p class="text-muted">
              <i
                class="ri-checkbox-blank-circle-fill me-1 align-bottom text-success"
              ></i
              >Online
            </p>
          </div>

          <div class="d-flex gap-2 justify-content-center">
            <BButton
              variant="light"
              class="avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Message"
            >
              <span class="avatar-title rounded bg-light text-body">
                <i class="ri-question-answer-line"></i>
              </span>
            </BButton>

            <BButton
              variant="light"
              class="avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Favourite"
            >
              <span class="avatar-title rounded bg-light text-body">
                <i class="ri-star-line"></i>
              </span>
            </BButton>

            <BButton
              variant="light"
              class="avatar-xs p-0"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Phone"
            >
              <span class="avatar-title rounded bg-light text-body">
                <i class="ri-phone-line"></i>
              </span>
            </BButton>

            <div class="dropdown">
              <BButton
                variant="light"
                class="avatar-xs p-0"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="avatar-title bg-light text-body rounded">
                  <i class="ri-more-fill"></i>
                </span>
              </BButton>

              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <BLink class="dropdown-item" href="javascript:void(0);"
                    ><i
                      class="ri-inbox-archive-line align-bottom text-muted me-2"
                    ></i
                    >Archive</BLink
                  >
                </li>
                <li>
                  <BLink class="dropdown-item" href="javascript:void(0);"
                    ><i class="ri-mic-off-line align-bottom text-muted me-2"></i
                    >Muted</BLink
                  >
                </li>
                <li>
                  <BLink class="dropdown-item" href="javascript:void(0);"
                    ><i
                      class="ri-delete-bin-5-line align-bottom text-muted me-2"
                    ></i
                    >Delete</BLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="border-top border-top-dashed p-3">
          <h5 class="fs-15 mb-3">Personal Details</h5>
          <div class="mb-3">
            <p class="text-muted text-uppercase fw-medium fs-12 mb-1">Number</p>
            <h6>+(256) 2451 8974</h6>
          </div>
          <div class="mb-3">
            <p class="text-muted text-uppercase fw-medium fs-12 mb-1">Email</p>
            <h6>lisaparker@gmail.com</h6>
          </div>
          <div>
            <p class="text-muted text-uppercase fw-medium fs-12 mb-1">
              Location
            </p>
            <h6 class="mb-0">California, USA</h6>
          </div>
        </div>

        <div class="border-top border-top-dashed p-3">
          <h5 class="fs-15 mb-3">Attached Files</h5>

          <div class="vstack gap-2">
            <div class="border rounded border-dashed p-2">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-xs">
                    <div
                      class="avatar-title bg-light text-secondary rounded fs-20"
                    >
                      <i class="ri-folder-zip-line"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <h5 class="fs-13 mb-1">
                    <BLink href="#" class="text-body text-truncate d-block"
                      >App pages.zip</BLink
                    >
                  </h5>
                  <div class="text-muted">2.2MB</div>
                </div>
                <div class="flex-shrink-0 ms-2">
                  <div class="d-flex gap-1">
                    <BButton
                      variant="white"
                      class="btn-icon text-muted btn-sm fs-18"
                      ><i class="ri-download-2-line"></i>
                    </BButton>
                    <div class="dropdown">
                      <BButton
                        variant="white"
                        class="btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="ri-more-fill"></i>
                      </BButton>
                      <ul class="dropdown-menu">
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-share-line align-bottom me-2 text-muted"
                            ></i>
                            Share</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-bookmark-line align-bottom me-2 text-muted"
                            ></i>
                            Bookmark</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-delete-bin-line align-bottom me-2 text-muted"
                            ></i>
                            Delete</BLink
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border rounded border-dashed p-2">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-xs">
                    <div
                      class="avatar-title bg-light text-secondary rounded fs-20"
                    >
                      <i class="ri-file-ppt-2-line"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <h5 class="fs-13 mb-1">
                    <BLink href="#" class="text-body text-truncate d-block"
                      >Velzon admin.ppt</BLink
                    >
                  </h5>
                  <div class="text-muted">2.4MB</div>
                </div>
                <div class="flex-shrink-0 ms-2">
                  <div class="d-flex gap-1">
                    <BButton
                      variant="white"
                      class="btn-icon text-muted btn-sm fs-18"
                      ><i class="ri-download-2-line"></i>
                    </BButton>
                    <div class="dropdown">
                      <BButton
                        variant="white"
                        class="btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="ri-more-fill"></i>
                      </BButton>
                      <ul class="dropdown-menu">
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-share-line align-bottom me-2 text-muted"
                            ></i>
                            Share</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-bookmark-line align-bottom me-2 text-muted"
                            ></i>
                            Bookmark</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-delete-bin-line align-bottom me-2 text-muted"
                            ></i>
                            Delete</BLink
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border rounded border-dashed p-2">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-xs">
                    <div
                      class="avatar-title bg-light text-secondary rounded fs-20"
                    >
                      <i class="ri-folder-zip-line"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <h5 class="fs-13 mb-1">
                    <BLink href="#" class="text-body text-truncate d-block"
                      >Images.zip</BLink
                    >
                  </h5>
                  <div class="text-muted">1.2MB</div>
                </div>
                <div class="flex-shrink-0 ms-2">
                  <div class="d-flex gap-1">
                    <BButton
                      variant="white"
                      class="btn-icon text-muted btn-sm fs-18"
                      ><i class="ri-download-2-line"></i>
                    </BButton>
                    <div class="dropdown">
                      <BButton
                        variant="white"
                        class="btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="ri-more-fill"></i>
                      </BButton>
                      <ul class="dropdown-menu">
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-share-line align-bottom me-2 text-muted"
                            ></i>
                            Share</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-bookmark-line align-bottom me-2 text-muted"
                            ></i>
                            Bookmark</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-delete-bin-line align-bottom me-2 text-muted"
                            ></i>
                            Delete</BLink
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border rounded border-dashed p-2">
              <div class="d-flex align-items-center">
                <div class="flex-shrink-0 me-3">
                  <div class="avatar-xs">
                    <div
                      class="avatar-title bg-light text-secondary rounded fs-20"
                    >
                      <i class="ri-image-2-line"></i>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1 overflow-hidden">
                  <h5 class="fs-13 mb-1">
                    <BLink href="#" class="text-body text-truncate d-block"
                      >bg-pattern.png</BLink
                    >
                  </h5>
                  <div class="text-muted">1.1MB</div>
                </div>
                <div class="flex-shrink-0 ms-2">
                  <div class="d-flex gap-1">
                    <BButton
                      variant="white"
                      class="btn-icon text-muted btn-sm fs-18"
                      ><i class="ri-download-2-line"></i>
                    </BButton>
                    <div class="dropdown">
                      <BButton
                        variant="white"
                        class="btn-icon text-muted btn-sm fs-18 dropdown"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i class="ri-more-fill"></i>
                      </BButton>
                      <ul class="dropdown-menu">
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-share-line align-bottom me-2 text-muted"
                            ></i>
                            Share</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-bookmark-line align-bottom me-2 text-muted"
                            ></i>
                            Bookmark</BLink
                          >
                        </li>
                        <li>
                          <BLink class="dropdown-item" href="#"
                            ><i
                              class="ri-delete-bin-line align-bottom me-2 text-muted"
                            ></i>
                            Delete</BLink
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center mt-2">
              <BButton variant="danger"
                >Load more <i class="ri-arrow-right-fill align-bottom ms-1"></i
              ></BButton>
            </div>
          </div>
        </div>
      </div>
    </BOffcanvas> -->

    <!-- ✅ Delete Confirmation Modal -->
    <BModal
      v-model="isDeleteModalOpen"
      hide-footer
      hide-header-close
      centered
      no-close-on-backdrop
      class="v-modal-custom"
    >
      <div class="modal-body text-center">
        <!-- Lottie Animation -->
        <lottie
          colors="primary:#f7b84b,secondary:#405189"
          trigger="loop"
          :options="defaultDelete"
          :height="130"
          :width="130"
        />

        <div class="mt-4">
          <h4 class="mb-3 text-danger">Confirm Delete</h4>
          <p class="text-muted mb-4">
            Are you sure you want to delete
            <strong>{{ username }}</strong
            >?<br />
            This action cannot be undone.
          </p>

          <div class="hstack gap-2 justify-content-center">
            <BButton
              variant="link"
              class="fw-medium text-muted"
              @click="isDeleteModalOpen = false"
            >
              <i class="ri-close-line me-1 align-middle"></i> Cancel
            </BButton>

            <BButton
              type="button"
              variant="danger"
              :disabled="isLoad"
              @click="confirmDelete()"
            >
              <span v-if="isLoad" class="d-flex align-items-center">
                <span
                  class="spinner-border spinner-border-sm me-2"
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </span>
                Loading...
              </span>
              <span v-else>Delete</span>
            </BButton>
          </div>
        </div>
      </div>
    </BModal>
  </Layout>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import simplebar from "simplebar-vue";
import { MoreVerticalIcon } from "@zhuowenli/vue-feather-icons";
import { required, helpers } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import Layout from "@/layouts/main.vue";
import Lottie from "@/components/widgets/lottie.vue";
import animationDefaultTalk from "@/components/widgets/zpxybbhl.json";
import animationDefaultSingle from "@/components/widgets/dklbhvrt.json";
import animationDefaultDelete from "@/components/widgets/tdrtiskw.json";
import animationDefaultFind from "@/components/widgets/msoeawqm.json";
import { useStore } from "vuex";

import Toast from "@/helpers/Toast";
import {
  getUserMessages,
  chatUserMessage,
  sendUserMessage,
  deleteUserMessage,
} from "@/api-request";

const store = useStore();
const currentUserId = computed(() => store.state.auth.user?.id || null);

const username = ref("");
const profile = ref("");

// -------------------- STATE --------------------
const defaultTalk = { animationData: animationDefaultTalk };
const defaultSingle = { animationData: animationDefaultSingle };
const defaultFind = { animationData: animationDefaultFind };

const searchQuery = ref("");
const selectedUserId = ref("");

const isLoading = ref(false);
const showOffcanvas = ref(false);
const submitted = ref(false);
const showChat = ref(false);
const isLoad = ref(false);

const form = reactive({
  message: "",
});

const userData = ref([]);
const chatData = ref([]);

const closeChat = () => {
  showChat.value = false;
};

const defaultDelete = { animationData: animationDefaultDelete };
const isDeleteModalOpen = ref(false);

// Vuelidate ============================================
const rules = {
  form: {
    message: {
      required: helpers.withMessage("Message is required", required),
    },
  },
};

const v$ = useVuelidate(rules, { form });

const scrollToBottom = (id) => {
  setTimeout(() => {
    const wrapper = document
      .getElementById(id)
      ?.querySelector("#chat-conversation .simplebar-content-wrapper");

    const offsetHeight =
      document.getElementsByClassName("chat-conversation-list")[0]
        ?.scrollHeight -
        window.innerHeight +
        600 || 0;

    if (wrapper && offsetHeight) {
      wrapper.scrollTo({
        top: offsetHeight,
        behavior: "smooth",
      });
    }
  }, 300);
};

const openDeleteModal = () => {
  isDeleteModalOpen.value = true;
};

// -------------------- METHODS --------------------
const fetchData = async () => {
  isLoading.value = true;
  try {
    const response = await getUserMessages({ search: searchQuery.value });
    userData.value = response;
  } catch (error) {
    console.error(error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    isLoading.value = false;
  }
};

const chatUsername = async (name, image, otherUserId) => {
  username.value = name;
  profile.value = image;
  selectedUserId.value = otherUserId;

  try {
    const response = await chatUserMessage(otherUserId);
    searchQuery;

    let chats = [];

    if (response && response.chat) {
      chats = response.chat.map((msg) => ({
        message: msg.message,
        time: msg.time,
        align: msg.senderId === currentUserId.value ? "right" : "left",
        msgStatus: msg.msgStatus,
      }));
    }

    scrollToBottom("users-chat");
    showChat.value = true;
    chatData.value = chats;
  } catch (error) {
    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while fetching messages.",
    });
  }
};

const formSubmit = async () => {
  submitted.value = true;
  v$.value.$touch();

  if (v$.value.$invalid) return;

  const newMessage = {
    message: form.message,
    senderId: currentUserId.value,
    receiverId: selectedUserId.value,
    msgStatus: {
      isSent: true,
      isDelivered: false,
      isSeen: false,
    },
  };

  try {
    await sendUserMessage(newMessage);

    chatData.value.push({
      message: newMessage.message,
      time: "just now",
      align: "right",
      msgStatus: newMessage.msgStatus,
    });

    scrollToBottom("users-chat");

    submitted.value = false;
    form.message = "";
  } catch (error) {
    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message ||
        "An error occurred while sending message.",
    });
  }
};

const confirmDelete = async () => {
  isLoad.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await deleteUserMessage(selectedUserId.value);

    Toast.fire({
      icon: "success",
      title: response?.message || "Process completed successfully.",
    });

    isDeleteModalOpen.value = false;
    showChat.value = false;
    fetchData();
  } catch (error) {
    console.error(error);

    Toast.fire({
      icon: "error",
      title:
        error.response?.data?.message || "An error occurred while processing.",
    });
  } finally {
    isLoad.value = false;
  }
};

// -------------------- LIFECYCLE --------------------
onMounted(() => {
  fetchData();
});
</script>
