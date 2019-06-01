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
        maxNum: 10,
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
      const arr = [{
        'province': '北京市',
        'count': 8
      }, {
        'province': '天津市',
        'count': 10
      }, {
        'province': '河北省',
        'count': 5
      }, {
        'province': '山西省',
        'count': 2
      }, {
        'province': '内蒙古自治区',
        'count': 1
      }, {
        'province': '辽宁省',
        'count': 19
      }, {
        'province': '吉林省',
        'count': 2
      }, {
        'province': '黑龙江省',
        'count': 4
      }, {
        'province': '上海市',
        'count': 36
      }, {
        'province': '江苏省',
        'count': 44
      }, {
        'province': '浙江省',
        'count': 11
      }, {
        'province': '安徽省',
        'count': 5
      }, {
        'province': '福建省',
        'count': 1
      }, {
        'province': '江西省',
        'count': 6
      }, {
        'province': '山东省',
        'count': 10
      }, {
        'province': '河南省',
        'count': 8
      }, {
        'province': '湖北省',
        'count': 5
      }, {
        'province': '湖南省',
        'count': 5
      }, {
        'province': '广东省',
        'count': 15
      }, {
        'province': '广西壮族自治区',
        'count': 3
      }, {
        'province': '海南省',
        'count': 1
      }, {
        'province': '重庆市',
        'count': 1
      }, {
        'province': '四川省',
        'count': 4
      }, {
        'province': '贵州省',
        'count': 2
      }, {
        'province': '云南省',
        'count': 3
      }, {
        'province': '西藏自治区',
        'count': 2
      }, {
        'province': '陕西省',
        'count': 6
      }, {
        'province': '甘肃省',
        'count': 2
      }, {
        'province': '青海省',
        'count': 0
      }, {
        'province': '宁夏回族自治区',
        'count': 3
      }, {
        'province': '新疆维吾尔自治区',
        'count': 2
      }, {
        'province': '台湾省',
        'count': 0
      }, {
        'province': '香港特别行政区',
        'count': 0
      }, {
        'province': '澳门特别行政区',
        'count': 0
      }]

      const newData = []
      let maxNum = 0
      arr.forEach(element => {
        if (maxNum <= element.count) {
          maxNum = element.count
        }
        switch (element.province.length) {
          case 3 :case 5:case 8:case 7:
            element.province = element.province.substring(0, 2)
            break
          case 4: case 6:
            element.province = element.province.substring(0, 3)
            break
          default:
            console.log(element)
        }
        newData.push({
          value: element.count,
          name: element.province
        })
      })

      console.log(newData)
      this.chartChinaObj['data'] = newData
      this.chartChinaObj['maxNum'] = maxNum
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
