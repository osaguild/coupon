<template>
  <div>
    area :
    <select v-model="selected_area">
      <option v-for="area in areas" :key="area">
        {{ area }}
      </option>
    </select>
    <span> {{ selected_area }} </span>
  </div>
  <div>
    category :
    <select v-model="selected_category">
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

export default {
  data() {
    return {
      merchants: Merchant,
      areas: Area,
      categorys: Category,
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
      var _merchants = [];
      for (var i in this.merchants) {
        if (
          this.merchants[i].category == this.selected_category &&
          this.merchants[i].address.indexOf(this.selected_area) > -1
        ) {
          var has_pe = false;
          var has_pc = false;
          for (var j in this.merchants[i].ticket) {
            if (this.merchants[i].ticket[j] == this.selected_paper_electronic) {
              has_pe = true;
            } else if (this.merchants[i].ticket[j] == this.selected_private_common) {
              has_pc = true;
            }
          }
          if (has_pe == true && has_pc == true) {
            _merchants.push(this.merchants[i]);
          }
        }
      }
      return _merchants;
    },
  },
};
</script>