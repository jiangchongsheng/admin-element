<template>
  <div>
    <js-barcode ref-id="barcodeId" content="123123"/>
    <identify v-model="content"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '12324'
    }
  },
  created() {
  },
  methods: {
  }
}

</script>

<style></style>
