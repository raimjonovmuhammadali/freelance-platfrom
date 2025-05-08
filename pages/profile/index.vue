<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfile } from "@/composables/useProfile";

definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const { profileData, loading, error, fetchProfile } = useProfile();

onMounted(() => {
  if (!profileData.value) {
    fetchProfile();
  }
});

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.push("/");
};
</script>

<template>
  <LayoutsNavbar />

  <main
    class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div v-if="loading" class="text-gray-700 text-lg font-medium">
      Yuklanmoqda...
    </div>

    <div
      v-else-if="error"
      class="text-red-500 bg-white p-4 rounded-md shadow-sm"
    >
      {{ error }}
    </div>

    <div
      v-else
      class="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center text-center"
    >
      <img
        class="w-28 h-28 rounded-full object-cover border-4 border-pink-400 mb-4"
        :src="profileData?.profile_image || 'https://i.pravatar.cc/150?img=32'"
        alt="Profile Picture"
      />

      <h2 class="w-full text-2xl font-semibold text-gray-800 mb-1">
        {{ profileData?.first_name || "Ism topilmadi" }}
        {{ profileData?.last_name || "Ism topilmadi" }}
      </h2>

      <p class="text-gray-500 mb-4 text-center">
        {{ profileData?.email || "Email mavjud emas" }} <br />
        {{ profileData?.role || "Telefon raqam mavjud emas" }}
      </p>

      <div class="bg-gray-50 p-4 rounded-xl w-full">
        <h3 class="text-sm font-semibold text-gray-600 mb-1">Biografiya</h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          {{ profileData?.description || "Biografiya kiritilmagan." }}
        </p>
      </div>
      <div class="bg-gray-50 p-4 rounded-xl w-full">
        <h3 class="text-sm font-semibold text-gray-600 mb-1">Telefon raqami</h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          {{ profileData?.phone || "Raqam kiritilmagan." }}
        </p>
      </div>
      <div class="bg-gray-50 p-4 rounded-xl w-full">
        <h3 class="text-sm font-semibold text-gray-600 mb-1">Tug'ulgan sana</h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          {{ profileData?.birth_date || "Biografiya kiritilmagan." }}
        </p>
      </div>
      <div class="bg-gray-50 p-4 rounded-xl w-full">
        <h3 class="text-sm font-semibold text-gray-600 mb-1">Jinsi</h3>
        <p class="text-gray-700 text-sm leading-relaxed">
          {{ profileData?.gender || "Jinsi kiritilmagan." }}
        </p>
      </div>

      <!-- Chiqish tugmasi -->
      <button
        @click="logout"
        class="rounded-md p-3 cursor-pointer bg-red-600 text-white flex items-center justify-center mt-6 hover:bg-red-700 transition"
      >
        Chiqish
      </button>
    </div>
  </main>
</template>
