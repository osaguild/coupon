<template>
  <v-container>
    <search-form :param="form" @update:form="form = $event"></search-form>
    <my-map :markers="getMerchants" :center="getCenter"></my-map>
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
      latLans: {
        "西区": { lat: 35.9129, lng: 139.5789 },
        "北区": { lat: 35.9315, lng: 139.6203 },
        "大宮区": { lat: 35.9064, lng: 139.6287 },
        "見沼区": { lat: 35.9352, lng: 139.6545 },
        "中央区": { lat: 35.884, lng: 139.6261 },
        "桜区": { lat: 35.8637, lng: 139.6043 },
        "浦和区": { lat: 35.8616, lng: 139.6454 },
        "南区": { lat: 35.8427, lng: 139.6655 },
        "緑区": { lat: 35.871, lng: 139.6839 },
        "岩槻区": { lat: 35.9498, lng: 139.6941 },
      },
    };
  },
  computed: {
    getMerchants: function () {
      return Merchant.search(this.form);
    },
    getCenter: function () {
      return this.latLans[this.form.area];
    },
  },
};
</script>