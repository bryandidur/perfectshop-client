<script setup lang="ts">
import { reactive, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import checkoutService from '@/services/checkoutService';
import { useCheckoutStore } from '@/stores/checkout';

const checkoutStore = useCheckoutStore();
const billingTypeOptions = [
  {title: 'Credit card', value: 'credit_card'},
  {title: 'Boleto', value: 'boleto'},
  {title: 'Pix', value: 'pix'},
];
const initialErrors = {
  billingType: '',
  name: '',
  email: '',
  cpf: '',
  phone: '',
  postalCode: '',
  adressNumber: '',
  creditCard: {
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
  },
};

const breadcrumbs = shallowRef([
  {
    title: 'Checkout',
    disabled: true,
    href: '#'
  }
]);
const form = reactive({
  billingType: 'credit_card',
  name: '',
  email: '',
  cpf: '',
  phone: '',
  postalCode: '',
  adressNumber: '',
  creditCard: {
    holderName: '',
    number: '',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
  },
});
const formErrors = reactive({...initialErrors});

console.log({product: checkoutStore.product});

async function handleSubmit() {
  try {
    const response = await checkoutService.checkout(form);

    console.log({response});
  } catch (error) {
    console.error('Checkout error:', error);
  }
}
</script>

<template>
  <BaseBreadcrumb title="Checkout" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-card>
    <v-card-text>
      <v-sheet class="mx-auto" width="800">
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-h4 mb-4">Billing</p>

              <v-select
                v-model="form.billingType"
                label="Method"
                :items="billingTypeOptions"
                variant="outlined"
              ></v-select>

              <v-text-field
                v-model="form.name"
                label="Name"
                variant="outlined"
                :error="true"
                :error-messages="'required'"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="E-mail"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="form.cpf"
                label="CPF"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="form.phone"
                label="Phone"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="form.postalCode"
                label="Postal Code"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="form.adressNumber"
                label="Address number"
                variant="outlined"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <div v-if="form.billingType === 'credit_card'">
                <p class="text-h4 mb-4">Card</p>

                <v-text-field
                  v-model="form.creditCard.holderName"
                  label="Holder name"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="form.creditCard.number"
                  label="Number"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="form.creditCard.expiryMonth"
                  label="Expiry month (MM)"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="form.creditCard.expiryYear"
                  label="Expiry year (YYYY)"
                  variant="outlined"
                ></v-text-field>

                <v-text-field
                  v-model="form.creditCard.ccv"
                  label="CCV"
                  variant="outlined"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <v-btn variant="tonal" type="submit">Pay</v-btn>
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
