<script setup lang="ts">
import { shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCheckoutStore } from '@/stores/checkout';

const checkoutStore = useCheckoutStore();
const breadcrumbs = shallowRef([
  {
    title: 'Checkout Success',
    disabled: true,
    href: '#'
  }
]);

function getPixQrCodeUrl() {
  return `data:image/png;base64,${checkoutStore.payment.pixQrCode}`;
}
</script>

<template>
  <BaseBreadcrumb title="Success" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Successful payment">
        <div v-if="checkoutStore.payment.billingType === 'CREDIT_CARD'">
          <p>Your payment was successful!</p>
        </div>
        <div v-else>
          <p>Scan the QRCode below to pay.</p>

          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="getPixQrCodeUrl()"
          ></v-img>
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
