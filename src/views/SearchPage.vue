<template>
  <v-container>
    <search-form :param="form" @update:form="form = $event"></search-form>
    <my-map :markers="merchants"></my-map>
    <merchant-table
      :param="merchants"
      @update:info="toggleInfoWindow($event)"
    ></merchant-table>
  </v-container>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";
import MyMap from "@/components/MyMap.vue";
import MerchantTable from "@/components/MerchantTable.vue";
import Merchant from "@/domain/Merchant.js";

export default {
  components: { SearchForm, MerchantTable, MyMap },
  name: "SearchPage",
  data() {
    return {
      form: {
        area: "浦和区",
        category: "飲食店",
        paper_electronic: null,
        private_common: null,
      },
    };
  },
  computed: {
    merchants: function() {
      return Merchant.search(this.form.area, this.form.category, this.form.paper_electronic, this.form.private_common);
    },
  }
};
</script>