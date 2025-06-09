<script setup lang="ts">
import { reactive, ref, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import checkoutService from '@/services/checkout';
import { useCheckoutStore } from '@/stores/checkout';
import { router } from '@/router';

const checkoutStore = useCheckoutStore();
const billingTypeOptions = [
  {title: 'Credit card', value: 'CREDIT_CARD'},
  {title: 'Boleto', value: 'BOLETO'},
  {title: 'Pix', value: 'PIX'},
];
const initialErrors: { [key: string]: string } = {
  billingType: '',
  name: '',
  email: '',
  cpf: '',
  phone: '',
  postalCode: '',
  addressNumber: '',
  ['creditCard.holderName']: '',
  ['creditCard.number']: '',
  ['creditCard.expiryMonth']: '',
  ['creditCard.expiryYear']: '',
  ['creditCard.ccv']: '',
};
const breadcrumbs = shallowRef([
  {
    title: 'Checkout',
    disabled: true,
    href: '#'
  }
]);
const unknowError = ref<boolean>(false);
const formData = reactive({
  billingType: 'CREDIT_CARD',
  name: '',
  email: '',
  cpf: '59088944008',
  phone: '99999999999',
  postalCode: '88054100',
  addressNumber: '',
  creditCard: {
    holderName: '',
    number: '4444444444444444',
    expiryMonth: '',
    expiryYear: '',
    ccv: '',
  },
});
const formErrors = ref<{ [key: string]: string }>({...initialErrors});
const isBusy = ref<boolean>(false);

function getPageTitle() {
  return `Checkout - ${checkoutStore.product.name} $${checkoutStore.product.price}`;
}

function handleResponseError(error: any) {
  console.error(error);

  if (error?.response?.status === 422) {
    const errors = error.response.data.errors;

    Object.keys(errors).forEach((key) => {
      formErrors.value[key] = errors[key][0].replace('.', ' ');
    });
  } else if (error?.response?.status === 400) {
    checkoutStore.SET_ERROR(error.response.data.error);

    router.push({
      name: 'checkout-error',
    });
  } else {
    unknowError.value = true;
  }
}

async function handleSubmit() {
  isBusy.value = true;
  unknowError.value = false;
  formErrors.value = {...initialErrors};

  try {
    const response = await checkoutService.checkout({
      ...formData,
      creditCard: formData.billingType === 'CREDIT_CARD' ? formData.creditCard : undefined,
      value: checkoutStore.product.price,
    });

    checkoutStore.SET_PAYMENT(response.data.data);

    router.push({
      name: 'checkout-success',
    });
  } catch (error: any) {
    handleResponseError(error);
  } finally {
    isBusy.value = false;
  }
}
</script>

<template>
  <BaseBreadcrumb :title="getPageTitle()" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <v-card>
    <v-card-text>
      <v-sheet class="mx-auto" width="800">
        <v-form @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-h4 mb-4">Billing</p>

              <v-select
                v-model="formData.billingType"
                label="Method"
                :items="billingTypeOptions"
                variant="outlined"
                :error="!!formErrors.billingType"
                :error-messages="formErrors.billingType"
              ></v-select>

              <v-text-field
                v-model="formData.name"
                label="Name"
                variant="outlined"
                :error="!!formErrors.name"
                :error-messages="formErrors.name"
              ></v-text-field>

              <v-text-field
                v-model="formData.email"
                label="E-mail"
                variant="outlined"
                :error="!!formErrors.email"
                :error-messages="formErrors.email"
              ></v-text-field>

              <v-text-field
                v-model="formData.cpf"
                label="CPF"
                variant="outlined"
                :error="!!formErrors.cpf"
                :error-messages="formErrors.cpf"
              ></v-text-field>

              <v-text-field
                v-model="formData.phone"
                label="Phone"
                variant="outlined"
                :error="!!formErrors.phone"
                :error-messages="formErrors.phone"
              ></v-text-field>

              <v-text-field
                v-model="formData.postalCode"
                label="Postal Code"
                variant="outlined"
                :error="!!formErrors.postalCode"
                :error-messages="formErrors.postalCode"
              ></v-text-field>

              <v-text-field
                v-model="formData.addressNumber"
                label="Address number"
                variant="outlined"
                :error="!!formErrors.addressNumber"
                :error-messages="formErrors.addressNumber"
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
              <div v-if="formData.billingType === 'CREDIT_CARD'">
                <p class="text-h4 mb-4">Credit Card</p>

                <v-text-field
                  v-model="formData.creditCard.holderName"
                  label="Holder name"
                  variant="outlined"
                  :error="!!formErrors['creditCard.holderName']"
                  :error-messages="formErrors['creditCard.holderName']"
                ></v-text-field>

                <v-text-field
                  v-model="formData.creditCard.number"
                  label="Number"
                  variant="outlined"
                  :error="!!formErrors['creditCard.number']"
                  :error-messages="formErrors['creditCard.number']"
                ></v-text-field>

                <v-text-field
                  v-model="formData.creditCard.expiryMonth"
                  label="Expiry month (MM)"
                  variant="outlined"
                  :error="!!formErrors['creditCard.expiryMonth']"
                  :error-messages="formErrors['creditCard.expiryMonth']"
                ></v-text-field>

                <v-text-field
                  v-model="formData.creditCard.expiryYear"
                  label="Expiry year (YYYY)"
                  variant="outlined"
                  :error="!!formErrors['creditCard.expiryYear']"
                  :error-messages="formErrors['creditCard.expiryYear']"
                ></v-text-field>

                <v-text-field
                  v-model="formData.creditCard.ccv"
                  label="CCV"
                  variant="outlined"
                  :error="!!formErrors['creditCard.ccv']"
                  :error-messages="formErrors['creditCard.ccv']"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>

          <div>
            <v-btn variant="tonal" type="submit" :disabled="isBusy">Pay</v-btn>
            <v-progress-circular v-if="isBusy" class="mx-3" indeterminate></v-progress-circular>
          </div>
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>

  <v-snackbar v-model="unknowError" :timeout="2000">
    Unknown error. Please try again.
  </v-snackbar>
</template>
