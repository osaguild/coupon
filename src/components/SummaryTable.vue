<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header> Paper Electronic </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table> </v-simple-table>
        <v-data-table
          :headers="headers"
          :items="summary.paper_electronic"
          :items-per-page="-1"
          class="elevation-1"
          disable-sort
          hide-default-footer
        ></v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header> Private Common </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
          :headers="headers"
          :items="summary.private_common"
          :items-per-page="-1"
          class="elevation-1"
          disable-sort
          hide-default-footer
        ></v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header> Area </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
          :headers="headers"
          :items="summary.area"
          :items-per-page="-1"
          class="elevation-1"
          disable-sort
          hide-default-footer
        ></v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header> Category </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
          :headers="headers"
          :items="summary.category"
          :items-per-page="-1"
          class="elevation-1"
          disable-sort
          hide-default-footer
        ></v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Summary from "../../data/summary_all.json";

export default {
  name: "SummaryTable",
  data() {
    return {
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
          width: "50%",
        },
        { text: "Count", value: "count", width: "50%" },
      ],
      summary: Summary,
    };
  },
};
</script>