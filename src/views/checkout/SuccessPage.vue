<script setup lang="ts">
import { shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';

const breadcrumbs = shallowRef([
  {
    title: 'Checkout Success',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb title="Success" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Success">
        Success
      </UiParentCard>
    </v-col>
  </v-row>
</template>
