<template>
  <div>
    <GmapMap
      :center="center"
      :zoom="13"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <GmapInfoWindow
        :options="info.options"
        :position="info.position"
        :opened="info.opened"
        @closeclick="info.opened = false"
      >
        <span v-if="info.category === '飲食店' && info.url === undefined">
          {{ info.name }}
        </span>
        <a
          v-else-if="info.category === '飲食店'"
          :href="info.url"
          target="_blank"
        >
          ★{{ info.star }} {{ info.name }}
        </a>
        <span v-else-if="info.category !== '飲食店'">
          {{ info.name }}
        </span>
      </GmapInfoWindow>
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="toggleInfoWindow(m)"
      />
    </GmapMap>
  </div>
</template>

<script>
import Taberogu from "@/domain/Taberogu.js";

export default {
  name: "MyMap",
  props: ["markers", "center"],
  data() {
    return {
      info: {
        name: null,
        url: null,
        star: null,
        category: null,
        position: null,
        opened: false,
        options: {
          pixelOffset: {
            width: 0,
            height: -35,
          },
        },
      },
    };
  },
  methods: {
    async toggleInfoWindow(marker) {
      const tageroguInfo = await Taberogu.getShop(marker.name);
      this.info.position = marker.position;
      this.info.name = marker.name;
      this.info.url = tageroguInfo.url;
      this.info.star = tageroguInfo.star;
      this.info.category = marker.category;
      this.info.opened = true;
      console.log("url:", this.info.url);
    },
  },
};
</script>