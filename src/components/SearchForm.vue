<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header> Input Form </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-select
          :items="areas"
          label="Area"
          v-model="form.area"
        ></v-select>
        <v-select
          :items="categorys"
          label="Category"
          v-model="form.category"
        ></v-select>
        <v-select
          :items="paper_electronics"
          label="Paper / Electronic"
          v-model="form.paper_electronic"
        ></v-select>
        <v-select
          :items="private_commons"
          label="Private / Common"
          v-model="form.private_common"
        ></v-select>
        <!--
        <p>count: {{ filteredMerchants.length }}</p>
        -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Area from "../../data/area.json";
import Category from "../../data/category.json";
import TicketType from "../../data/ticket_type.json";

export default {
  name: "SearchForm",
  props: ["param"],
  data() {
    return {
      areas: Area,
      categorys: Category,
      paper_electronics: TicketType.paper_electronic,
      private_commons: TicketType.private_common,
    };
  },
  computed: {
    form: {
      get() {
        return this.param
      },
      set(form) {
        this.$emit("update:form", form);
      }
    }
  },
};
</script>