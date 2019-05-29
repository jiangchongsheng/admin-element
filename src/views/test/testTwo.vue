<template>
  <div>
    <my-chart-china :chart-obj="chartObj"/>
    <el-button type="success" @click="getData">模拟数据传参</el-button>
  </div>

</template>

<script>

export default {
  data() {
    return {
      chartObj: {
        id: 'china',
        text: '中国地图',
        data: [{
          name: '四川',
          value: '1212'
        }]
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    getData() {
      this.chartObj['data'] = [{
        name: '内蒙古',
        value: '12'
      }, {
        name: '山东',
        value: '33'
      }, {
        name: '新疆',
        value: '332'
      }]
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
