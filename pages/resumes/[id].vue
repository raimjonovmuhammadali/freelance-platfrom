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
  <section>
    <LayoutsNavbar />

    <main class="w-full">
      <section class="w-[90%] mx-auto py-5 flex flex-col md:flex-row justify-between gap-5">
        <div
          class="bg-gray-200 p-5 w-full md:w-[30%] h-[300px] flex flex-col gap-2 items-center justify-center text-center rounded-md"
        >
          <img
            src="~/assets/images/card1.png"
            alt=""
            class="rounded-full w-[100px] h-[100px]"
          />
          <div class="flex flex-col gap-2 items-center">
            <h2 class="text-[#333333] text-lg font-semibold">
              Muhammadali Rayimjonov
            </h2>
            <h2 class="text-pink-500 text-[14px]">3 000 000 dan</h2>
            <div class="w-full flex gap-2 items-center">
              <p class="text-gray-500 text-[12px]">Web dasturchi</p>
              <p class="text-gray-500 text-[12px]">Frontend</p>
              <p class="text-gray-500 text-[12px]">Telegram bot</p>
            </div>
            <p class="text-gray-600 text-[14px]">Farg'ona</p>
          </div>
        </div>

        <div class="bg-gray-200 p-5 w-full md:w-[70%] flex flex-col gap-2 rounded-md">
          <h1 class="text-[20px] font-bold">Qilgan ishlarim</h1>
          <hr />
          <div class="w-full flex flex-wrap justify-between gap-2 md:gap-0">
            <nuxt-link
              v-for="item in items"
              :key="item.id"
              to=""
              class="w-full md:w-[33%] bg-white shadow-md p-6 rounded-lg flex flex-col flex-wrap gap-2"
            >
              <img
                :src="`${baseURL}${item.image}`"
                alt=""
                class="w-full h-[200px] md:h-[200px] object-cover"
              />
              <h2 class="text-[#333333] text-lg font-semibold">
                {{ item.title }}
              </h2>
              <h2 class="text-pink-500 text-[14px]">{{ item.city }}</h2>
              <p class="text-gray-600">
                {{ item.description }}
              </p>
            </nuxt-link>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>
