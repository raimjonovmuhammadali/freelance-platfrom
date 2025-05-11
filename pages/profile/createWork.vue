<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userId = ref(null);

// Form data
const form = ref({
  title: "",
  description: "",
  budget: "",
  deadline: "",
  category: null,
  skills_required: [],
});

// State management
const loading = ref(false);
const error = ref(null);
const success = ref(false);
const categories = ref([]);

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await fetch(`${baseURL}/categories/`);
    if (!response.ok) {
      throw new Error("Kategoriya ro'yxatini yuklashda xatolik yuz berdi.");
    }
    const data = await response.json();
    categories.value = data;
  } catch (err) {
    console.error("Kategoriya yuklash xatosi:", err);
    error.value = err.message || "Kategoriya yuklashda xatolik yuz berdi.";
  }
};

onMounted(() => {
  fetchCategories();
  userId.value = localStorage.getItem("userID");
});

// Form submission
const submitJob = async () => {
  if (typeof window === "undefined") return;

  const token = localStorage.getItem("access_token");
  if (!token) {
    error.value = "Tizimga kirish talab qilinadi.";
    return;
  }

  // Basic validation
  if (
    !form.value.title ||
    !form.value.description ||
    !form.value.deadline ||
    !form.value.category
  ) {
    error.value = "Iltimos, barcha majburiy maydonlarni to‘ldiring.";
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    const payload = {
      title: form.value.title,
      description: form.value.description,
      budget: form.value.budget || "0",
      deadline: form.value.deadline,
      is_open: true,
      client: userId.value,
      category: form.value.category,
    };

    console.log("Yuborilayotgan ma'lumot:", payload);

    const response = await fetch(`${baseURL}/jobs/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`E'lonni joylashtirishda xato: ${response.statusText}`);
    }

    success.value = true;
    form.value = {
      title: "",
      description: "",
      budget: "",
      deadline: "",
      category: null,
    };

    setTimeout(() => {
      router.push("/profile");
    }, 1500);

  } catch (err) {
    error.value = err.message || "E'lonni joylashtirishda xatolik yuz berdi.";
    console.error("API xatosi:", err);
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <LayoutsNavbar />
  <section class="w-full flex items-center justify-center min-h-screen bg-gray-100 py-12">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-center mb-6 text-green-700">
        Ish E’loni Joylashtirish
      </h2>

      <div
        v-if="success"
        class="bg-green-100 text-green-700 p-4 rounded-md mb-4 text-center"
      >
        E’lon muvaffaqiyatli joylashtirildi!
      </div>

      <div
        v-if="error"
        class="bg-red-100 text-red-700 p-4 rounded-md mb-4 text-center"
      >
        {{ error }}
      </div>

      <form @submit.prevent="submitJob" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="title">
            Mutaxassis turi
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Masalan: Vue.js dasturchi kerak"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="description">
            Loyiha tavsifi
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="5"
            required
            placeholder="Loyihangiz haqida batafsil yozing..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="budget">
            Byudjet (UZS yoki USD)
          </label>
          <input
            id="budget"
            v-model="form.budget"
            type="text"
            placeholder="Masalan: $300 yoki 3 000 000 so‘m"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="deadline">
            Muddat
          </label>
          <input
            id="deadline"
            v-model="form.deadline"
            type="date"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="category">
            Kategoriya
          </label>
          <select
            id="category"
            v-model="form.category"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tanlang</option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="text-center pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:bg-gray-400"
          >
            {{ loading ? "Yuklanmoqda..." : "E’lonni joylashtirish" }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
