<script setup>
import { ref, onMounted } from 'vue'

const isLogin = ref(false)

onMounted(() => {
  if (process.client) {
    isLogin.value = !!localStorage.getItem('access_token')
  }
})
</script>


<template>
     <header class="w-full h-[10vh] mb-5">
      <nav class="w-[90%] mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div class="hidden md:flex space-x-4 mb-4 md:mb-0">
          <nuxt-link to="resume" class="text-gray-700 text-xl">Mutahasislar</nuxt-link>
          <nuxt-link to="work" class="text-gray-700 text-xl">Ishlar</nuxt-link>
          <nuxt-link to="price" class="text-gray-700 text-xl">Biz haqimizda</nuxt-link>
        </div>
        <div class="flex items-center gap-[10px] mb-4 md:mb-0">
          <img
            src="~/assets/icon/carbon_laptop.svg"
            alt="Homester.pro logo"
            class="h-8"
          />
          <nuxt-link to="/" class="text-gray-700 font-bold text-xl">Kasb Hunar</nuxt-link>
        </div>
        <div class="flex space-x-4 items-center">
          <a class="text-pink-500 flex items-center" href="/profile/createResume">
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9289 11.1429H12.8574V7.07146C12.8574 6.95361 12.761 6.85718 12.6431 6.85718H11.3574C11.2396 6.85718 11.1431 6.95361 11.1431 7.07146V11.1429H7.07171C6.95385 11.1429 6.85742 11.2393 6.85742 11.3572V12.6429C6.85742 12.7607 6.95385 12.8572 7.07171 12.8572H11.1431V16.9286C11.1431 17.0465 11.2396 17.1429 11.3574 17.1429H12.6431C12.761 17.1429 12.8574 17.0465 12.8574 16.9286V12.8572H16.9289C17.0467 12.8572 17.1431 12.7607 17.1431 12.6429V11.3572C17.1431 11.2393 17.0467 11.1429 16.9289 11.1429Z"
                  fill="#FF4A96"
                />
                <path
                  d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM12 21.9643C6.49821 21.9643 2.03571 17.5018 2.03571 12C2.03571 6.49821 6.49821 2.03571 12 2.03571C17.5018 2.03571 21.9643 6.49821 21.9643 12C21.9643 17.5018 17.5018 21.9643 12 21.9643Z"
                  fill="#FF4A96"
                />
              </svg>
            </button>
            <span class="ml-1">Resume qo'shish</span>
          </a>
          <a class="text-pink-500 flex items-center" href="/profile/createWork">
            <button>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.9289 11.1429H12.8574V7.07146C12.8574 6.95361 12.761 6.85718 12.6431 6.85718H11.3574C11.2396 6.85718 11.1431 6.95361 11.1431 7.07146V11.1429H7.07171C6.95385 11.1429 6.85742 11.2393 6.85742 11.3572V12.6429C6.85742 12.7607 6.95385 12.8572 7.07171 12.8572H11.1431V16.9286C11.1431 17.0465 11.2396 17.1429 11.3574 17.1429H12.6431C12.761 17.1429 12.8574 17.0465 12.8574 16.9286V12.8572H16.9289C17.0467 12.8572 17.1431 12.7607 17.1431 12.6429V11.3572C17.1431 11.2393 17.0467 11.1429 16.9289 11.1429Z"
                  fill="#FF4A96"
                />
                <path
                  d="M12 0C5.37321 0 0 5.37321 0 12C0 18.6268 5.37321 24 12 24C18.6268 24 24 18.6268 24 12C24 5.37321 18.6268 0 12 0ZM12 21.9643C6.49821 21.9643 2.03571 17.5018 2.03571 12C2.03571 6.49821 6.49821 2.03571 12 2.03571C17.5018 2.03571 21.9643 6.49821 21.9643 12C21.9643 17.5018 17.5018 21.9643 12 21.9643Z"
                  fill="#FF4A96"
                />
              </svg>
            </button>
            <span class="ml-1">Ish qo'shish</span>
          </a>
          <nuxt-link :to="isLogin ? '/profile' : '/auth'" class="text-gray-700 bg-[#F8F8F8] rounded-sm w-[61px] h-[24px] flex items-center justify-center text-base">{{ isLogin ? 'Profilim' : 'Kirish'}}</nuxt-link>
        </div>
      </nav>
  </header>
</template>