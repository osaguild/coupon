<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="merchants"
      :items-per-page="10"
      :page.sync="page"
      class="elevation-1"
      disable-sort
      hide-default-footer
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.category`]="{ item }">
        <v-chip>
          {{ item.category }}
        </v-chip>
      </template>
      <template v-slot:[`item.ticket`]="{ item }">
        <v-chip v-for="ticket in item.ticket" :key="ticket">
          {{ ticket }}
        </v-chip>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination 
      v-model="page"
      :length="pageCount"
      :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "MerchantTable",
  props: ["param"],
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Ticket", value: "ticket" },
      ],
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    merchants: {
      get() {
        return this.param;
      },
    },
  },
};
</script>