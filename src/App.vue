<template>
  <div>
    {{area}}
    {{category}}
  </div>
</template>

<script>
import Merchant from "../data/merchant.json"
import Area from "../data/area.json"
import Category from "../data/category.json"

export default {
  data() {
    return {
      merchant: Merchant,
      area: Area,
      category: Category
    }
  }
}
</script>