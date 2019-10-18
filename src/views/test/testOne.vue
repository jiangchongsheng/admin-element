<template>
  <div>
    <div style="padding:20px;width:700px;height:400px;border:1px solid red">
      <el-row>
        <div style="text-align:center;font-size:26px">第125届春季交易会</div>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4" style="height:30px;line-height:30px;"/>
        <el-col :span="16">
          <div style="font-size:20px;font-weight:500;text-align:center;">
            标摊施工许可证（3期）
          </div>
        </el-col>
        <el-col :span="4">No<a href="javascript:;" style="font-size:20px"/>19060876</el-col>

      </el-row>

      <el-row style="margin-top:20px;">
        <table class="table-sick">
          <thead class="thead-sick"/>
          <tbody>
            <template>
              <tr class="tr-sick">
                <td>展位号码：</td>
                <td>1231231</td>
              </tr>
              <tr class="tr-sick">
                <td>展位数量：</td>
                <td>1231231</td>
              </tr>
              <tr class="tr-sick">
                <td>申报项目：</td>
                <td>1231231</td>
              </tr>
              <tr class="tr-sick">
                <td>申报地点：</td>
                <td>1231231</td>
              </tr>
              <tr class="tr-sick">
                <td>申报时间：</td>
                <td>1231231</td>
              </tr>
            </template>
          </tbody>
        </table>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="12" style="font-size:14px;line-height:20px">
          <div>温馨提示</div>
          <div>1.标准展位企业自带材料在现场搭建进行简单装修，展柜3个或以上（尺寸不得超过长1米*宽0.5米*高0.6米），列为标摊简装展位，参展商续委托特装资质施工企业进行网上报图，缴纳施工管理费。</div>
          <div>2.自带展具请勿安装在大会展板或展架上。</div>
        </el-col>
        <el-col
          :span="12"
          style="text-align:center;height:30px;line-height:30px;letter-spacing: 12px;font-weight: 600;font-size: 16px;padding-top:20px">
          <div>中国进出口商品交易会</div>
          <div>现场服务点</div>
          <div style="letter-spacing:0px;font-weight:400;font-size: 14px;">2019年08月27日</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 传得参
    objData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      sb: '123'
    }
  },
  watch: {
    objData: {
      handler() {
        // this.drawLine()
      },
      deep: true

    }
  },
  mounted() {
    this.ccc()
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
  font-size:12px;
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
