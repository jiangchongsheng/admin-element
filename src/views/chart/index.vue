<template>
  <div>
    <my-chart-china :chart-obj="chartChinaObj"/>
    <el-button type="success" @click="getChinaData">模拟数据传参</el-button>

    <my-chart-cake :chart-obj="charCaketObj"/>
    <el-button type="success" @click="getCakeData">模拟数据传参</el-button>

    <my-chart-line :chart-obj="charLinetObj"/>
    <el-button type="success" @click="getLineData">模拟数据传参</el-button>
  </div>

</template>

<script>

export default {
  data() {
    return {
      chartChinaObj: {
        id: 'china',
        text: '中国地图',
        data: [{
          name: '四川',
          value: '1212'
        }]
      },
      charCaketObj: {
        id: 'cake',
        text: '我是饼图',
        data: [{
          name: '四川',
          value: '10'
        }, {
          name: '北京',
          value: '30'
        }]
      },
      charLinetObj: {
        id: 'line',
        text: '我是折线图',
        data: [{
          value: ['2019-05-28', '50']
        }, {
          value: ['2019-05-29', '70']
        }, {
          value: ['2019-05-30', '60']
        }, {
          value: ['2019-05-31', '40']
        }]
      }
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    getChinaData() {
      this.chartChinaObj['data'] = [{
        name: '内蒙古',
        value: '12'
      }, {
        name: '山东',
        value: '33'
      }, {
        name: '新疆',
        value: '332'
      }]
    },
    getCakeData() {
      this.charCaketObj['data'] = [{
        name: '安徽',
        value: '10'
      }, {
        name: '江苏',
        value: '30'
      }, {
        name: '浙江',
        value: '40'
      }]
    },
    getLineData() {
      this.charLinetObj['data'] = [{
        value: ['2019-05-28', '70']
      }, {
        value: ['2019-05-29', '60.5']
      }, {
        value: ['2019-05-30', '50']
      }, {
        value: ['2019-05-31', '50.5']
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
