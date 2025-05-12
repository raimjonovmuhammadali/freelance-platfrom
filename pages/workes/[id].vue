<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { baseURL } from "@/composables/useApi";

const route = useRoute();
const job = ref(null);
const loading = ref(true);
const error = ref(null);

definePageMeta({
  middleware: "auth",
});

// Fetch job, skills, and client data
const getJob = async () => {
  try {
    const jobId = route.params.id; // Get ID from route (e.g., /jobs/:id)
    // Fetch job data
    const jobResponse = await fetch(`${baseURL}/jobs/${jobId}`);
    if (!jobResponse.ok) {
      throw new Error("Ma’lumot yuklanmadi");
    }
    const jobData = await jobResponse.json();

    // Fetch skill details for each skill ID
    if (jobData.skills_required && jobData.skills_required.length > 0) {
      const skillPromises = jobData.skills_required.map(async (skillId) => {
        const skillResponse = await fetch(`${baseURL}/skills/${skillId}`);
        if (!skillResponse.ok) {
          throw new Error(`Ko‘nikma ${skillId} yuklanmadi`);
        }
        return skillResponse.json();
      });
      jobData.skills = await Promise.all(skillPromises); // [{ id, name }, ...]
    } else {
      jobData.skills = [];
    }

    // Fetch client data
    const clientResponse = await fetch(`${baseURL}/profile/${jobData.client}`);
    if (!clientResponse.ok) {
      throw new Error("Mijoz ma’lumotlari yuklanmadi");
    }
    jobData.clientData = await clientResponse.json();

    job.value = jobData;
  } catch (err) {
    error.value = err.message || "Xatolik yuz berdi";
    alert(error.value);
  } finally {
    loading.value = false;
  }
};

// Contact button logic (customize as needed)
const contact = () => {
  alert(`Bog'lanish: ${job.value.title} - ${job.value.clientData?.first_name} ${job.value.clientData?.last_name}`);
  // Example: Navigate to a contact form
  // router.push(`/contact?jobId=${job.value.id}`);
};

onMounted(() => {
  getJob();
});
</script>

<template>
  <section>
    <LayoutsNavbar />

    <main class="w-full">
      <!-- Loading State -->
      <div
        v-if="loading"
        class="flex justify-center items-center min-h-[300px]"
      >
        <span class="loader"></span>
        <span class="ml-3 text-gray-600 dark:text-gray-300">Yuklanmoqda...</span>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="text-center py-6 text-red-500 dark:text-red-400"
      >
        {{ error }}
      </div>

      <!-- Job and Client Details -->
      <section
        v-else
        class="w-[90%] mx-auto py-8 flex flex-col md:flex-row justify-between gap-6"
      >
        <!-- Job Details -->
        <div class="w-full md:w-6/12 flex flex-col gap-4 rounded-xl">
          <nuxt-link
            :to="`/jobs/${job.id}`"
            class="w-full bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col gap-4 items-start border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            :aria-label="`View details for ${job.title}`"
          >
            <h2
              class="text-gray-900 dark:text-white text-2xl font-bold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
            >
              {{ job.title }}
            </h2>
            <h3 class="text-pink-500 dark:text-pink-400 text-lg font-semibold">
              {{ Number(job.budget).toLocaleString() }} so‘m
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-base">
              Muddat: {{ new Date(job.deadline).toLocaleDateString("uz-UZ") }}
            </p>
            <p
              v-if="job.skills && job.skills.length"
              class="text-gray-600 dark:text-gray-400 text-base"
            >
              Kerakli ko‘nikmalar: {{ job.skills.map(skill => skill.name).join(", ") }}
            </p>
            <p class="text-gray-700 dark:text-gray-300 text-base font-semibold mt-4">
              Tavsif:
            </p>
            <p class="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              {{ job.description }}
            </p>
          </nuxt-link>
        </div>

        <!-- Client Details -->
        <div class="w-full md:w-6/12 flex flex-col gap-4 rounded-xl">
          <div
            class="w-full bg-white dark:bg-gray-800 p-6 rounded-xl flex flex-col gap-4 items-start border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2
              class="text-gray-900 dark:text-white text-2xl font-bold tracking-tight"
            >
              {{ job.clientData?.first_name }} {{ job.clientData?.last_name }}
            </h2>
            <p
              v-if="job.clientData?.location"
              class="text-gray-600 dark:text-gray-400 text-base"
            >
              Manzil: {{ job.clientData.location }}
            </p>
            <p
              v-if="job.clientData?.email"
              class="text-gray-600 dark:text-gray-400 text-base"
            >
              Email: {{ job.clientData.email }}
            </p>
            <p
              v-if="job.clientData?.phone"
              class="text-gray-600 dark:text-gray-400 text-base"
            >
              Telefon: {{ job.clientData.phone }}
            </p>
            <p
              v-if="job.clientData?.bio"
              class="text-gray-700 dark:text-gray-300 text-base font-semibold mt-4"
            >
              Mijoz haqida:
            </p>
            <p
              v-if="job.clientData?.bio"
              class="text-gray-600 dark:text-gray-400 text-base leading-relaxed"
            >
              {{ job.clientData.bio }}
            </p>
            <button
              class="bg-blue-900 dark:bg-blue-800 text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-200 w-full md:w-auto flex items-center justify-center gap-2"
              :aria-label="`Contact ${job.clientData?.first_name} ${job.clientData?.last_name} for ${job.title}`"
              @click="contact"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              Bog'lanish
            </button>
          </div>
        </div>
      </section>
    </main>
  </section>
</template>

<style scoped>
.loader {
  border: 4px solid #e5e7eb; /* Tailwind gray-200 */
  border-top: 4px solid #3b82f6; /* Tailwind blue-500 */
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>