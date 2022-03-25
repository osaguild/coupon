<template>
  <div>
    {{data}}
  </div>
</template>

<script>
import Data from "../data/formatted_data.json"
export default {
  data() {
    return {
      data: Data
    }
  }
}
</script>