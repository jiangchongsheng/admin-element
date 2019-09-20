<template>
  <div>
    <js-barcode/>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  watch: {
    objData: {
      handler() {
        // this.drawLine()
      },
      deep: true

    }
  },
  created() {
  },
  methods: {
  }
}

</script>

<style></style>
