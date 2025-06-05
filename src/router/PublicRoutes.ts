const PublicRoutes = {
  path: '/',
  component: () => import('@/layouts/blank/BlankLayout.vue'),
  meta: {
    requiresAuth: false
  },
  children: [
    {
      name: 'login',
      path: '/',
      component: () => import('@/views/auth/LoginPage.vue')
    },
    {
      name: 'error-404',
      path: '/error',
      component: () => import('@/views/404.vue')
    },
  ],
};

export default PublicRoutes;
