<template>
  <div>
    <div style="padding:20px;width:700px;height:500px;border:1px solid red">
      <el-row>
        <div style="text-align:center;font-size:20px">2019年广交会施工</div>
      </el-row>
      <el-row style="margin-top:20px">
        <el-col :span="4" style="height:30px;line-height:30px;">A2P4192</el-col>
        <el-col :span="16">
          <div style="font-size:26px;font-weight:500;text-align:center;">
            许可证
          </div>
        </el-col>
        <el-col :span="4">No<a href="javascript:;" style="font-size:20px"/>19060876</el-col>

      </el-row>
      <el-row style="margin-top:20px;text-align:center">
        <div>(第<span>2</span>期)</div>
      </el-row>

      <el-row style="margin-top:20px;">
        <el-col :span="12" style="height:30px;line-height:30px;">
          委托单位： <span>珠海宜心家居有限公司</span>
        </el-col>
        <el-col :span="12" style="height:30px;line-height:30px;">
          施工人数： <span>0</span>
        </el-col>
      </el-row>

      <el-row style="margin-top:10px;">
        <el-col :span="12" style="height:30px;line-height:30px;">
          施工单位： <span>广东海神展示广告有限公司</span>
        </el-col>
        <el-col :span="12" style="height:30px;line-height:30px;">
          施工面积： <span>0</span>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="12" style="height:30px;line-height:30px;">
          施工地点： <span>14.3C20-21 14.3D20-21</span>
        </el-col>
        <el-col :span="12" style="height:30px;line-height:30px;">
          施工时间： <span>4/20-4/22</span>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;">
        <el-col :span="12" style="height:30px;line-height:30px;"/>
        <el-col
          :span="12"
          style="text-align:center;height:30px;line-height:30px;letter-spacing: 12px;font-weight: 600;font-size: 16px;">
          <div>中国进出口商品交易会</div>
          <div>现场服务办公室</div>
          <div style="letter-spacing:0px;font-weight:400;font-size: 14px;">2019年08月27日</div>
        </el-col>
      </el-row>
      <el-row style="margin-top:80px;font-size:10px">
        <el-col :span="6">
          第一联：存根
        </el-col>
        <el-col :span="8">
          第二联：申报单位办理证件
        </el-col>
        <el-col :span="10">
          第三联：申报单位悬挂施工地点及办理撤展人员证
        </el-col>
      </el-row>

      <el-row style="margin-top:10px;font-weight: 600; font-size: 18px;">
        安全责任人：<span>唐海流</span><span style="margin-left:20px">13802971011</span>
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
  methods: {
  }
}

</script>

<style></style>
