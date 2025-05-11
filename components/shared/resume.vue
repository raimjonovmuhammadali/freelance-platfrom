<script setup>
import { ref, onMounted } from "vue";
import { baseURL } from "@/composables/useApi";

const items = ref([]);
const loading = ref(true);
const error = ref(null);

// Fetch resumes
const getCategory = async () => {
  try {
    const response = await fetch(`${baseURL}/resumes`);
    if (!response.ok) {
      throw new Error("Ma’lumot yuklanmadi");
    }
    const data = await response.json();
    items.value = data;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
    alert(error.value);
  } finally {
    loading.value = false;
  }
};

// Navigate to resume file
const openResume = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") {
    alert("Noto‘g‘ri fayl URL manzili");
    return;
  }

  // If the URL is absolute (starts with http/https), use it directly
  if (fileUrl.startsWith("http")) {
    window.location.href = fileUrl;
  } else {
    // If the URL is relative, prepend baseURL
    const absoluteUrl = `${baseURL}${fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`}`;
    window.location.href = absoluteUrl;
  }
};

onMounted(() => {
  getCategory();
});
</script>

<template>
  <div class="w-full min-h-[300px]">
    <!-- Loading State -->
    <div
      v-if="loading"
      class="flex justify-center items-center min-h-[300px]"
    >
      <span class="loader"></span>
      <span class="ml-3 text-gray-600 dark:text-gray-300">Yuklanmoqda...</span>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="text-center py-6 text-red-500 dark:text-red-400"
    >
      {{ error }}
    </div>

    <!-- Resumes List -->
    <div v-else class="grid gap-4 md:grid-cols-3">
      <nuxt-link
        v-for="item in items"
        :key="item.id"
        :to="`/resumes/${item.id}`"
        class="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl flex justify-between items-center group"
        :aria-label="`View resume of ${item.user.first_name} ${item.user.last_name}`"
      >
        <div class="flex flex-col gap-3 items-start">
          <h2
            class="text-[#1a1a1a]  text-xl font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
          >
            {{ item.user.first_name }} {{ item.user.last_name }}
          </h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {{ item.user.location }}
          </p>
        </div>
        <a
          :href="item.resume_file"
          class="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 flex items-center gap-2"
          :aria-label="`Open resume of ${item.user.first_name} ${item.user.last_name}`"
          @click.prevent="openResume(item.resume_file)"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
          Ochish
        </a>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #e5e7eb; /* Tailwind gray-200 */
  border-top: 4px solid #3b82f6; /* Tailwind blue-500 */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>