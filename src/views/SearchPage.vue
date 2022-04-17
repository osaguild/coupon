<template>
  <v-container>
    <search-form :param="form" @update:form="form = $event"></search-form>
    <my-map :markers="getMerchants"></my-map>
    <merchant-table
      :param="getMerchants"
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
    getMerchants: function () {
      return Merchant.search(this.form);
    },
  },
};
</script>