<template>
  <div>
    <identify v-model="aaa" />
    <verification-code />
    <qr-code />

    <copy-msg :msg="aaa"/>

    <copy-msg msg="13445"/>

    <!-- <ckeditor /> -->

  </copy-msg></div>

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
