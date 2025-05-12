<script setup>

import { ref, onMounted } from 'vue';
import { baseURL } from '@/composables/useApi';

const items = ref([]);
const loading = ref(false);
const error = ref(null);

const getCategory = async () =>{
    try {
      const response = await fetch(`${baseURL}/categories`)
      
      if (!response.ok) {
      throw new Error('Ma’lumot yuklanmadi');
    }
      const data = await response.json();
      items.value = data;
      console.log(items.value);
      
    } catch (err) {
    error.value = err.message || 'Xatolik yuz berdi';
  } finally {
    loading.value = false;
  }
}


onMounted(() => {
  getCategory()
})
</script>
<template>
  <LayoutsNavbar />

  <main class="w-full bg-[#F8F8F8] py-4">
    <section class="px-4 py-6">
      <div
        class="w-full md:w-[90%] flex flex-wrap md:flex-nowrap items-center  gap-4 mx-auto"
      >
        <div
          class="text-center bg-white w-full md:w-[20%] h-[100px] flex flex-col items-center justify-center text-gray-600 leading-[30px] font-normal shadow-md" v-for="item in items" :key="item.id"
        >
          <p>{{ item.name }}</p>
        </div>
      </div>
    </section>
    <section class="w-full px-4">
      <div
        class="w-[90%] bg-white flex flex-wrap sm:flex-nowrap items-center justify-center sm:justify-between gap-4 mx-auto p-3"
      >
        <div
          class="p-4 flex items-center w-full sm:w-[774px] h-[48px] bg-[#F8F8F8] rounded-[4px] gap-3 text-gray-600 focus:outline-none focus:ring-0 focus:border-transparent"
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
              fill="#849A9C"
            />
          </svg>
          <input
            class="flex-grow bg-transparent focus:outline-none focus:ring-0 focus:border-transparent"
            type="text"
            placeholder="Izlash"
          />
        </div>

        <div class="flex flex-wrap sm:flex-nowrap gap-3">
          <button
            class="text-[#849A9C] flex items-center justify-center border-[#849A9C] border px-6 py-3 cursor-pointer"
          >
            Qidirish
          </button>
        </div>
      </div>
    </section>

    <section class="w-full px-4 mt-5">
      <div class="mx-auto w-[90%] flex flex-wrap items-center justify-between">
        <SharedResume/>
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
