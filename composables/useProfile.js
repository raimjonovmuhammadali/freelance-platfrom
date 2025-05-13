// composables/useProfile.js
import { useState } from '#app';
import { useRouter } from 'vue-router';
import { baseURL } from './useApi';

export const useProfile = () => {
  // Reactive state
  const profileData = useState('profile', () => null);
  const error = useState('profileError', () => null);
  const loading = useState('profileLoading', () => false);

  const router = useRouter();

  // Fetch profile data
  const fetchProfile = async () => {
    if (!process.client) return;

    const token = localStorage.getItem('access_token');
    if (!token) {
      error.value = 'Tizimga kirish talab qilinadi.';
      await router.push('/auth');
      return;
    }

    loading.value = true;
    try {
      const response = await $fetch(`${baseURL}/profile/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      profileData.value = response;
      localStorage.setItem('userID', String(response.id));
    } catch (err) {
      error.value = err.data?.detail || err.message || 'Profil maʼlumotlarini yuklashda xatolik yuz berdi.';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('userID');
      await router.push('/auth');
      console.error('Profil xatosi:', err);
    } finally {
      loading.value = false;
    }
  };

  return { profileData, error, loading, fetchProfile };
};