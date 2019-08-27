<template>
  <div>
    <div :id="chartObj.id" :style="{width: '100%', height: '400px',padding:'20px'}"/>
  </div>
</template>

<script>

import echarts from 'echarts'

export default {
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
  created() {
  },
  mounted() {
    this.drawLine()
  },

  methods: {

    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById(this.chartObj.id))

      const _this = this

      const option = {
        title: {
          text: _this.chartObj.text,
          subtext: '数据更新时间：' + '2019-05-31'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },

        xAxis: {
          type: 'time'
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}.00%'
          },
          show: true,
          min: 40,
          max: 80
        },
        series: [{
          type: 'line',
          symbol: 'circle', // 拐点类型
          // 当smooth为true时，就是光滑的曲线（默认为true）；当为false，就是折线不是曲线的了，那这个设为true，
          smooth: true,
          symbolSize: 5, // 拐点圆的大小
          itemStyle: {
            normal: {
              color: '#C33834', // 折线条的颜色
              borderColor: '#C33834' // 拐点边框颜色
            }
          },
          data: _this.chartObj.data,
          showSymbol: false,
          hoverAnimation: false
        }]

      }

      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
