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
      <section
        class="w-[90%] mx-auto py-5 flex flex-col md:flex-row justify-between gap-5"
      >
        <div class="w-6/12 flex flex-col gap-2 rounded-md">
          <nuxt-link
            to="/workes/1"
            class="w-full bg-white p-6 rounded-lg flex flex-col gap-2 items-start border border-gray-300"
          >
            <h2 class="text-[#333333] text-2xl font-semibold">
              Web dasturchi kerak
            </h2>
            <h2 class="text-pink-500 text-[16px]">
              3 000 000 dan oylik
            </h2>
            <p class="text-gray-700 text-[16px]">Tajriba: 1-2 yil</p>
            <p class="text-gray-700 text-[16px] font-bold mt-5">Tavsif:</p>
            <p class="text-gray-600 text-[16px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero exercitationem beatae ad, perspiciatis cumque a excepturi debitis ea odit minus officiis quae nihil nesciunt veniam et fugit obcaecati delectus nulla!</p>
          </nuxt-link>
        </div>

        <div class="w-6/12 flex flex-col gap-2 rounded-md">
          <nuxt-link
            to="/workes/1"
            class="w-full bg-white p-6 rounded-lg flex flex-col gap-2 items-start border border-gray-300"
          >
            <h2 class="text-[#333333] text-2xl font-semibold">
              &copy; IT SOFT
            </h2>
            <p class="text-gray-700 text-[16px] font-bold mt-5">Kompnaiya haqida:</p>
            <p class="text-gray-600 text-[16px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero exercitationem beatae ad, perspiciatis cumque a excepturi debitis ea odit minus officiis quae nihil nesciunt veniam et fugit obcaecati delectus nulla! Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ad aut qui assumenda, accusamus velit est. Nesciunt veritatis quidem incidunt facilis officia? Mollitia labore explicabo, atque saepe similique aliquam enim. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus totam eos aliquid nam et nesciunt voluptas reiciendis dolor rerum consequuntur, voluptates nostrum ea, atque in minima repellendus animi, fugit perspiciatis?</p>
            <button class="text-white rounded-md text-[16px] mt-5 bg-blue-600 py-3 px-4 cursor-pointer">Bog'lanish</button>
          </nuxt-link>
        </div>
      </section>
    </main>
  </section>
</template>
