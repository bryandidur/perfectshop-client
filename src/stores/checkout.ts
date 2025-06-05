import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    _product: {},
  }),
  getters: {
    product: (state) => state._product,
  },
  actions: {
    SET_PRODUCT(product: {name: string; price: number}) {
      this._product = product;
    },
  },
});
