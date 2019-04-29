<template>
  <div>
    <sidentify :identify-code="identifyCode" />
  </div>

</template>

<script>
import Sidentify from '../../components/components/identify.vue'
export default {
  components: {
    Sidentify
  },
  data() {
    return {
      identifyCode: '12345'
    }
  }
}

</script>

<style></style>
