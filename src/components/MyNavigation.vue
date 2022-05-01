<template>
  <v-navigation-drawer v-model="drawer" absolute temporary app>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Menu </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense nav>
      <v-list-item v-on:click="changePage('/search')">
        <v-list-item-icon>
          <v-icon>{{ searchIcon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title> Search </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
        <v-list-item v-on:click="changePage('/list')">
          <v-list-item-icon>
            <v-icon>{{ listIcon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> List </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mdiMagnify, mdiCardTextOutline } from "@mdi/js";

export default {
  name: "MyNavigation",
  props: ["param"],
  data() {
    return {
      searchIcon: mdiMagnify,
      listIcon: mdiCardTextOutline,
    };
  },
  computed: {
    drawer: {
      get() {
        return this.param;
      },
      set(drawer) {
        this.$emit("update:drawer", drawer);
      },
    },
  },
  methods: {
    changePage: function (page) {
      if (this.$route.path !== page) {
        this.$router.push(page);
      }
      this.drawer = false;
    },
  },
};
</script>