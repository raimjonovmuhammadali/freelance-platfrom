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
      to="/workes/1"
      class="w-full md:w-[32%] bg-white shadow-md p-6 rounded-lg flex flex-col gap-2 items-start"
    >
      <h2 class="text-[#333333] text-lg font-semibold">Web dasturchi kerak</h2>
      <h2 class="text-pink-500 text-[14px]">3 000 000 dan / 1 yil tajriba</h2>
      <p class="text-gray-700 text-[14px] font-bold">
        IT SOFT
      </p>
      <p class="text-gray-600 text-[14px]">
        Farg'ona
      </p>

      <button class="text-[14px] px-5 py-2 text-white rounded-md cursor-pointer" style="background-color: darkblue; width: 100px;">Bog'lanish</button>
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

