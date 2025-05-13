<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProfile } from '@/composables/useProfile';

const router = useRouter();
const { profileData, fetchProfile } = useProfile();

// Form state
const form = ref({
  title: '',
  summary: '',
  resume_file: null,
});

// Status states
const errorMessage = ref('');
const successMessage = ref('');
const isSubmitting = ref(false);

// File change handler
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type !== 'application/pdf') {
    errorMessage.value = 'Faqat PDF fayllar qabul qilinadi.';
    form.value.resume_file = null;
    return;
  }
  form.value.resume_file = file;
};

// Form submission
const submitForm = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isSubmitting.value = true;

  // Validation
  if (!form.value.title.trim()) {
    errorMessage.value = 'Iltimos, sarlavha kiriting.';
    isSubmitting.value = false;
    return;
  }
  if (!form.value.resume_file) {
    errorMessage.value = 'Iltimos, PDF fayl yuklang.';
    isSubmitting.value = false;
    return;
  }
  if (!profileData.value?.id) {
    errorMessage.value = 'Foydalanuvchi ID topilmadi. Iltimos, tizimga kiring.';
    isSubmitting.value = false;
    return;
  }

  // Prepare FormData
  const formData = new FormData();
  formData.append('title', form.value.title.trim());
  formData.append('summary', form.value.summary.trim());
  formData.append('user', profileData.value.id);
  formData.append('resume_file', form.value.resume_file);

  try {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('Tizimga kirish talab qilinadi.');

    const response = await $fetch(`${baseURL}/resumes/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    successMessage.value = 'Rezyume muvaffaqiyatli qo‘shildi!';
    form.value = { title: '', summary: '', resume_file: null }; // Reset form
    setTimeout(() => router.push('/'), 1000); // Delayed redirect for better UX
  } catch (err) {
    errorMessage.value =
      err.data?.detail ||
      err.data?.error ||
      Object.values(err.data || {}).flat().join(', ') ||
      'Rezyume qo‘shishda xatolik yuz berdi.';
    console.error('API xatosi:', err);
  } finally {
    isSubmitting.value = false;
  }
};

// Fetch profile on mount
onMounted(async () => {
  if (!profileData.value) {
    await fetchProfile();
  }
});
</script>

<template>
  <LayoutsNavbar />
  <section class="w-full flex items-center justify-center min-h-screen py-8">
    <div class="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md sm:max-w-lg mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center mb-6 text-green-700">
        Rezyume Qo‘shish
      </h2>

      <!-- Success message -->
      <p v-if="successMessage" class="text-green-600 text-sm mb-4 text-center">
        {{ successMessage }}
      </p>

      <!-- Error message -->
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4 text-center">
        {{ errorMessage }}
      </p>

      <form @submit.prevent="submitForm" class="space-y-4" enctype="multipart/form-data">
        <!-- Title -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="title">Sarlavha</label>
          <input
            id="title"
            v-model.trim="form.title"
            type="text"
            required
            :disabled="isSubmitting"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>

        <!-- Summary -->
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="summary">Qisqacha ma'lumot</label>
          <input
            id="summary"
            v-model.trim="form.summary"
            type="text"
            :disabled="isSubmitting"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
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
            :disabled="isSubmitting"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 disabled:opacity-50"
            @change="onFileChange"
          />
        </div>

        <!-- Submit Button -->
        <div class="text-center">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting">Yuborilmoqda...</span>
            <span v-else>Yuborish</span>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
