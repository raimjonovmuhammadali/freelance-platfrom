<script setup>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProfile } from '@/composables/useProfile';
import { useState } from '#app';

definePageMeta({
  middleware: 'auth',
});

const router = useRouter();
const { profileData, loading, error, fetchProfile } = useProfile();
const baseURL = 'https://freelance77.pythonanywhere.com';

// State management
const resumedata = useState('resume', () => []);
const resumeError = useState('resumeerror', () => null);
const resumeLoading = useState('resumeloader', () => false);

const jobsdata = useState('jobs', () => []);
const jobsError = useState('jobserror', () => null);
const jobsLoading = useState('jobsloader', () => false);

// Utility function for API requests
const apiRequest = async (url, method = 'GET', token) => {
  if (!token) throw new Error('Tizimga kirish talab qilinadi.');

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) throw new Error(`${method} so‘rovida xato: ${response.statusText}`);
  return method === 'DELETE' ? null : await response.json();
};

// Logout
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  router.push('/');
};

// Fetch resumes
const getResumes = async () => {
  if (!process.client) return;

  resumeLoading.value = true;
  try {
    const token = localStorage.getItem('access_token');
    const data = await apiRequest(`${baseURL}/resumes/`, 'GET', token);
    resumedata.value = data.filter(resume => resume.user.id === profileData.value?.id);
  } catch (err) {
    resumeError.value = err.message || 'Rezyumelarni yuklashda xatolik yuz berdi.';
    console.error('Rezyume xatosi:', err);
  } finally {
    resumeLoading.value = false;
  }
};

// Fetch jobs
const getJobs = async () => {
  if (!process.client) return;

  jobsLoading.value = true;
  try {
    const token = localStorage.getItem('access_token');
    const data = await apiRequest(`${baseURL}/jobs/`, 'GET', token);
    jobsdata.value = data.filter(job => job.client.id === profileData.value?.id);
  } catch (err) {
    jobsError.value = err.message || 'E\'lonlarni yuklashda xatolik yuz berdi.';
    console.error('E\'lon xatosi:', err);
  } finally {
    jobsLoading.value = false;
  }
};

// Delete resume
const deleteResume = async (resume) => {
  if (!confirm(`Haqiqatan ham "${resume.title}" rezyumesini o‘chirmoqchimisiz?`)) return;

  try {
    const token = localStorage.getItem('access_token');
    await apiRequest(`${baseURL}/resumes/${resume.id}/`, 'DELETE', token);
    resumedata.value = resumedata.value.filter(r => r.id !== resume.id);
  } catch (err) {
    resumeError.value = err.message || 'Rezyumeni o‘chirishda xatolik yuz berdi.';
    console.error('O‘chirish xatosi:', err);
  }
};

// Delete job
const deleteJob = async (jobId) => {
  if (!confirm('Haqiqatan ham ushbu e\'lonni o‘chirmoqchimisiz?')) return;

  try {
    const token = localStorage.getItem('access_token');
    await apiRequest(`${baseURL}/jobs/${jobId}/`, 'DELETE', token);
    jobsdata.value = jobsdata.value.filter(job => job.id !== jobId);
  } catch (err) {
    jobsError.value = err.message || 'E\'lonni o‘chirishda xatolik yuz berdi.';
    console.error('O‘chirish xatosi:', err);
  }
};

// Download resume
const downloadResume = async (resume) => {
  try {
    if (!resume.resume_file) throw new Error('Rezyume fayli topilmadi.');
    
    const link = document.createElement('a');
    link.href = resume.resume_file;
    link.download = resume.title || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    resumeError.value = `Rezyume yuklab olishda xato: ${err.message}`;
    console.error('Yuklab olish xatosi:', err);
  }
};

// Watch for profileData changes and fetch data
watch(profileData, (newProfile) => {
  if (!newProfile) return;
  if (newProfile.is_freelancer) getResumes();
  if (newProfile.is_client) getJobs();
}, { immediate: true });

// Initial profile fetch
onMounted(async () => {
  if (!profileData.value) await fetchProfile();
});
</script>

<template>
  <LayoutsNavbar />
  <main class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="loading || resumeLoading || jobsLoading" class="text-center text-gray-700 text-lg font-medium">
      Yuklanmoqda...
    </div>
    <div v-else-if="error || resumeError || jobsError" class="text-red-500 bg-white p-4 rounded-md shadow-sm text-center mx-auto max-w-2xl">
      {{ error || resumeError || jobsError }}
    </div>
    <div v-else class="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
      <div class="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
        <img class="w-28 h-28 rounded-full object-cover border-4 border-pink-400 mb-4" src="https://i.pinimg.com/736x/b3/bc/bd/b3bcbd8538c1474d4d18768a08b906eb.jpg" alt="Profile Picture" />
        <h2 class="text-2xl font-semibold text-gray-800 mb-1">
          {{ profileData?.first_name || 'Ism topilmadi' }} {{ profileData?.last_name || '' }}
        </h2>
        <p class="text-gray-500 mb-4 text-sm">
          {{ profileData?.email || 'Email mavjud emas' }} <br />
          {{ profileData?.is_freelancer ? 'Freelancer' : '' }}
          {{ profileData?.is_client ? 'Ish beruvchi' : '' }}
        </p>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Biografiya</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.bio || 'Biografiya kiritilmagan.' }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Telefon raqami</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.phone || 'Raqam kiritilmagan.' }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Tug‘ilgan sana</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.birth_date || 'Sana kiritilmagan.' }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Jins</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.gender || 'Jins kiritilmagan.' }}
          </p>
        </div>
        <button @click="logout" class="rounded-md p-3 w-full bg-red-600 text-white flex items-center justify-center mt-4 hover:bg-red-700 transition">
          Chiqish
        </button>
      </div>
      <div class="w-full md:w-2/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ profileData?.is_freelancer ? 'Mening rezyumelarim' : 'Mening e\'lonlarim' }}
        </h1>
        <div v-if="profileData?.is_freelancer && !resumedata.length || profileData?.is_client && !jobsdata.length" class="text-gray-500 text-center py-8 bg-gray-50 rounded-md">
          Hozircha {{ profileData?.is_freelancer ? 'rezyumelar' : 'e\'lonlar' }} mavjud emas.
        </div>
        <div v-if="profileData?.is_freelancer" v-for="item in resumedata" :key="item.id" class="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ item.summary || 'Qisqacha ma\'lumot kiritilmagan' }}</p>
            <p class="text-gray-500 text-xs mt-2">Fayl: {{ item.resume_file.split('/').pop() || 'Fayl topilmadi' }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="downloadResume(item)" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm">
              Yuklab olish
            </button>
            <button @click="deleteResume(item)" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm">
              O'chirish
            </button>
          </div>
        </div>
        <div v-if="profileData?.is_client" v-for="item in jobsdata" :key="item.id" class="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mt-1">{{ item.description || 'Qisqacha ma\'lumot kiritilmagan' }}</p>
            <p class="text-gray-500 text-xs mt-2">Byudjet: {{ Math.floor(item.budget) }} $ <br /> Muddat: {{ item.deadline }}</p>
          </div>
          <button @click="deleteJob(item.id)" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition text-sm">
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </main>
</template>