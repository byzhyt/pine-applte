const router: any = createRouter({
  routes: [..._ROUTES]
});

router.beforeEach((to: any, from: any) => {
  if (getToken()) {
    return true;
  } else {
    if (to.path == "/login") {
      return true;
    } else {
      return "/login";
    }
  }
});

export default router;
