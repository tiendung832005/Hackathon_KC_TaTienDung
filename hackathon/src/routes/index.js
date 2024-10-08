import { createRouter, createWebHistory } from "vue-router";

// B1: Định nghĩa danh sách các router
const routes = [
          {
            path: "/admin",
            component: () => import(/* webpackChunkName: "admin" */ "@/views/Dashboard.vue"),
            name: "Dashboard",
          },
          {
            path: "/admin/manager-user",
            component: () => import(/* webpackChunkName: "users" */ "@/views/ManagerUser.vue"),
            name: "managerUser",
          },
          {
            path: "/admin/manager-product",
            component: () => import(/* webpackChunkName: "products" */ "@/views/ManagerProduct.vue"),
            name: "managerProduct",
          },
        ]
//   {
//     path: "/dashboard",
//     name: "dashboard",
//     component: () => import(/* webpackChunkName: "dashboard" */ "@/components/Dashboard.vue"),
//     beforeEnter: (to, from, next) => {
//       const isLogin = true; // giả sử người dùng đã đăng nhập
//       if (to.path === "/dashboard" && !isLogin) {
//         // Chuyển hướng về trang login nếu chưa login
//         next("/login");
//       } else {
//         next();
//       }
//     },
//   },



// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
