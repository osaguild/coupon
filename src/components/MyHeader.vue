<template>
  <v-app-bar app>
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
    };
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
