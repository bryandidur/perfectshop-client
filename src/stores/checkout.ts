import { defineStore } from 'pinia';

export const useCheckoutStore = defineStore({
  id: 'checkout',
  state: () => ({
    _product: {
      name: 'Laptop',
      price: 999,
    },
    _payment: {
      id: '',
      status: '',
      billingType: '',
      pixQrCode: '',
    },
    _error: '',
  }),
  getters: {
    product: (state) => state._product,
    payment: (state) => state._payment,
    error: (state) => state._error,
  },
  actions: {
    SET_PRODUCT(product: {name: string; price: number}) {
      this._product = product;
    },
    SET_PAYMENT(data: typeof this._payment) {
      this._payment = data;
    },
    SET_ERROR(error: string) {
      this._error = error;
    },
  },
});
