<script setup>
const emit = defineEmits(["change-tab"]);
</script>
<template>
    <div class="bg-white p-6 rounded-xl shadow-md w-[500px]">
    <!-- Close icon -->
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Регистрация</h2>
      <nuxt-link to="/"><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L21 21M21 1L1 21" stroke="#C2CDCE" stroke-linecap="round"/>
        </svg></nuxt-link> 
    </div>

    <!-- Toggle buttons -->
    <div class="flex mb-4 border border-gray-300 rounded-md overflow-hidden">
      <button class="w-1/2 py-2 text-sm font-medium bg-gray-100 text-gray-400 border-r border-gray-300 hover:bg-white">Соискатель</button>
      <button class="w-1/2 py-2 text-sm font-medium bg-gray-100 text-gray-400 hover:bg-white">Компания</button>
    </div>

    <!-- Email input -->
    <label class="block text-sm text-gray-700 mb-1">Email</label>
    <input 
      type="email" 
      placeholder="someemail@mail.com" 
      class="w-full mb-4 px-4 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    >

    <!-- Password -->
    <div class="flex justify-between items-center mb-1">
      <label class="text-sm text-gray-700">Пароль</label>
      <a href="#" class="text-sm text-gray-400 hover:underline">Я забыл пароль</a>
    </div>
    <input 
      type="password" 
      placeholder="Введите пароль" 
      class="w-full mb-6 px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    >

    <!-- Submit button -->
    <button class="w-full border border-pink-500 text-pink-500 py-2 rounded-md hover:bg-pink-50 transition">
      Зарегистрироваться
    </button>

    <!-- Already have account -->
    <p class="text-center text-sm text-gray-500 mt-4 cursor-pointer" @click="emit('change-tab', 'login')">У меня уже есть аккаунт</p>
  </div>
</template>