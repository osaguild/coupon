<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Navi </v-list-item-title>
          <v-list-item-subtitle> hoge hoge </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-on:click="changePage('/search')">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Search </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-on:click="changePage('/list')">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> List </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      Saitama Premium
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer padless>
      <v-col class="text-center" cols="12">
        <strong>@ {{ new Date().getFullYear() }} osaguild.com</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    changePage: function (page) {
      this.$router.push(page);
      this.drawer = false;
    },
  },
};
</script>
