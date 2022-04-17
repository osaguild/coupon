<template>
  <GmapMap
    :center="{ lat: 35.890859, lng: 139.615088 }"
    :zoom="12"
    map-type-id="terrain"
    style="width: 100%; height: 500px"
  >
    <GmapInfoWindow
      :options="options"
      :position="position"
      :opened="opened"
      @closeclick="opened = false"
    >
      {{ text }}
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
</template>

<script>
export default {
  name: "MyMap",
  props: ["markers"],
  data() {
    return {
      position: null,
      text: null,
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
    toggleInfoWindow(marker) {
      this.position = marker.position;
      this.text = marker.name;
      this.opened = true;
    },
  },
};
</script>