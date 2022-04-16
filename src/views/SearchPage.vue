<template>
  <v-container>
    <search-form :param="form" @update:form="form = $event"></search-form>
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
import SearchForm from "../components/SearchForm.vue";

export default {
  components: { SearchForm },
  name: "SearchPage",
  data() {
    return {
      merchants: Merchant,
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