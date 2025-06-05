import { defineStore } from 'pinia';
import { router } from '@/router';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login(username: string, password: string) {
      this.user = {
        id: 1,
        username: 'john.doe@mail.com',
        firstName: 'John',
        lastName: 'Doe',
        token: 'fake-jwt-token',
      };
      localStorage.setItem('user', JSON.stringify(this.user));
      router.push(this.returnUrl || '/products');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/');
    }
  }
});
