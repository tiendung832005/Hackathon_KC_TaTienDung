<template>
    <div id="app">
    <nav>
      <router-link to="/admin" exact-active-class="active-link">Dashboard</router-link>
      <router-link to="/admin/manager-user" exact-active-class="active-link">Manager User</router-link>
      <router-link to="/admin/manager-product" exact-active-class="active-link">Manager Product</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  background-color: black;
  padding: 10px;
  font-size: 23px;
}

router-link {
  color: white !important; /* Đảm bảo màu trắng được áp dụng */
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
}

router-link:hover {
  color: white; /* Giữ nguyên màu trắng khi hover */
}

.active-link {
  background-color: #4c4c4c;
  color: white !important; /* Đảm bảo màu trắng khi active */
}

a {
  color: white;
  text-decoration: none;
}


</style>