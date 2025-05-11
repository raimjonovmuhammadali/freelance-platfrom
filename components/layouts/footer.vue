<template>
  <footer
    class="w-full bg-gray-50 text-gray-700 py-8 flex flex-col gap-6 items-center justify-center bg-milliy-pattern bg-cover bg-center"
  >
    <div class="flex justify-center gap-4">
      <a
        href="https://t.me/milliyhunar"
        target="_blank"
        aria-label="Telegram sahifamiz"
        class="text-amber-600 hover:text-amber-700 transition-all duration-200"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.69 1.39-1.39 1.43-.83.05-1.46-.46-2.06-1.09-1.22-1.27-1.96-2.08-3.17-3.34-.35-.38-.07-1.04.46-1.17.45-.11 1.06-.22 1.61-.28.86-.09 1.61-.07 2.19.03.69.12.78.62.56 1.05-.53 1.03-1.43 2.39-1.95 2.97-.19.21-.11.54.17.73.34.23.85.29 1.36.06.59-.27 1.49-1.02 2.06-1.65.62-.69 1.51-1.77 2.02-2.93.35-.79-.05-1.22-.85-1.07z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a
        href="https://instagram.com/milliyhunar"
        target="_blank"
        aria-label="Instagram sahifamiz"
        class="text-amber-600 hover:text-amber-700 transition-all duration-200"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 5.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-1.5 5.5c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
    <ul class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
      <li>
        <nuxt-link
          to="/about"
          class="text-gray-700 hover:text-amber-600 transition-all duration-200"
          aria-label="Biz haqimizda sahifasi"
        >
          Biz haqimizda
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/contact"
          class="text-gray-700 hover:text-amber-600 transition-all duration-200"
          aria-label="Aloqa sahifasi"
        >
          Aloqa
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/help"
          class="text-gray-700 hover:text-amber-600 transition-all duration-200"
          aria-label="Yordam sahifasi"
        >
          Yordam
        </nuxt-link>
      </li>
    </ul>
    <p class="text-gray-600 text-sm">
      © 2025 Milliy Hunar — O‘zbek milliy kasb-hunarlarini frilanserlik orqali rivojlantirish platformasi
    </p>
  </footer>
</template>

<style scoped>
.bg-milliy-pattern {
  background-image: url('/assets/images/milliy-naqsh.png');
  background-size: cover;
  background-position: center;
}

a {
  transition: all 0.2s ease;
}

a:hover {
  transform: translateY(-1px);
}
</style>