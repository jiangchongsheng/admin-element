<template>
  <div class="yeluosen">
    <input v-model="message" type="text">
    <button
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      type="button">复制</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: '这里是复制的内容'
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    onCopy(e) {
      console.log('复制成功！')
    },
    onError(e) {
      console.log('复制失败！')
    }

  }
}
</script>

<style scoped>
  .headBtn {
    margin: 20px 40px;
  }

  .paging {
    margin: 20px 40px;
  }

  .testStyle {
    width: 300px;
  }

  .txtStyle {
    width: 200px;
    margin-right: 6px;
  }

  .headQuery {
    padding: 20px 0 0 40px;
  }
</style>
