<template>
  <v-navigation-drawer v-model="show" absolute temporary>
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
      <!-- List is under development -->
      <!--
        <v-list-item v-on:click="changePage('/list')">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> List </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        -->
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mdiMagnify } from "@mdi/js";

export default {
  name: "MyNavigation",
  props: ["drawer"],
  data() {
    return {
      searchIcon: mdiMagnify,
    };
  },
  computed: {
    show: {
      get() {
        return this.drawer;
      },
      set(show) {
        this.$emit("update:drawer", show);
      },
    },
  },
  methods: {
    changePage: function (page) {
      if (this.$route.path !== page) {
        this.$router.push(page);
      }
      this.show = false;
    },
  },
};
</script>