<template>
<div>
  <GmapMap
    :center="center"
    :zoom="13"
    map-type-id="terrain"
    style="width: 100%; height: 500px"
  >
    <GmapInfoWindow
      :options="options"
      :position="position"
      :opened="opened"
      @closeclick="opened = false"
    >
      <a :href="url" target="_blank">{{ name }}</a>
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
      position: null,
      name: null,
      url: null,
      opened: false,
      options: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  methods: {
    async toggleInfoWindow(marker) {
      const url = await Taberogu.get(marker.name);
      this.position = marker.position;
      this.name = marker.name;
      this.url = url;
      this.opened = true;
    },
  },
};
</script>