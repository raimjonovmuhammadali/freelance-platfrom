<template>
  <LayoutsNavbar />
  <section class="w-full flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl">
      <h2 class="text-2xl font-bold text-center mb-6 text-green-700">
        Ish E’loni Joylashtirish
      </h2>
      <form action="#" method="POST" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-medium mb-1" for="title"
            >Mutaxassis turi (misol: Veb dasturchi kerak)</label
          >
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Masalan: Vue.js dasturchi kerak"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="description"
            >Loyiha tavsifi</label
          >
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            placeholder="Loyihangiz haqida batafsil yozing..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="budget"
            >Byudjet (UZS yoki USD)</label
          >
          <input
            id="budget"
            name="budget"
            type="text"
            placeholder="Masalan: $300 yoki 3 000 000 so‘m"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="job_type"
            >Ish turi</label
          >
          <select
            id="job_type"
            name="job_type"
            required
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tanlang</option>
            <option value="remote">Masofaviy</option>
            <option value="office">Ofisda</option>
            <option value="contract">Shartnoma asosida</option>
          </select>
        </div>

        <div>
          <label class="block text-gray-700 font-medium mb-1" for="contact"
            >Aloqa (email yoki telefon)</label
          >
          <input
            id="contact"
            name="contact"
            type="text"
            required
            placeholder="Masalan: example@gmail.com yoki +998..."
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div class="text-center pt-4">
          <button
            type="submit"
            class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            E’lonni joylashtirish
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
