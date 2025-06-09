<script setup lang="ts">
import { shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCheckoutStore } from '@/stores/checkout';
import { router } from '@/router';

const checkoutStore = useCheckoutStore();
const breadcrumbs = shallowRef([
  {
    title: 'Checkout Error',
    disabled: true,
    href: '#'
  }
]);

function handleBackClick() {
  router.push({ name: 'checkout' });
}
</script>

<template>
  <BaseBreadcrumb title="Error" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Error">
        <p>{{ checkoutStore.error || 'Erro desconhecido.' }}</p>

        <v-btn class="mt-4" variant="tonal" type="submit" @click="handleBackClick()">Back</v-btn>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
