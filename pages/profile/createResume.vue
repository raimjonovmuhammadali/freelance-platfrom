```vue
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { profileData, fetchProfile } = useProfile();

onMounted(() => {
  if (!profileData.value) {
    fetchProfile();
  }
});



// Forma ma'lumotlari
const form = ref({
  title: "",
  summary: "",
  resume_file: null,
});

// Xato xabari
const errorMessage = ref("");

// Muvaffaqiyat xabari
const successMessage = ref("");

// Fayl o‘zgarganda
const onFileChange = (event) => {
  form.value.resume_file = event.target.files[0];
};

// Forma yuborish
const submitForm = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Validatsiya
  if (!form.value.title) {
    errorMessage.value = "Iltimos, sarlavha kiriting.";
    console.error("Validatsiya xatosi: Sarlavha bo‘sh");
    return;
  }
  if (!form.value.resume_file) {
    errorMessage.value = "Iltimos, PDF fayl yuklang.";
    console.error("Validatsiya xatosi: PDF fayl yuklanmagan");
    return;
  }
  if (!profileData.value?.id) {
    errorMessage.value = "Foydalanuvchi ID topilmadi. Iltimos, tizimga kiring.";
    console.error("Validatsiya xatosi: Foydalanuvchi ID topilmadi");
    return;
  }

  // FormData yaratish
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("summary", form.value.summary || "");
  formData.append("user", profileData.value?.id);
  formData.append("resume_file", form.value.resume_file);

  // FormData ni konsolga chiqarish
  const formDataEntries = {};
  for (const [key, value] of formData.entries()) {
    formDataEntries[key] = value instanceof File ? value.name : value;
  }
  console.log("API ga yuboriladigan ma'lumotlar:", formDataEntries);

  try {
    const response = await $fetch(`${baseURL}/resumes/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: formData,
    });

    // API javobini konsolga chiqarish
    console.log("API javobi:", response);

    // Muvaffaqiyatli yuborildi
    successMessage.value = "Rezyume muvaffaqiyatli qo‘shildi!";
    alert("Rezyume muvaffaqiyatli qo‘shildi!");
    router.push("/profile"); // Profil sahifasiga yo‘naltirish
  } catch (err) {
    // Xato xabarini tahlil qilish
    let errorMsg = "Rezyume qo‘shishda xatolik yuz berdi.";
    if (err.data) {
      errorMsg =
        err.data.detail ||
        err.data.error ||
        Object.values(err.data).flat().join(", ") ||
        "Noma'lum server xatosi";
    }
    errorMessage.value = errorMsg;
    console.error("API xatosi:", {
      message: errorMsg,
      status: err.status,
      data: err.data,
      fullError: err,
    });
  }
};
</script>

<template>
  <LayoutsNavbar />
  <section class="w-full flex items-center justify-center min-h-screen py-8">
    <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md sm:max-w-lg mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center mb-6 text-green-700">
        Rezyume Qo‘shish
      </h2>

      <!-- Muvaffaqiyat xabari -->
      <p v-if="successMessage" class="text-green-600 text-sm mb-4 text-center">
        {{ successMessage }}
      </p>

      <!-- Xato xabari -->
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">
        {{ errorMessage }}
      </p>

      <form @submit.prevent="submitForm" class="space-y-4" enctype="multipart/form-data">
        <!-- Title -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="title">Sarlavha</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <!-- Summary -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="summary">Qisqacha ma'lumot</label>
          <input
            id="summary"
            v-model="form.summary"
            type="text"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <!-- Resume File -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="resume">Rezyume (PDF)</label>
          <input
            id="resume"
            type="file"
            accept=".pdf"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
            @change="onFileChange"
          />
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Yuborish
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
```