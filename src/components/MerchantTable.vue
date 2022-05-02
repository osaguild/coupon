<template>
  <v-data-table
    :headers="headers"
    :items="merchants"
    :items-per-page="10"
    class="elevation-1"
    disable-sort
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