<template>
  <div>
    <table>
      <tr>
        <th>name</th>
        <th>count</th>
      </tr>
      <tr>
        <th>all</th>
        <th>{{ summary.all }}</th>
      </tr>
      <tr
        v-for="paper_electronic in summary.paper_electronic"
        :key="paper_electronic.name"
      >
        <td v-text="paper_electronic.name"></td>
        <td v-text="paper_electronic.count"></td>
      </tr>
      <tr
        v-for="private_common in summary.private_common"
        :key="private_common.name"
      >
        <td v-text="private_common.name"></td>
        <td v-text="private_common.count"></td>
      </tr>
      <tr v-for="area in summary.area" :key="area.name">
        <td v-text="area.name"></td>
        <td v-text="area.count"></td>
      </tr>
      <tr v-for="category in summary.category" :key="category.name">
        <td v-text="category.name"></td>
        <td v-text="category.count"></td>
      </tr>
    </table>
  </div>
  <div>
    area :
    <select v-model="selected_area">
      <option value="ALL">ALL</option>
      <option v-for="area in areas" :key="area">
        {{ area }}
      </option>
    </select>
    <span> {{ selected_area }} </span>
  </div>
  <div>
    category :
    <select v-model="selected_category">
      <option value="ALL">ALL</option>
      <option v-for="category in categorys" :key="category">
        {{ category }}
      </option>
      {{
        selected_category
      }}
    </select>
    <span> {{ selected_category }} </span>
  </div>
  <div>
    paper_electronic :
    <select v-model="selected_paper_electronic">
      <option value="ALL">ALL</option>
      <option
        v-for="paper_electronic in paper_electronics"
        :key="paper_electronic"
      >
        {{ paper_electronic }}
      </option>
      {{
        selected_paper_electronic
      }}
    </select>
    <span> {{ selected_paper_electronic }} </span>
  </div>
  <div>
    private_common :
    <select v-model="selected_private_common">
      <option value="ALL">ALL</option>
      <option v-for="private_common in private_commons" :key="private_common">
        {{ private_common }}
      </option>
      {{
        selected_private_common
      }}
    </select>
    <span> {{ selected_private_common }} </span>
  </div>
  <div>
    <p>count: {{ filteredMerchants.length }}</p>
    <table>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>category</th>
        <th>address</th>
        <th>ticket</th>
      </tr>
      <tr v-for="merchant in filteredMerchants" :key="merchant.id">
        <td v-text="merchant.id"></td>
        <td v-text="merchant.name"></td>
        <td v-text="merchant.category"></td>
        <td v-text="merchant.address"></td>
        <td v-text="merchant.ticket"></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Merchant from "../data/merchant.json";
import Area from "../data/area.json";
import Category from "../data/category.json";
import TicketType from "../data/ticket_type.json";
import Summary from "../data/summary_all.json";

export default {
  data() {
    return {
      merchants: Merchant,
      areas: Area,
      categorys: Category,
      summary: Summary,
      paper_electronics: TicketType.paper_electronic,
      private_commons: TicketType.private_common,
      selected_area: null,
      selected_category: null,
      selected_paper_electronic: null,
      selected_private_common: null,
    };
  },
  computed: {
    filteredMerchants: function () {
      var _mi = this.merchants;
      var _mo = [];
      var i = 0;
      var j = 0;

      // search area
      if (this.selected_area != null && this.selected_area != "ALL") {
        for (i in _mi) {
          if (_mi[i].address.indexOf(this.selected_area) > -1) {
            _mo.push(_mi[i]);
          }
        }
        _mi = _mo;
      }
      // search category
      if (this.selected_category != null && this.selected_category != "ALL") {
        _mo = [];
        i = 0;
        for (i in _mi) {
          if (_mi[i].category == this.selected_category) {
            _mo.push(_mi[i]);
          }
        }
        _mi = _mo;
      }
      // search paper_electronic
      if (
        this.selected_paper_electronic != null &&
        this.selected_paper_electronic != "ALL"
      ) {
        _mo = [];
        i = 0;
        j = 0;
        for (i in _mi) {
          for (j in _mi[i].ticket) {
            if (_mi[i].ticket[j] == this.selected_paper_electronic) {
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
      console.log(_mo);
      return _mo;
    },
  },
};
</script>