<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          :items="areas"
          label="Area"
          v-model="selected_area"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="categorys"
          label="Category"
          v-model="selected_category"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="paper_electronics"
          label="Paper / Electronic"
          v-model="selected_paper_electronic"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="private_commons"
          label="Private / Common"
          v-model="selected_private_common"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GmapMap
          :center="{ lat: 35.890859, lng: 139.615088 }"
          :zoom="12"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
        >
          <GmapMarker
            :key="index"
            v-for="(merchant, index) in filteredMerchants"
            :position="merchant.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </v-col>
    </v-row>
    <v-row>
      <v-col> count: {{ filteredMerchants.length }} </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="filteredMerchants"
          hide-default-footer
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Merchant from "../../data/merchant.json"
import Area from "../../data/area.json"
import Category from "../../data/category.json"
import TicketType from "../../data/ticket_type.json"

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
        { text: "Id", align: "start", sortable: false, value: "id" },
        { text: "Name", value: "name" },
        { text: "Category", value: "category" },
        { text: "Address", value: "address" },
        { text: "Ticket", value: "ticket" },
      ],
    }
  },
  computed: {
    filteredMerchants: function () {

      var _mi = this.merchants
      var _mo = []
      var i = 0
      var j = 0

      // search area
      if (this.selected_area != null && this.selected_area != "ALL") {
        for (i in _mi) {
          if (_mi[i].address.indexOf(this.selected_area) > -1) {
            _mo.push(_mi[i])
          }
        }
        _mi = _mo
      }
      // search category
      if (this.selected_category != null && this.selected_category != "ALL") {
        _mo = []
        i = 0
        for (i in _mi) {
          if (_mi[i].category == this.selected_category) {
            _mo.push(_mi[i])
          }
        }
        _mi = _mo
      }
      // search paper_electronic
      if (
        this.selected_paper_electronic != null &&
        this.selected_paper_electronic != "ALL"
      ) {
        _mo = []
        i = 0
        j = 0
        for (i in _mi) {
          for (j in _mi[i].ticket) {
            if (_mi[i].ticket[j] == this.selected_paper_electronic) {
              _mo.push(_mi[i])
            }
          }
        }
        _mi = _mo
      }
      // search private_common
      if (
        this.selected_private_common != null &&
        this.selected_private_common != "ALL"
      ) {
        _mo = []
        i = 0
        j = 0
        for (i in _mi) {
          for (j in _mi[i].ticket) {
            if (_mi[i].ticket[j] == this.selected_private_common) {
              _mo.push(_mi[i])
            }
          }
        }
      }
      _mo.position
      return _mo
    },
  },
  mounted() {
    let timer = setInterval(() => {
      if (window.google) {
        clearInterval(timer)
        const map = new window.google.maps.Map(this.$refs.map, {
          center: new window.google.maps.LatLng(35.890859, 139.615088),
          zoom: 12,
        })
        var k = 0
        for (k in this.merchants) {
          // maker
          const maker = new window.google.maps.Marker({
            map: map,
            position: new window.google.maps.LatLng(
              Number(this.merchants[k].lat),
              Number(this.merchants[k].lng)
            ),
          })
          // info window
          const info = new window.google.maps.InfoWindow({
            content: this.merchants[k].name,
          })
          // event
          maker.addListener("click", function () {
            info.open(map, maker)
          })
        }
      }
    }, 3000)
  },
}
</script>