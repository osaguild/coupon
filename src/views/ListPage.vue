<template>
  <v-container>
    <h3>All</h3>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="summary.all"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <h3>Paper Electronic</h3>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="summary.paper_electronic"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <h3>Private Common</h3>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="summary.private_common"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <h3>Area</h3>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="summary.area"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
    <h3>Category</h3>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="summary.category"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Summary from "../../data/summary_all.json";

export default {
  name: "ListPage",
  data() {
    return {
      headers: [
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Count", value: "count" },
      ],
      summary: Summary,
    };
  },
};
</script>