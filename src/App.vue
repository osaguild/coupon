<template>
  <v-app>
    <my-header @update:drawer="drawer = true"></my-header>
    <my-navigation
      :param="drawer"
      @update:drawer="drawer = $event"
    ></my-navigation>
    <v-main>
      <router-view></router-view>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import MyNavigation from "./components/MyNavigation.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyHeader,
    MyNavigation,
    MyFooter,
  },
  data() {
    return {
      drawer: false,
    };
  },
};
</script>
