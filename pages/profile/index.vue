<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfile } from "@/composables/useProfile";
import { useState } from "#app";

definePageMeta({
  middleware: "auth",
});

const router = useRouter();
const { profileData, loading, error, fetchProfile } = useProfile();

// Resume data
const resumedata = useState("resume", () => []);
const resumeError = useState("resumeerror", () => null);
const resumeLoading = useState("resumeloader", () => false);

// Jobs data
const jobsdata = useState("jobs", () => []);
const jobsError = useState("jobserror", () => null);
const jobsLoading = useState("jobsloader", () => false);

// Logout function
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  router.push("/");
};

// Fetch resumes
const getResumes = async () => {
  if (!process.client) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    resumeError.value = "Tizimga kirish talab qilinadi.";
    console.error("Xato: Token topilmadi");
    return;
  }

  resumeLoading.value = true;
  try {
    const res = await fetch(`${baseURL}/resumes/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    

    if (!res.ok) {
      throw new Error(`Rezyumelarni yuklashda xato: ${res.statusText}`);
    }

    const data = await res.json();
    // Faqat tizimga kirgan foydalanuvchiga tegishli resume'lar
    resumedata.value = data.filter(resume => resume.user.id === profileData.value?.id);
    
  } catch (err) {
    resumeError.value = err.message || "Rezyumelarni yuklashda xatolik yuz berdi.";
    console.error("API xatosi:", {
      message: err.message,
      status: err.status,
      fullError: err,
    });
  } finally {
    resumeLoading.value = false;
  }
};


// Fetch jobs
const getJobs = async () => {
  if (!process.client) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    jobsError.value = "Tizimga kirish talab qilinadi.";
    console.error("Xato: Token topilmadi");
    return;
  }

  jobsLoading.value = true;
  try {
    const res = await fetch(`${baseURL}/jobs/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`E'lonlarni yuklashda xato: ${res.statusText}`);
    }

    const data = await res.json();
    // Filter jobs where client ID matches user ID
    jobsdata.value = data.filter(job => job.client === profileData.value?.id);
  } catch (err) {
    jobsError.value = err.message || "E'lonlarni yuklashda xatolik yuz berdi.";
    console.error("API xatosi:", {
      message: err.message,
      status: err.status,
      fullError: err,
    });
  } finally {
    jobsLoading.value = false;
  }
};

const deleteresume = async (resume) => {
  if (!confirm(`Haqiqatan ham "${resume.title}" rezyumesini o‘chirmoqchimisiz?`)) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    resumeError.value = "Tizimga kirish talab qilinadi.";
    return;
  }

  try {
    const res = await fetch(`https://freelance77.pythonanywhere.com/resumes/${resume.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Rezyumeni o‘chirishda xato yuz berdi.");
    }

    // Rezyumeni local holatda ham o‘chirish
    resumedata.value = resumedata.value.filter(r => r.id !== resume.id);
    console.log(`Rezyume o‘chirildi: ${resume.title}`);
  } catch (err) {
    resumeError.value = err.message || "Rezyumeni o‘chirishda xatolik yuz berdi.";
    console.error("O‘chirish xatosi:", {
      message: err.message,
      resume: resume.title,
      fullError: err,
    });
  }
};

const deleteJob = async (jobId) => {
  if (!confirm("Haqiqatan ham ushbu e'lonni o‘chirmoqchimisiz?")) return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    jobsError.value = "Tizimga kirish talab qilinadi.";
    return;
  }

  try {
    const res = await fetch(`https://freelance77.pythonanywhere.com/jobs/${jobId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("E'lonni o‘chirishda xato yuz berdi.");
    }

    // E'lonni local holatda ham o‘chirish
    jobsdata.value = jobsdata.value.filter(job => job.id !== jobId);
    console.log(`E'lon o‘chirildi: ID ${jobId}`);
  } catch (err) {
    jobsError.value = err.message || "E'lonni o‘chirishda xatolik yuz berdi.";
    console.error("O‘chirish xatosi:", {
      message: err.message,
      jobId,
      fullError: err,
    });
  }
};



// Download resume
const downloadResume = async (resume) => {
  try {
    if (!resume.resume_file) {
      throw new Error("Rezyume fayli topilmadi.");
    }

    const link = document.createElement("a");
    link.href = resume.resume_file;
    link.download = resume.title || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(`Rezyume yuklab olindi: ${resume.title}`);
  } catch (err) {
    resumeError.value = `Rezyume yuklab olishda xato: ${err.message}`;
    console.error("Yuklab olish xatosi:", {
      message: err.message,
      resume: resume.title,
      fullError: err,
    });
  }
};

