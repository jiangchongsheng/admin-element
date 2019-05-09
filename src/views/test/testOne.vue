<template>
  <div>
    <identify v-model="aaa"/>
    <div @click="aaaa">aaa</div>
    <verification-code/>
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
    aaaa() {
      alert(this.aaa)
    }
  }
}

</script>

<style></style>
