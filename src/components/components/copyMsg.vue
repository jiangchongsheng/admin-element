<template>
  <div class="yeluosen">
    <button
      v-clipboard:copy="msg"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
      type="button">{{ text }}</button>
  </div>
</template>

<script>
// 示例  <copy-msg :msg="我是复制的内容"/>
export default {
  props: {
    // 需要复制德内容
    msg: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '复制'
    }
  },
  data() {
    return {
    }
  },
  methods: {
    onCopy(e) {
      this.$message.success('复制成功')
    },
    onError(e) {
      this.$message.error('复制失败')
    }

  }
}
</script>

