<template>
  <v-app>
    <my-header @update:drawer="drawer = true"></my-header>
    <my-navigation
      :drawer="drawer"
      @update:drawer="drawer = $event"
    ></my-navigation>
    <v-main>
      <router-view></router-view>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
import MyNavigation from "./components/MyNavigation.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
    MyNavigation,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