onMounted(() => {
  if (!profileData.value) {
    fetchProfile();
  }
  // Fetch data based on user type
  if (profileData.value?.is_freelancer) {
    getResumes();
  } if (profileData.value?.is_client) {
    getJobs();
  }
});
</script>

<template>
  <LayoutsNavbar />
  <main class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Loading -->
    <div
      v-if="loading || resumeLoading || jobsLoading"
      class="text-center text-gray-700 text-lg font-medium"
    >
      Yuklanmoqda...
    </div>

    <!-- Error message -->
    <div
      v-else-if="error || resumeError || jobsError"
      class="text-red-500 bg-white p-4 rounded-md shadow-sm text-center mx-auto max-w-2xl"
    >
      {{ error || resumeError || jobsError }}
    </div>

    <!-- Profile and content -->
    <div
      v-else
      class="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6"
    >
      <!-- Profile card -->
      <div
        class="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center"
      >
        <img
          class="w-28 h-28 rounded-full object-cover border-4 border-pink-400 mb-4"
          src="https://i.pinimg.com/736x/b3/bc/bd/b3bcbd8538c1474d4d18768a08b906eb.jpg"
          alt="Profile Picture"
        />
        <h2 class="text-2xl font-semibold text-gray-800 mb-1">
          {{ profileData?.first_name || "Ism topilmadi" }}
          {{ profileData?.last_name || "" }}
        </h2>
        <p class="text-gray-500 mb-4 text-sm">
          {{ profileData?.email || "Email mavjud emas" }} <br />
          {{ profileData?.is_freelancer ? 'Freelancer' : '' }}
          {{ profileData?.is_client ? 'Ish beruvchi' : '' }}
        </p>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Biografiya</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.bio || "Biografiya kiritilmagan." }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Telefon raqami</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.phone || "Raqam kiritilmagan." }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Tug‘ilgan sana</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.birth_date || "Sana kiritilmagan." }}
          </p>
        </div>
        <div class="bg-gray-50 p-4 rounded-xl w-full mb-4">
          <h3 class="text-sm font-semibold text-gray-600 mb-1">Jins</h3>
          <p class="text-gray-700 text-sm leading-relaxed">
            {{ profileData?.gender || "Jins kiritilmagan." }}
          </p>
        </div>
        <button
          @click="logout"
          class="rounded-md p-3 w-full bg-red-600 text-white flex items-center justify-center mt-4 hover:bg-red-700 transition"
        >
          Chiqish
        </button>
      </div>

      <!-- Content based on user type -->
      <div
        class="w-full md:w-2/3 bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ profileData?.is_freelancer ? "Mening rezyumelarim" : "Mening e'lonlarim" }}
        </h1>

        <!-- Empty state -->
        <div
          v-if="profileData?.is_freelancer && !resumedata.length || profileData?.is_client && !jobsdata.length"
          class="text-gray-500 text-center py-8 bg-gray-50 rounded-md"
        >
          Hozircha {{ profileData?.is_freelancer ? "rezyumelar" : "e'lonlar" }} mavjud emas.
        </div>

        <!-- Resumes list -->
        <div
          v-if="profileData?.is_freelancer"
          v-for="item in resumedata"
          :key="item.id"
          class="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mt-1">
              {{ item.summary || "Qisqacha ma'lumot kiritilmagan" }}
            </p>
            <p class="text-gray-500 text-xs mt-2">
              Fayl: {{ item.resume_file.split("/").pop() || "Fayl topilmadi" }}
            </p>
          </div>
          <button
            @click="downloadResume(item)"
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
          >
            Yuklab olish
          </button>
          <button
            @click="deleteresume(item)"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
          >
            O'chirish
          </button>
        </div>

        <!-- Jobs list -->
        <div
          v-if="profileData?.is_client"
          v-for="item in jobsdata"
          :key="item.id"
          class="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800">{{ item.title }}</h3>
            <p class="text-gray-600 text-sm mt-1">
              {{ item.description || "Qisqacha ma'lumot kiritilmagan" }}
            </p>
            <p class="text-gray-500 text-xs mt-2">
              Byudjet: {{ item.budget }} so‘m <br />
              Muddat: {{ item.deadline }}
            </p>
          </div>
          <button
            @click="deleteJob(item.id)"
            class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </main>
</template>