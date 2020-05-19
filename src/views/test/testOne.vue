<template>
  <div>
    <el-date-picker
      v-model="value"
      :picker-options="pickerOptions"
      type="date"
      placeholder="选择日期"/>

  </div>
</template>

<script>
export default {
  data() {
    return {
      sb: '123',
      value: '',
      // 选择 今天或以前的日期(不包含今天则去掉下面 - 8.64e6）
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6
        }
      }
    }
  },
  methods: {

    aaa() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.sb = '10秒执行'
          resolve('十秒执行')
        }, 10000)
      })
    },
    bbb() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.sb = '5秒执行'
          resolve('五秒执行')
        }, 5000)
      })
    },
    async ccc() {
      console.log('接口前', this.sb)
      console.log(await this.bbb())
      console.log('接口中', this.sb)
      console.log(await this.aaa())
      console.log('接口后', this.sb)
    }
  }
}

</script>

<style>
/* 表格 */
.table-sick {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 12px;
}
.thead-sick th {
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #000;
  line-height: 20px;
}
.tr-sick td {
  text-align: center;
  border: 1px solid #000;
  line-height: 20px;
}
</style>
