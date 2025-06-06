<script setup lang="ts">
import { shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCheckoutStore } from '@/stores/checkout';
import { router } from '@/router';

const checkoutStore = useCheckoutStore();
const breadcrumbs = shallowRef([
  {
    title: 'Products',
    disabled: true,
    href: '#'
  }
]);

function handleProductClick(name: string, price: number) {
  checkoutStore.SET_PRODUCT({ name, price });

  router.push({
    name: 'checkout',
  });
}
</script>

<template>
  <BaseBreadcrumb title="Products" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12" md="3">
      <UiParentCard title="Laptop">
        <p>Price: $999</p>
        <p>RAM: 16GB</p>
        <p>Storage: 512GB SSD</p>

        <template #actions>
          <v-btn
            variant="tonal"
            block
            @click="handleProductClick('Laptop', 999)"
          >
            Buy
          </v-btn>
        </template>
      </UiParentCard>
    </v-col>

    <v-col cols="12" md="3">
      <UiParentCard title="Smartphone">
        <p>Price: $499</p>
        <p>RAM: 8GB</p>
        <p>Storage: 256GB</p>

        <template #actions>
          <v-btn
            variant="tonal"
            block
            @click="handleProductClick('Smartphone', 499)"
          >
            Buy
          </v-btn>
        </template>
      </UiParentCard>
    </v-col>

    <v-col cols="12" md="3">
      <UiParentCard title="Headphone">
        <p>Price: $299</p>
        <p>High audio quality</p>
        <p>Long battery life</p>

        <template #actions>
          <v-btn
            variant="tonal"
            block
            @click="handleProductClick('Headphone', 299)"
          >
            Buy
          </v-btn>
        </template>
      </UiParentCard>
    </v-col>

    <v-col cols="12" md="3">
      <UiParentCard title="Monitor">
        <p>Price: $199</p>
        <p>Size: 24 inches</p>
        <p>Resolution: 1080p</p>

        <template #actions>
          <v-btn
            variant="tonal"
            block
            @click="handleProductClick('Monitor', 199)"
          >
            Buy
          </v-btn>
        </template>
      </UiParentCard>
    </v-col>
  </v-row>
</template>
