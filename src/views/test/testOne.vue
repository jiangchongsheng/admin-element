<template>
  <div>
    <identify v-model="aaa" />
    <verification-code />
    <qr-code />

    <!-- <ckeditor /> -->
  </div>

</template>

<script>
export default {
  data() {
    return {
      aaa: ''
    }
  },
  methods: {

  }
}

</script>

<style></style>
