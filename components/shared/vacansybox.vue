<script setup>
import { ref, onMounted } from "vue";
import { baseURL } from "@/composables/useApi";

const items = ref([]);
const loading = ref(true); // boshlanishida true bo‘lsin
const error = ref(null);

const getCategory = async () => {
  try {
    const response = await fetch(`${baseURL}/projects`);
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
  getCategory();
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
  <div v-else class="w-full flex flex-wrap justify-between items-center gap-4">
    <nuxt-link
      v-for="item in items"
      :key="item.id"
      to=""
      class="w-full md:w-[32%] bg-white shadow-md p-6 rounded-lg flex flex-col gap-2"
    >
      <img
        :src="`${baseURL}${item.image}`"
        alt=""
        class="w-full h-[200px] md:h-[200px] object-cover"
      />
      <h2 class="text-[#333333] text-lg font-semibold">{{ item.title }}</h2>
      <h2 class="text-pink-500 text-[14px]">{{ item.city }}</h2>
      <p class="text-gray-600">
        {{ item.description }}
      </p>
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

