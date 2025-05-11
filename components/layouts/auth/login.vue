<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { baseURL } from '@/composables/useApi';

const emit = defineEmits(["change-tab"]);
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const loading = ref(false);

// Agar token mavjud bo‘lsa, asosiy sahifaga redirect
onMounted(() => {
  if (localStorage.getItem('access_token')) {
    router.push('/');
  }
});

// Login function
const login = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  loading.value = true;

  try {
    const response = await fetch(`${baseURL}/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      successMessage.value = 'Muvaffaqiyatli kirdingiz!';
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      router.push('/');
    } else {
      errorMessage.value = data.detail || 'Noto‘g‘ri email yoki parol.';
    }
  } catch (error) {
    errorMessage.value = 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.';
  } finally {
    loading.value = false;
  }
};
</script>


<template>
  <div class="w-full max-w-[500px] mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-2xl font-bold text-gray-800">Kirish</h2>
      <nuxt-link to="/">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L21 21M21 1L1 21" stroke="#C2CDCE" stroke-linecap="round" />
        </svg>
      </nuxt-link>
    </div>

    <label class="block text-sm text-gray-700 mb-1">Username</label>
    <input 
      v-model="email"
      type="text" 
      placeholder="Username" 
      class="w-full mb-4 px-4 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    >

    <div class="flex justify-between items-center mb-1">
      <label class="text-sm text-gray-700">Parol</label>
      <a href="#" class="text-sm text-gray-400 hover:underline">Parolni unutdingizmi</a>
    </div>
    <input 
      v-model="password"
      type="password" 
      placeholder="Parolni kiriting" 
      class="w-full mb-6 px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    >

    <button 
      @click="login"
      :disabled="loading"
      class="w-full border border-pink-500 text-pink-500 py-2 rounded-md hover:bg-pink-50 transition disabled:opacity-50"
    >
      {{ loading ? 'Yuklanmoqda...' : 'Kirish' }}
    </button>

    <p v-if="errorMessage" class="text-red-500 text-center text-sm mt-2">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-500 text-center text-sm mt-2">{{ successMessage }}</p>

    <p class="text-center text-sm text-gray-500 mt-4 cursor-pointer" @click="emit('change-tab', 'register')">
      Sizda hali akkaunt mavjud emasm?
    </p>
  </div>
</template>
