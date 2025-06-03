<script setup>
import { ref, onMounted } from 'vue';
import { baseURL } from '@/composables/useApi';

const items = ref([]);
const loading = ref(false);
const error = ref(null);
const isLogin = ref(false);
const role = ref(false)

const getCategory = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${baseURL}/categories`);
    if (!response.ok) {
      throw new Error("Ma'lumotlar yuklanmadi");
    }
    const data = await response.json();
    items.value = data;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (process.client) {
    isLogin.value = !!localStorage.getItem('access_token');
    role.value = localStorage.getItem('role');
  }
  getCategory();
});
</script>

<template>
  <LayoutsNavbar />

  <main class="w-full bg-white">
    <!-- Hero bo'limi -->
    <section
      class="w-full min-h-[80vh] flex items-center justify-center text-center bg-white"
    >
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Freelansing orqali o‘z karyerangizni boshlang
        </h1>
        <p class="text-gray-600 text-lg mb-6">
          Dunyoning istalgan nuqtasidan loyihalarda ishlang. Eng yaxshi vakansiya va freelanserlar bazasi.
        </p>
        <nuxt-link
          :to="isLogin ? role == 'client' ? '/profile/createWork' : role == 'freelance' ? '/profile/createResume' : '/auth/'  : '/auth/'"
          class="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          {{ isLogin ? role == 'client' ? 'Ish joylashtirish' : role == 'freelance' ? 'Resume qo\'shish' : ''  : 'Ro\'yxatdan o\'tish'}}
        </nuxt-link>
      </div>
    </section>

    <!-- Qidiruv paneli -->
    <section class="w-full py-6 px-4">
      <nav
        class="max-w-5xl mx-auto bg-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-md"
      >
        <div
          class="w-full sm:w-2/3 flex items-center bg-white rounded-md p-2 gap-2 text-gray-600 shadow-sm"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 18.954L14.4133 13.3673C15.7558 11.7556 16.4253 9.68835 16.2825 7.59562C16.1396 5.50288 15.1954 3.54579 13.6464 2.13146C12.0973 0.717125 10.0626 -0.0455437 7.96554 0.00210549C5.86847 0.0497547 3.87051 0.904053 2.38728 2.38728C0.904053 3.87051 0.0497547 5.86847 0.00210549 7.96554C-0.0455437 10.0626 0.717125 12.0973 2.13146 13.6464C3.54579 15.1954 5.50288 16.1396 7.59562 16.2825C9.68835 16.4253 11.7556 15.7558 13.3673 14.4133L18.954 20L20 18.954ZM1.50598 8.16382C1.50598 6.84703 1.89645 5.5598 2.62803 4.46492C3.3596 3.37004 4.39941 2.51669 5.61598 2.01277C6.83254 1.50886 8.17121 1.37701 9.46271 1.6339C10.7542 1.8908 11.9405 2.5249 12.8716 3.45601C13.8028 4.38713 14.4369 5.57345 14.6937 6.86494C14.9506 8.15644 14.8188 9.49511 14.3149 10.7117C13.811 11.9282 12.9576 12.9681 11.8627 13.6996C10.7678 14.4312 9.48062 14.8217 8.16382 14.8217C6.39865 14.8197 4.70634 14.1176 3.45818 12.8695C2.21001 11.6213 1.50793 9.92899 1.50598 8.16382Z"
              fill="#6B7280"
            />
          </svg>
          <input
            class="flex-grow bg-transparent focus:outline-none"
            type="text"
            placeholder="Vakansiya qidirish"
          />
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <nuxt-link to="/work"
            class="w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
          >
            Barcha vakansiyalar
          </nuxt-link>
          <nuxt-link to="/resume"
            class="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-all"
          >
            Barcha rezyumelar
          </nuxt-link>
        </div>
      </nav>
    </section>

    <!-- Kategoriyalar -->
    <section class="py-10 px-4">
      <div
        class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
      >
        <nuxt-link :to="`/category/${item.id}`"
          v-for="item in items"
          :key="item.id"
          class="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200 text-center"
        >
          <img
            :src="`${item.image}`"
            :alt="item.name"
            class="w-12 h-12 mx-auto mb-2"
          />

          <p class="text-gray-700">{{ item.name }}</p>
        </nuxt-link>
      </div>
      <div v-if="loading" class="text-center text-gray-600 mt-4">
        Yuklanmoqda...
      </div>
      <div v-if="error" class="text-center text-red-500 mt-4">
        {{ error }}
      </div>
    </section>

    <!-- Ishlar va vakansiyalar -->
    <section class="py-10 px-4">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          So‘nggi ish e'lonlar
        </h2>
        <SharedWorks />
      </div>
    </section>

    <!-- Milliy kasb-hunarlar uchun xizmatlar -->
<section class="bg-gray-50 py-12 px-4">
  <div class="max-w-5xl mx-auto">
    <h1 class="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
      Milliy kasb-hunarlar uchun frilanserlik xizmatlari
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- Xizmat 1: Hunarmandchilik mahsulotlarini ro‘yxatga olish -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
      >
        <div class="w-12 h-12 mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              fill="#D97706"
            />
          </svg>
        </div>
        <h2 class="text-amber-600 font-semibold mb-2">
          Mahsulotlarni ro‘yxatga olish
        </h2>
        <p class="text-gray-600 text-sm">
          Gilam, zardo‘zlik va boshqa hunarmandchilik mahsulotlaringizni platformada professional ro‘yxatga olish.
        </p>
      </div>
      <!-- Xizmat 2: Onlayn marketing -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
      >
        <div class="w-12 h-12 mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-.86 1.83h-2v-.5c0-.83.45-1.54.95-2.04l1.14-1.15c.31-.31.51-.74.51-1.21 0-.95-.77-1.75-1.75-1.75s-1.75.8-1.75 1.75h-2c0-1.99 1.62-3.75 3.75-3.75s3.75 1.76 3.75 3.75c0 .83-.33 1.58-.84 2.15z"
              fill="#15803D"
            />
          </svg>
        </div>
        <h2 class="text-green-700 font-semibold mb-2">Onlayn marketing</h2>
        <p class="text-gray-600 text-sm">
          Milliy hunarmandchilik mahsulotlaringizni ijtimoiy tarmoqlarda targ‘ib qilish va mijozlar jalb qilish.
        </p>
      </div>
      <!-- Xizmat 3: Hunarmandlar jamoasi -->
      <div
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
      >
        <div class="w-12 h-12 mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04C17.62 14.17 22 15.33 22 17.5V19H10v-2.5c0-2.17 4.38-3.33 6.91-3.46.03-.01.06-.02.09-.04z"
              fill="#B91C1C"
            />
          </svg>
        </div>
        <h2 class="text-red-700 font-semibold mb-2">Hunarmandlar jamoasi</h2>
        <p class="text-gray-600 text-sm">
          Milliy kasb-hunar loyihalari uchun professional hunarmandlar jamoasini tuzish va boshqarish.
        </p>
      </div>
    </div>
  </div>
</section>
  </main>

  <LayoutsFooter />
</template>

<style scoped>
button,
a {
  transition: all 0.2s ease;
}

button:hover,
a:hover {
  transform: translateY(-1px);
}

input:focus {
  outline: none;
}
</style>