<script setup>
import { ref } from "vue";
import { useFetch } from "#app";
import { useRouter } from "vue-router";

const emit = defineEmits(["change-tab"]);
const router = useRouter();


// Form ma'lumotlari
const form = ref({
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  is_freelancer: false,
  is_client: false,
  phone: "",
  gender: "erkak",
  bio: "",
  location: "",
});

// Xato xabarlari uchun ob'ekt
const errors = ref({
  role: "",
  username: "",
  email: "",
  password: "",
  first_name: "",
  last_name: "",
  phone: "",
  gender: "",
  location: "",
  general: "",
});

// Toggle tugmalari uchun faol holat
const activeRole = ref(null);

// Role tanlash funksiyasi
const selectRole = (role) => {
  activeRole.value = role;
  if (role === "freelancer") {
    form.value.is_freelancer = true;
    form.value.is_client = false;
    errors.value.role = "";
  } else if (role === "client") {
    form.value.is_freelancer = false;
    form.value.is_client = true;
    errors.value.role = "";
  }
};

// Registratsiya so‘rovi
const register = async () => {
  // Xatolarni tozalash
  errors.value = {
    role: "",
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    gender: "",
    location: "",
    general: "",
  };

  // Kamida bir role tanlanganligini tekshirish
  if (!form.value.is_freelancer && !form.value.is_client) {
    errors.value.role = "Iltimos, Ish qidiruvchi yoki Kompaniya tanlang.";
    console.error("Validatsiya xatosi:", errors.value.role);
    return;
  }

  // Barcha majburiy maydonlar to‘ldirilganligini tekshirish
  const requiredFields = [
    { key: "username", label: "Foydalanuvchi nomi" },
    { key: "email", label: "Email" },
    { key: "password", label: "Parol" },
    { key: "first_name", label: "Ism" },
    { key: "last_name", label: "Familiya" },
    { key: "phone", label: "Telefon" },
    { key: "gender", label: "Jins" },
    { key: "location", label: "Manzil" },
  ];

  let hasError = false;
  for (const field of requiredFields) {
    if (!form.value[field.key]) {
      errors.value[field.key] = `Iltimos, ${field.label} maydonini to‘ldiring.`;
      console.error(`Validatsiya xatosi: ${field.label} maydoni bo‘sh`);
      hasError = true;
    }
  }

  // Email formati tekshiruvi
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (form.value.email && !emailRegex.test(form.value.email)) {
    errors.value.email = "Iltimos, to‘g‘ri email manzil kiriting.";
    console.error("Validatsiya xatosi: Noto‘g‘ri email formati");
    hasError = true;
  }

  if (hasError) return;

  // API ga yuboriladigan ma'lumotlarni konsolga chiqarish
  const payload = {
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
    first_name: form.value.first_name,
    last_name: form.value.last_name,
    is_freelancer: form.value.is_freelancer,
    is_client: form.value.is_client,
    phone: form.value.phone,
    gender: form.value.gender,
    bio: form.value.bio || "Foydalanuvchi haqida ma'lumot kiritilmagan",
    location: form.value.location,
  };
  console.log("API ga yuboriladigan ma'lumotlar:", JSON.stringify(payload, null, 2));

  try {
    const { data, error } = await useFetch(`${baseURL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (error.value) {
      // Serverdan qaytgan xato xabarini tahlil qilish
      let errorMsg = "Ro‘yxatdan o‘tishda xatolik yuz berdi.";
      if (error.value.data) {
        if (typeof error.value.data === "string") {
          errorMsg = error.value.data;
        } else {
          errorMsg =
            error.value.data.detail ||
            error.value.data.error ||
            Object.values(error.value.data).flat().join(", ") ||
            "Noma'lum server xatosi";
        }
      }
      errors.value.general = errorMsg;
      console.error("API xatosi:", {
        message: errorMsg,
        status: error.value.status,
        data: error.value.data,
        fullError: error.value,
      });
      return;
    }

    // API javobini konsolga chiqarish
    console.log("API javobi:", JSON.stringify(data.value, null, 2));

    // Tokenlarni localStorage ga saqlash
    if (data.value?.access && data.value?.refresh) {
      localStorage.setItem("access_token", data.value.access);
      localStorage.setItem("refresh_token", data.value.refresh);
      console.log("Tokenlar saqlandi:", {
        access_token: data.value.access,
        refresh_token: data.value.refresh,
      });
    } else {
      console.warn("API javobida tokenlar topilmadi:", data.value);
      errors.value.general = "Tokenlar qaytarilmadi, iltimos qayta urinib ko‘ring.";
    }

    // Muvaffaqiyatli registratsiya
    alert("Ro‘yxatdan o‘tish muvaffaqiyatli yakunlandi!");
    router.push("/");
  } catch (err) {
    errors.value.general = "Server bilan bog‘lanishda xatolik.";
    console.error("Server xatosi:", {
      message: err.message,
      stack: err.stack,
      fullError: err,
    });
  }
};
</script>

<template>
  <div class="w-full max-w-[500px] mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-md">
    <!-- Close icon -->
    <div class="flex justify-between items-start mb-4">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-800">Ro‘yxatdan o‘tish</h2>
      <nuxt-link to="/">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L21 21M21 1L1 21" stroke="#C2CDCE" stroke-linecap="round" />
        </svg>
      </nuxt-link>
    </div>

    <!-- General error message -->
    <p v-if="errors.general" class="text-red-500 text-sm mb-4">{{ errors.general }}</p>

    <!-- Toggle buttons -->
    <div class="flex mb-4 border border-gray-300 rounded-md overflow-hidden">
      <button
        class="w-1/2 py-2 text-sm font-medium"
        :class="{
          'bg-pink-500 text-white': activeRole === 'freelancer',
          'bg-gray-100 text-gray-400 hover:bg-white': activeRole !== 'freelancer',
        }"
        @click="selectRole('freelancer')"
      >
        Ish qidiruvchi
      </button>
      <button
        class="w-1/2 py-2 text-sm font-medium"
        :class="{
          'bg-pink-500 text-white': activeRole === 'client',
          'bg-gray-100 text-gray-400 hover:bg-white': activeRole !== 'client',
        }"
        @click="selectRole('client')"
      >
        Kompaniya
      </button>
    </div>
    <p v-if="errors.role" class="text-red-500 text-xs mb-4">{{ errors.role }}</p>

    <!-- Username input -->
    <label class="block text-sm text-gray-700 mb-1">Foydalanuvchi nomi</label>
    <input
      v-model="form.username"
      type="text"
      placeholder="Foydalanuvchi nomini kiriting"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.username" class="text-red-500 text-xs mb-2">{{ errors.username }}</p>

    <!-- Email input -->
    <label class="block text-sm text-gray-700 mb-1">Email</label>
    <input
      v-model="form.email"
      type="email"
      placeholder="email@example.com"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.email" class="text-red-500 text-xs mb-2">{{ errors.email }}</p>

    <!-- Password -->
    <div class="flex justify-between items-center mb-1">
      <label class="text-sm text-gray-700">Parol</label>
      <a href="#" class="text-sm text-gray-400 hover:underline">Parolni unutdim</a>
    </div>
    <input
      v-model="form.password"
      type="password"
      placeholder="Parolni kiriting"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-700 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.password" class="text-red-500 text-xs mb-2">{{ errors.password }}</p>

    <!-- First Name -->
    <label class="block text-sm text-gray-700 mb-1">Ism</label>
    <input
      v-model="form.first_name"
      type="text"
      placeholder="Ismingizni kiriting"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.first_name" class="text-red-500 text-xs mb-2">{{ errors.first_name }}</p>

    <!-- Last Name -->
    <label class="block text-sm text-gray-700 mb-1">Familiya</label>
    <input
      v-model="form.last_name"
      type="text"
      placeholder="Familiyangizni kiriting"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.last_name" class="text-red-500 text-xs mb-2">{{ errors.last_name }}</p>

    <!-- Phone -->
    <label class="block text-sm text-gray-700 mb-1">Telefon</label>
    <input
      v-model="form.phone"
      type="text"
      placeholder="+998901234567"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.phone" class="text-red-500 text-xs mb-2">{{ errors.phone }}</p>

    <!-- Gender -->
    <label class="block text-sm text-gray-700 mb-1">Jins</label>
    <select
      v-model="form.gender"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    >
      <option value="erkak">Erkak</option>
      <option value="ayol">Ayol</option>
    </select>
    <p v-if="errors.gender" class="text-red-500 text-xs mb-2">{{ errors.gender }}</p>

    <!-- Bio -->
    <label class="block text-sm text-gray-700 mb-1">O‘zingiz haqingizda</label>
    <textarea
      v-model="form.bio"
      placeholder="O‘zingiz haqida qisqacha ma'lumot"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    ></textarea>

    <!-- Location -->
    <label class="block text-sm text-gray-700 mb-1">Manzil</label>
    <input
      v-model="form.location"
      type="text"
      placeholder="Shahar yoki viloyat"
      class="w-full mb-2 px-3 py-2 bg-gray-100 text-sm text-gray-500 rounded-md outline-none focus:ring-2 focus:ring-pink-400"
    />
    <p v-if="errors.location" class="text-red-500 text-xs mb-2">{{ errors.location }}</p>

    <!-- Submit button -->
    <button
      @click="register"
      class="w-full border border-pink-500 text-pink-500 py-2 rounded-md hover:bg-pink-50 transition mt-4"
    >
      Ro‘yxatdan o‘tish
    </button>

    <!-- Already have account -->
    <p class="text-center text-sm text-gray-500 mt-4 cursor-pointer" @click="emit('change-tab', 'login')">
      Menda allaqachon hisob bor
    </p>
  </div>
</template>