<template>
  <div>
    {{merchant}}
  </div>
</template>

<script>
import Merchant from "../data/merchant.json"
export default {
  data() {
    return {
      merchant: Merchant,
    }
  }
}
</script>