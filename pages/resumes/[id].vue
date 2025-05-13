<script setup>
import { ref, onMounted, computed } from "vue";
import { baseURL } from "@/composables/useApi";
import { useRoute } from "vue-router";

const item = ref(null); // Changed from items to item since API returns a single object
const loading = ref(true);
const error = ref(null);

const route = useRoute();

// Fetch resume data
const getCategory = async () => {
  const id = route.params.id;
  try {
    const response = await fetch(`${baseURL}/resumes/${id}`);
    if (!response.ok) {
      throw new Error("Ma’lumot yuklanmadi");
    }
    const data = await response.json();
    item.value = data;
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
  const absoluteUrl = fileUrl.startsWith("http")
    ? fileUrl
    : `${baseURL}${fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`}`;
  window.location.href = absoluteUrl;
};

// Format date for display
const formattedDate = computed(() => {
  if (!item.value?.created_date) return "";
  return new Date(item.value.created_date).toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

onMounted(() => {
  getCategory();
});
</script>

<template>
  <section class="min-h-screen bg-gray-50">
    <LayoutsNavbar />

    <main class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center text-red-500 py-8">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <section v-else-if="item" class="flex flex-col md:flex-row gap-6">
        <!-- Profile Card -->
        <div class="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 flex flex-col items-center text-center">
          <img
            :src="item.user.profile_picture"
            alt="Profile"
            class="rounded-full w-24 h-24 object-cover mb-4"
          />
          <h2 class="text-xl font-bold text-gray-800">{{ item.user.first_name }}{{ item.user.last_name }}</h2>
          <p class="text-gray-500 text-sm mt-1">{{ item.user.email }}</p>
          <p class="text-gray-600 text-sm mt-2">{{ item.user.location }}</p>
          <button
            @click="openResume(item.resume_file)"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Rezyumeni ko‘rish
          </button>
        </div>

        <!-- Work Details -->
        <div class="bg-white shadow-lg rounded-lg p-6 w-full md:w-2/3">
          <h1 class="text-2xl font-bold text-gray-800 mb-4">Qilgan ishlarim</h1>
          <hr class="mb-4" />
          <div class="flex flex-col gap-4">
            <!-- Single Work Item (since API returns one object) -->
            <div class="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h2 class="text-lg font-semibold text-gray-800">{{ item.title }}</h2>
              <p class="text-sm text-gray-600 mt-1">{{ item.summary }}</p>
              <p class="text-xs text-gray-500 mt-2">Yaratilgan: {{ formattedDate }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State -->
      <div v-else class="text-center text-gray-500 py-8">
        <p>Ma’lumot topilmadi</p>
      </div>
    </main>
  </section>
</template>

<style scoped>
/* Add custom styles if needed */
</style>