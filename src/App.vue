<template>
  <div>
    <select v-model="selected_area">
      <option v-for="area in areas" :key="area">
        {{ area }}
      </option>
    </select>
    <span> {{ selected_area }} </span>
  </div>
  <div>
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
</template>

<script>
import Merchant from "../data/merchant.json";
import Area from "../data/area.json";
import Category from "../data/category.json";

export default {
  data() {
    return {
      merchants: Merchant,
      areas: Area,
      categorys: Category,
      selected_area: "",
      selected_category: "",
    };
  },
};
</script>