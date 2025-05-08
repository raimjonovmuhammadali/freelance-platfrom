<template>
    <LayoutsNavbar/>
  <section class="w-full flex items-center justify-center">
    <div class="bg-white p-8 rounded-2xl shadow-md w-[40%] mx-auto">
    <h2 class="text-2xl font-bold text-center mb-6 text-green-700">
      Resume Qo‘shish
    </h2>
    <form
      action="#"
      method="POST"
      enctype="multipart/form-data"
      class="space-y-4"
    >
      <div>
        <label class="block text-gray-700 font-medium mb-1" for="name"
          >Ismingiz</label
        >
        <input
          id="name"
          name="name"
          type="text"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1" for="email"
          >Email</label
        >
        <input
          id="email"
          name="email"
          type="email"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1" for="phone"
          >Telefon raqamingiz</label
        >
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1" for="profession"
          >Kasbingiz</label
        >
        <input
          id="profession"
          name="profession"
          type="text"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1" for="experience"
          >Tajriba (yil)</label
        >
        <input
          id="experience"
          name="experience"
          type="number"
          min="0"
          class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label class="block text-gray-700 font-medium mb-1" for="resume"
          >Rezyume (PDF)</label
        >
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf"
          required
          class="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
        />
      </div>

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
