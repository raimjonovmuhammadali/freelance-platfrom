<script setup>
import { ref, onMounted } from "vue";
import { baseURL } from "@/composables/useApi";

const items = ref([]);
const loading = ref(true); // boshlanishida true bo‘lsin
const error = ref(null);

const getJobs = async () => {
  try {
    const response = await fetch(`${baseURL}/jobs`);
    if (!response.ok) {
      throw new Error("Ma’lumot yuklanmadi");
    }
    const data = await response.json();
    items.value = data;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
  } finally {
    loading.value = false; // ma’lumotlar yuklandi yoki xato bo‘ldi
  }
};

onMounted(() => {
  getJobs();
});
</script>

<template>
  <!-- Loader ko‘rsatish -->
  <div v-if="loading" class="w-full flex justify-center items-center min-h-[300px]">
    <span class="loader"></span>
  </div>

  <!-- Xato bo‘lsa -->
  <div v-else-if="error" class="text-red-500 text-center">
    {{ error }}
  </div>

  <!-- Ma’lumotlar -->
 <div v-else class="grid gap-4 md:grid-cols-3">
    <nuxt-link
      v-for="item in items"
      :key="item.id"
      :to="`/workes/${item.id}`"
      class="w-full bg-white  shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl flex flex-col gap-4 items-start group"
      :aria-label="`View details for ${item.title}`"
    >
      <div class="flex flex-col gap-2 w-full">
        <h2
          class="text-gray-900  text-xl font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
        >
          {{ item.title }}
        </h2>
        <h3 class="text-pink-500 dark:text-pink-400 text-base font-semibold">
          {{ Math.floor(item.budget) }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
          {{ item.description }}
        </p>
      </div>
      <button
        class="bg-blue-900 dark:bg-blue-800 text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-200 w-full md:w-auto"
        :aria-label="`Contact for ${item.title}`"
        @click.prevent
      >
        Bog'lanish
      </button>
    </nuxt-link>
  </div>
</template>

<style scoped>
.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #10b981; /* Tailwind green-500 */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

