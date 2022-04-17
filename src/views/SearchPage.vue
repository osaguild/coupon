<template>
  <v-container>
    <search-form :param="form" @update:form="form = $event"></search-form>
    <my-map :markers="filteredMerchants"></my-map>
    <merchant-table
      :param="filteredMerchants"
      @update:info="toggleInfoWindow($event)"
    ></merchant-table>
  </v-container>
</template>

<script>
import MerchantTable from "@/components/MerchantTable.vue";
import SearchForm from "@/components/SearchForm.vue";
import MyMap from "@/components/MyMap.vue";
import Merchant from "../../data/merchant.json";

export default {
  components: { SearchForm, MerchantTable, MyMap },
  name: "SearchPage",
  data() {
    return {
      merchants: Merchant,
      form: {
        area: "浦和区",
        category: "飲食店",
        paper_electronic: null,
        private_common: null,
      },
    };
  },
  computed: {
    filteredMerchants: function () {
      var _mi = this.merchants;
      var _mo = [];
      var i = 0;
      var j = 0;

      // search area
      if (this.form.area != null && this.form.area != "ALL") {
        for (i in _mi) {
          if (_mi[i].address.indexOf(this.form.area) > -1) {
            _mo.push(_mi[i]);
          }
        }
        _mi = _mo;
      }
      // search category
      if (this.form.category != null && this.form.category != "ALL") {
        _mo = [];
        i = 0;
        for (i in _mi) {
          if (_mi[i].category == this.form.category) {
            _mo.push(_mi[i]);
          }
        }
        _mi = _mo;
      }
      // search paper_electronic
      if (
        this.form.paper_electronic != null &&
        this.form.paper_electronic != "ALL"
      ) {
        _mo = [];
        i = 0;
        j = 0;
        for (i in _mi) {
          for (j in _mi[i].ticket) {
            if (_mi[i].ticket[j] == this.form.paper_electronic) {
              _mo.push(_mi[i]);
            }
          }
        }
        _mi = _mo;
      }
      // search private_common
      if (
        this.selected_private_common != null &&
        this.selected_private_common != "ALL"
      ) {
        _mo = [];
        i = 0;
        j = 0;
        for (i in _mi) {
          for (j in _mi[i].ticket) {
            if (_mi[i].ticket[j] == this.selected_private_common) {
              _mo.push(_mi[i]);
            }
          }
        }
      }
      _mo.position;
      return _mo;
    },
  },
};
</script>