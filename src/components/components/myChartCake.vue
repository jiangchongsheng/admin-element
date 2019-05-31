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
          textStyle: {
            fontSize: 18,
            color: '#333' // 主标题文字颜色
          }
          // subtext: '纯属虚构'
        },
        tooltip: {
          // trigger: 'item'
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'horizontal',
          left: 'left',
          y: 'bottom'
          // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          // data: _this.chartObj.nameList
        },
        series: [
          {
            name: _this.chartObj.text,
            type: 'pie',
            radius: '50%',
            center: ['50%', '30%'],
            data: _this.chartObj.data,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      // alert(2);

      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
