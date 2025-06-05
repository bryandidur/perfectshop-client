const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard/default',
  component: () => import('@/layouts/full/FullLayout.vue'),
  children: [
    {
      name: 'products',
      path: '/products',
      component: () => import('@/views/products/ProductsPage.vue'),
    },
    {
      name: 'checkout',
      path: '/checkout',
      component: () => import('@/views/checkout/CheckoutPage.vue'),
    },
    {
      name: 'checkout-success',
      path: '/checkout/success',
      component: () => import('@/views/checkout/SuccessPage.vue'),
    },
    {
      name: 'checkout-error',
      path: '/checkout/error',
      component: () => import('@/views/checkout/ErrorPage.vue'),
    },
  ]
};

export default MainRoutes;
