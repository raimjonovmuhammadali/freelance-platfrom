<template>
  <LayoutsNavbar />
  <main>
    <!-- Xizmatlar bo'limi -->
    <section
      class="bg-gray-50 w-full flex items-center justify-center min-h-screen py-12 px-4 bg-milliy-pattern bg-cover bg-center"
    >
      <div class="max-w-5xl mx-auto p-4">
        <h2
          class="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10"
        >
          Milliy kasb-hunarlar uchun xizmatlar
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Xizmat 1: Mahsulotlarni ro‘yxatga olish -->
          <div
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-200"
          >
            <div class="mb-4 mx-auto w-12 h-12">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                  fill="#D97706"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-amber-600">
              Mahsulotlarni ro‘yxatga olish
            </h3>
            <p class="text-sm text-gray-600">
              Gilamdo‘zlik, zardo‘zlik va kulolchilik mahsulotlarini platformada professional taqdim etish.
            </p>
          </div>

          <!-- Xizmat 2: Onlayn targ‘ibot -->
          <div
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-200"
          >
            <div class="mb-4 mx-auto w-12 h-12">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-.86 1.83h-2v-.5c0-.83.45-1.54.95-2.04l1.14-1.15c.31-.31.51-.74.51-1.21 0-.95-.77-1.75-1.75-1.75s-1.75.8-1.75 1.75h-2c0-1.99 1.62-3.75 3.75-3.75s3.75 1.76 3.75 3.75c0 .83-.33 1.58-.84 2.15z"
                  fill="#15803D"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-green-700">
              Onlayn targ‘ibot
            </h3>
            <p class="text-sm text-gray-600">
              Hunarmandchilik mahsulotlarini ijtimoiy tarmoqlarda targ‘ib qilish va xaridorlar jalb qilish.
            </p>
          </div>

          <!-- Xizmat 3: Hunarmandlar bilan suhbat -->
          <div
            class="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all duration-200"
          >
            <div class="mb-4 mx-auto w-12 h-12">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 8V7l-3-2-3 2v1h-2v2h-2v2h-2v2h-2v2h-2v2h2v2h2v-2h2v-2h2v-2h2V9h2zm-5 5h-2v2h2v-2zm0-4h-2v2h2V9zm-6 4H8v2h2v-2zm0-4H8v2h2V9z"
                  fill="#B91C1C"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-red-700">
              Hunarmandlar bilan suhbat
            </h3>
            <p class="text-sm text-gray-600">
              Milliy loyihalar uchun professional hunarmandlar bilan onlayn suhbatlar tashkil qilish.
            </p>
          </div>
        </div>

        <!-- Alohida xizmat: Hunarmandlar jamoasi tuzish -->
        <div
          class="bg-white rounded-lg shadow-md p-6 mt-8 text-center md:col-span-3 hover:shadow-lg transition-all duration-200"
        >
          <div class="mb-4 mx-auto w-12 h-12">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04C17.62 14.17 22 15.33 22 17.5V19H10v-2.5c0-2.17 4.38-3.33 6.91-3.46.03-.01.06-.02.09-.04z"
                fill="#D97706"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2 text-amber-600">
            Hunarmandlar jamoasi tuzish
          </h3>
          <p class="text-sm text-gray-600">
            Milliy kasb-hunar loyihalari uchun professional hunarmandlar jamoasini tuzish va boshqarish.
          </p>
        </div>
      </div>
    </section>

    <!-- Ta'lim bo'limi -->
    <section>
      <div class="bg-gradient-to-r from-green-600 to-green-400 flex justify-center items-center min-h-screen">
        <div class="w-full py-12">
          <h1 class="text-center text-white text-2xl md:text-3xl font-semibold mb-8">
            Milliy hunarmandchilik bo‘yicha ta’lim
          </h1>
          <div
            class="max-w-5xl mx-auto flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-6"
          >
            <!-- Kurs 1 -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg w-full md:w-96"
            >
              <div class="flex justify-center mb-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6h16v2H4zm0 4h16v2H4zm0 4h16v2H4zm0 4h16v2H4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                    fill="#D97706"
                  />
                </svg>
              </div>
              <h2 class="text-center text-xl font-semibold mb-2 text-amber-600">
                Hunarmandchilik frilansingi
              </h2>
              <p class="text-center text-gray-600 text-sm">
                Milliy kasb-hunarlarni frilansing orqali global bozorga chiqarish bo‘yicha asosiy ko‘nikmalar.
              </p>
            </div>

            <!-- Kurs 2 -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg w-full md:w-96"
            >
              <div class="flex justify-center mb-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    fill="#15803D"
                  />
                </svg>
              </div>
              <h2 class="text-center text-xl font-semibold mb-2 text-green-700">
                Hunarmandchilik hujjatlari
              </h2>
              <p class="text-center text-gray-600 text-sm">
                Frilans loyihalari uchun tayyor shartnomalar va sertifikat shablonlari.
              </p>
            </div>

            <!-- Kurs 3 -->
            <div
              class="bg-white p-6 rounded-lg shadow-lg w-full md:w-96"
            >
              <div class="flex justify-center mb-4">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.05.03.08.04C17.62 14.17 22 15.33 22 17.5V19H10v-2.5c0-2.17 4.38-3.33 6.91-3.46.03-.01.06-.02.09-.04z"
                    fill="#B91C1C"
                  />
                </svg>
              </div>
              <h2 class="text-center text-xl font-semibold mb-2 text-red-700">
                Hunarmandlar uchun trening
              </h2>
              <p class="text-center text-gray-600 text-sm">
                Milliy hunarmandlarni frilansing bo‘yicha muvaffaqiyatli ishlashga tayyorlaydigan kurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Aloqa bo'limi -->
    <section>
      <div class="bg-[#4B2A63] flex justify-center items-center min-h-screen">
        <div class="w-full max-w-2xl p-4">
          <h1 class="text-center text-white text-2xl md:text-3xl font-semibold mb-6">
            Hunarmandchilik loyihalaringiz haqida so‘rang
          </h1>
          <form class="space-y-4">
            <div class="flex flex-col md:flex-row md:space-x-4">
              <div class="flex-1">
                <label class="block text-white mb-2" for="name">Ism</label>
                <input
                  class="w-full bg-white p-2 border border-gray-300 rounded"
                  type="text"
                  id="name"
                  placeholder="Ismingiz"
                />
              </div>
              <div class="flex-1 mt-4 md:mt-0">
                <label class="block text-white mb-2" for="contact"
                  >Telefon yoki email</label
                >
                <input
                  class="w-full bg-white p-2 border border-gray-300 rounded"
                  type="text"
                  id="contact"
                  placeholder="Telefon yoki email"
                />
              </div>
            </div>
            <div>
              <label class="block text-white mb-2" for="description"
                >Tavsif</label
              >
              <textarea
                class="w-full bg-white p-2 border border-gray-300 rounded h-32"
                id="description"
                placeholder="Hunarmandchilik loyihangiz haqida qisqacha"
              ></textarea>
            </div>
            <div class="text-center">
              <button
                class="w-full md:w-64 bg-amber-600 text-white py-2 px-4 rounded hover:bg-amber-700 transition-all duration-200"
              >
                Yuborish
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
  <LayoutsFooter />
</template>

<style scoped>
.bg-milliy-pattern {
  background-image: url('/assets/images/milliy-naqsh.png');
  background-size: cover;
  background-position: center;
}

button,
a {
  transition: all 0.2s ease;
}

button:hover,
a:hover {
  transform: translateY(-1px);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #D97706;
}
</style>