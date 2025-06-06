import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    _product: {
      name: 'Laptop',
      price: 999,
    },
  }),
  getters: {
    product: (state) => state._product,
  },
  actions: {
    SET_PRODUCT(product: {name: string; price: number}) {
      this._product = product;
    },
    // SET_PRODUCT(product: {name: string; price: number}) {
    //   this._product = product;
    // },
  },
});
