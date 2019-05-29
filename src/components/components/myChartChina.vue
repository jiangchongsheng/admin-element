<template>
  <div class="echarts">
    <div :style="{height:'450px',width:'100%',padding:'20px 0 0 20px'}" :id="chartObj.id"/>
  </div>
</template>
<script>
import echarts from 'echarts'
//   import '../../node_modules/echarts/map/js/world.js'

import 'echarts/map/js/china'

export default {
  name: 'Echarts',
  props: {
    // 传得参
    chartObj: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      newData: []
    }
  },
  watch: {
    chartObj: {
      handler() {
        if (!this.chartObj.data || this.chartObj.data.length === 0) {
          return
        }
        this.drawLine()
      },
      deep: true

    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {

    drawLine() {
      const myChart = echarts.init(document.getElementById(this.chartObj.id)) // 这里是为了获得容器所在位置
      window.onresize = myChart.resize

      // 数据格式
      // let data = [{
      //   "name": "四川",
      //   "value": Math.round(Math.random() * 1000)
      // }];

      const _this = this

      const option = { // 进行相关配置
        backgroundColor: '#fff', // 背景颜色
        title: {
          text: _this.chartObj.text // 地图标题
        },
        tooltip: {}, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false, // 组件
          min: 0,
          max: 1000,
          text: ['High', 'Low'],
          realtime: true,
          calculable: true,
          color: ['orangered', 'yellow', 'lightskyblue']
        },
        geo: { // 这个是重点配置区
          map: 'china', // 表示中国地图'
          zoom: 1.2, // 当前视角的缩放比例。
          roam: false, // 拖动 滚轮(放大缩小)
          label: {
            normal: {
              show: true, // 是否显示对应地名
              textStyle: {
                color: 'rgba(0,0,0,0.6)'
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.5)'
            },
            // 悬浮中  areaColor null
            emphasis: {
              areaColor: null,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.6)'
            }
          }
        },
        series: [{
          type: 'scatter',
          itemStyle: {
            normal: {
              color: 'red'
            }
          },
          coordinateSystem: 'geo' // 对应上方配置

        },
        {
          name: '患者人数', // 浮动框的标题
          type: 'map',
          geoIndex: 0,
          data: _this.chartObj.data // 数据
        }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>
