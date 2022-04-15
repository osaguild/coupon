<template>
  <v-container>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header> Input Form </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-select
            :items="areas"
            label="Area"
            v-model="selected_area"
          ></v-select>
          <v-select
            :items="categorys"
            label="Category"
            v-model="selected_category"
          ></v-select>
          <v-select
            :items="paper_electronics"
            label="Paper / Electronic"
            v-model="selected_paper_electronic"
          ></v-select>
          <v-select
            :items="private_commons"
            label="Private / Common"
            v-model="selected_private_common"
          ></v-select>
          <p>count: {{ filteredMerchants.length }}</p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <GmapMap
      :center="{ lat: 35.890859, lng: 139.615088 }"
      :zoom="12"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        {{ infoDisplay }}
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in filteredMerchants"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m)"
      />
    </GmapMap>
    <v-data-table
      :headers="headers"
      :items="filteredMerchants"
      :items-per-page="10"
      class="elevation-1"
      @click:row="toggleInfoWindow"
      disable-sort
    ></v-data-table>
  </v-container>
</template>

<script>
import Merchant from "../../data/merchant.json";
import Area from "../../data/area.json";
import Category from "../../data/category.json";
import TicketType from "../../data/ticket_type.json";

export default {
  name: "SearchPage",
  data() {
    return {
      merchants: Merchant,
      areas: Area,
      categorys: Category,
      paper_electronics: TicketType.paper_electronic,
      private_commons: TicketType.private_common,
      selected_area: "西区",
      selected_category: null,
      selected_paper_electronic: null,
      selected_private_common: null,
      headers: [
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Ticket", value: "ticket" },
      ],
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: true,
      infoDisplay: "",
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
      _mo.position;
      return _mo;
    },
  },
  methods: {
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoWinOpen = true;
      this.infoDisplay = marker.name;
    },
  },
};
</script>