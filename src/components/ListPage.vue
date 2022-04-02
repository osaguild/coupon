<template>
  <div>
    <p>list page</p>
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
  </div>
</template>

<script>
import Summary from "../../data/summary_all.json";

export default {
  name: "ListPage",
  data() {
    return {
      summary: Summary,
    };
  },
};
</script>