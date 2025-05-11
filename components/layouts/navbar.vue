<script setup>
import { ref, onMounted } from "vue";

const isLogin = ref(false);
const { profileData, loading, error, fetchProfile } = useProfile();
const isMobileMenuOpen = ref(false); // For mobile menu toggle

onMounted(() => {
  if (process.client) {
    isLogin.value = !!localStorage.getItem("access_token");
  }
  if (!profileData.value) {
    fetchProfile();
  }
});

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>

<template>
  <header class="w-full bg-white dark:bg-gray-900 shadow-md">
    <nav
      class="w-[90%] mx-auto flex items-center justify-between py-4 md:py-5"
    >
      <!-- Logo and Title -->
      <div class="flex items-center gap-3">
        <img
          src="~/assets/icon/carbon_laptop.svg"
          alt="Kasb Hunar logo"
          class="h-8 w-8"
          aria-hidden="true"
        />
        <nuxt-link
          to="/"
          class="text-gray-900 dark:text-white text-2xl font-bold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Kasb Hunar Home"
        >
          Kasb Hunar
        </nuxt-link>
      </div>

      <!-- Desktop Navigation -->
      <div
        class="hidden md:flex items-center gap-8"
      >
        <nuxt-link
          to="/resume"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Mutahasislar sahifasi"
        >
          Mutahasislar
        </nuxt-link>
        <nuxt-link
          to="/work"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Ishlar sahifasi"
        >
          Ishlar
        </nuxt-link>
        <nuxt-link
          to="/price"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          aria-label="Biz haqimizda sahifasi"
        >
          Biz haqimizda
        </nuxt-link>
      </div>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-4">
        <a
          v-if="profileData?.is_freelancer"
          href="/profile/createResume"
          class="text-pink-500 dark:text-pink-400 flex items-center gap-2 text-base font-semibold hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200"
          aria-label="Resume qo'shish"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Resume qo'shish
        </a>
        <a
          v-if="profileData?.is_client"
          href="/profile/createWork"
          class="text-pink-500 dark:text-pink-400 flex items-center gap-2 text-base font-semibold hover:text-pink-600 dark:hover:text-pink-300 transition-colors duration-200"
          aria-label="Ish qo'shish"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Ish qo'shish
        </a>
        <nuxt-link
          :to="isLogin ? '/profile' : '/auth'"
          class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-base font-semibold px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          :aria-label="isLogin ? 'Profilimga o‘tish' : 'Kirish sahifasiga o‘tish'"
        >
          {{ isLogin ? "Profilim" : "Kirish" }}
        </nuxt-link>
      </div>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-gray-700 dark:text-gray-300"
        @click="toggleMobileMenu"
        aria-label="Mobil menyu ochish/yopish"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          ></path>
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white dark:bg-gray-900 w-full px-4 py-4 shadow-md"
    >
      <div class="flex flex-col gap-4">
        <nuxt-link
          to="/resume"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
          @click="toggleMobileMenu"
          aria-label="Mutahasislar sahifasi"
        >
          Mutahasislar
        </nuxt-link>
        <nuxt-link
          to="/work"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
          @click="toggleMobileMenu"
          aria-label="Ishlar sahifasi"
        >
          Ishlar
        </nuxt-link>
        <nuxt-link
          to="/price"
          class="text-gray-700 dark:text-gray-300 text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
          @click="toggleMobileMenu"
          aria-label="Biz haqimizda sahifasi"
        >
          Biz haqimizda
        </nuxt-link>
        <a
          v-if="profileData?.is_freelancer"
          href="/profile/createResume"
          class="text-pink-500 dark:text-pink-400 flex items-center gap-2 text-base font-semibold hover:text-pink-600 dark:hover:text-pink-300"
          @click="toggleMobileMenu"
          aria-label="Resume qo'shish"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Resume qo'shish
        </a>
        <a
          v-if="profileData?.is_client"
          href="/profile/createWork"
          class="text-pink-500 dark:text-pink-400 flex items-center gap-2 text-base font-semibold hover:text-pink-600 dark:hover:text-pink-300"
          @click="toggleMobileMenu"
          aria-label="Ish qo'shish"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Ish qo'shish
        </a>
        <nuxt-link
          :to="isLogin ? '/profile' : '/auth'"
          class="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-base font-semibold px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          @click="toggleMobileMenu"
          :aria-label="isLogin ? 'Profilimga o‘tish' : 'Kirish sahifasiga o‘tish'"
        >
          {{ isLogin ? "Profilim" : "Kirish" }}
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* No additional styles needed since Tailwind handles everything */
</style>