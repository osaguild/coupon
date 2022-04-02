<template>
  <div>
    <router-link to="/search">search page</router-link>
    <span> / </span>
    <router-link to="/list">list page</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>