<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { baseURL } from "@/composables/useApi";

const items = ref([]);
const items1 = ref([]);
const loading = ref(false);
const error = ref(null);

const route = useRoute();
const categoryId = Number(route.params.id); // bu sizning URL dan kelgan category ID

const getCategory = async () => {
  try {
    const response = await fetch(`${baseURL}/categories`);
    if (!response.ok) throw new Error("Ma’lumot yuklanmadi");
    const data = await response.json();
    items.value = data;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
  } finally {
    loading.value = false;
  }
};

const getJobs = async () => {
  try {
    const response = await fetch(`${baseURL}/jobs/`);
    if (!response.ok) throw new Error("Ma’lumot yuklanmadi");
    const data = await response.json();
    items1.value = data;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
  } finally {
    loading.value = false;
  }
};

// 🔍 Faqat mos keladigan ishlarni ko'rsatamiz
const filteredItems = computed(() =>
  items1.value.filter((item) => item.category === categoryId)
);

const categoryName = computed(() => {
  const category = items.value.find((item) => item.id === categoryId);
  return category ? category.name : "Noma'lum";
});


onMounted(() => {
  getCategory();
  getJobs();
});
</script>

<template>
  <LayoutsNavbar />

  <main class="w-full bg-[#F8F8F8] py-4">
    <section class="px-4 py-6">
      <div
        class="w-full md:w-[90%] flex flex-wrap md:flex-nowrap items-center gap-4 mx-auto"
      >
        <nuxt-link
          class="text-center bg-white w-full md:w-[20%] h-[100px] flex flex-col items-center justify-center text-gray-600 leading-[30px] font-normal shadow-md"
          v-for="item in items"
          :key="item.id"
        >
          <p>{{ item.name }}</p>
        </nuxt-link>
      </div>
    </section>
    <section class="w-full px-4">
      <div
        class="w-[90%] bg-white text-gray-500 flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 mx-auto p-3"
      >
        {{ categoryName }} toifasidagi ishlar
      </div>
    </section>

    <section class="w-full px-4 mt-5">
      <div class="mx-auto w-[90%] flex flex-wrap items-center justify-between">
        <div v-if="filteredItems.length > 0" class="grid gap-4 md:grid-cols-3">
          <nuxt-link
            v-for="item in filteredItems"
            :key="item.id"
            :to="`/workes/${item.id}`"
            class="w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 rounded-xl flex flex-col gap-4 items-start group"
            :aria-label="`View details for ${item.title}`"
          >
            <div class="flex flex-col gap-2 w-full">
              <h2
                class="text-gray-900 text-xl font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
              >
                {{ item.title }}
              </h2>
              <h3
                class="text-pink-500 dark:text-pink-400 text-base font-semibold"
              >
                ${{ Math.floor(item.budget) }}
              </h3>
              <p
                class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3"
              >
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

        <!-- 🔴 Mavjud bo'lmasa, bu yerda xabar chiqadi -->
        <div v-else class="w-full text-center text-gray-500 py-10 text-lg">
          Mavjud emas
        </div>
      </div>
    </section>
  </main>
  <LayoutsFooter />
</template>

<style scoped>
.signup {
  background-image: url(../assets/images/bg.png) !important;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
