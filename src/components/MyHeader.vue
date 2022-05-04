<template>
  <v-app-bar :color="color" app>
    <v-app-bar-nav-icon @click="showNavigation"></v-app-bar-nav-icon>
    <v-toolbar-title>Saitama Premium</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="originLink">
      Origin Site
      <v-icon> {{ launchIcon }} </v-icon>
    </v-btn>
  </v-app-bar>
</template>
<script>
import { mdiLaunch } from "@mdi/js";

export default {
  name: "MyHeader",
  data() {
    return {
      launchIcon: mdiLaunch,
      color: null,
    };
  },
  mounted: function () {
    const target = process.env.VUE_APP_TARGET;
    if (target == "local") {
      this.color = "yellow lighten-3";
    } else if (target == "dev") {
      this.color= "red lighten-3";
    } else if (target == "prd") {
      this.color="blue lighten-3";
    }
  },
  methods: {
    originLink: function () {
      window.open("https://saitama-premium-search.com/", "_blank");
    },
    showNavigation: function () {
      this.$emit("update:drawer");
    },
  },
};
</script>
