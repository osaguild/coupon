<template>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Paper Electronic </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="summary.paper_electronic"
            hide-default-footer
            class="elevation-1"
          ></v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header> Private Common </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="summary.private_common"
            hide-default-footer
            class="elevation-1"
          ></v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header> Area </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="summary.area"
            hide-default-footer
            class="elevation-1"
          ></v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header> Category </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="summary.category"
            hide-default-footer
            class="elevation-1"
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
        { text: "Name", align: "start", sortable: false, value: "name" },
        { text: "Count", value: "count" },
      ],
      summary: Summary,
    };
  },
};
</script>