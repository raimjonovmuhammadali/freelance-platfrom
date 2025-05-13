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
        <img src="~/assets/icon/tg.svg" alt="instagram" class="w-[20px] h-[20px]">
      </a>
      <a
        href="https://instagram.com/milliyhunar"
        target="_blank"
        aria-label="Instagram sahifamiz"
        class="text-amber-600 hover:text-amber-700 transition-all duration-200"
      >
        <img src="~/assets/icon/ins.svg" alt="instagram" class="w-[20px] h-[20px]">
      </a>
    </div>
    <ul class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-center">
      <li>
        <nuxt-link
          to="/"
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
          to="/"
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