<template>
  <div>
    <el-button :size="Size" :disabled="Disabled" :type="Type" @click="VerificationClick">{{ msg }}</el-button>
  </div>
</template>
<script>
export default {
  name: 'VerificationCode',
  model: {
    prop: 'identify'
  },
  props: {
    // 按钮大小
    Size: {
      type: String,
      default: 'small'
    },
    // 按钮样式
    Type: {
      type: String,
      default: 'primary'
    },
    // 按钮文字
    msg: {
      type: String,
      default: '获取验证码'
    },
    // 是否禁用
    Disabled: {
      type: Boolean,
      default: false
    },
    // 倒计时
    num: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      timer: null,
      oldNum: 0 // 为了记录传进来的num 值
    }
  },

  mounted() {
  },
  methods: {
    resetData() {

    },
    // 点击
    VerificationClick() {
      const _this = this
      _this.$emit('on-click') //
      _this.oldNum = _this.num
      _this.Type = 'info'
      _this.Disabled = true
      _this.timer = setInterval(function() {
        _this.msg = _this.num-- + '秒后重新获取'
        if (_this.num < 0) {
          _this.msg = '获取验证码'
          _this.Type = 'primary'
          _this.Disabled = false
          _this.num = _this.oldNum
          clearInterval(_this.timer)
        }
      }, 1000)
    }
  }

}
</script>
