<template>
  <div>
    <div @click="aaa">打印1111111111111111111111</div>
    <div id="Printing" style="height:980px">
      <el-row>
        <h2 class="titleName">中国对外贸易中心(集团)</h2>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="Prinflex">
            <div class="labelName">服务咨询:</div>
            <div>400088999</div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="Prinflex">
            <div class="labelName">开单地点:</div>
            <div>A区珠江散步街2-3柜台</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="Prinflex">
            <div class="labelName">1期</div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="8">
          <div class="Prinflex">
            <div class="labelName">展览名称:</div>
            <div>第十三届广交会</div>
          </div>
        </el-col>
        <el-col :span="8" >
          <div class="Prinflex">
            <div class="labelName">参展企业:</div>
            <div>展位塔装(广州广交会展览工程有限公司)</div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="Prinflex">
            <div class="labelName">发票单位:</div>
            <div>安徽进出口股份有限公司</div>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="Prinflex">
            <div class="labelName">押金单位:</div>
            <div>安徽进出口股份有限公司</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Prinflex">
            <div class="labelName">金额单位:</div>
            <div>人民币元</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <table class="table-sick">
          <thead v-loading="loading" class="thead-sick">
            <th>项目</th>
            <th>单位</th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
            <th>押金</th>
            <th>备注</th>
          </thead>
          <tbody>
            <template >
              <tr v-loading="loading" v-for="(item,index) in tableData" :key="index" class="tr-sick">
                <td>{{ item.phoneNum }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.flowDayStr }}</td>
                <td>{{ item.count }}</td>
                <td>{{ item.count1 }}</td>
                <td>{{ item.count2 }}</td>
                <td>{{ item.count3 }}</td>

              </tr>
            </template>
          </tbody>
        </table>
      </el-row>

      <el-row>
        <el-col :span="12">
          <div class="Prinflex">
            <img width="500" src="./../../../static/ss.jpg">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="Prinflex">
            <img width="500" src="./../../../static/ss.jpg">
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tableData: [{
        'phoneNum': '134',
        'name': '测试',
        'flowDayStr': '12312312',
        'count1': '23123213'
      }, {
        'phoneNum': '134',
        'name': '测试',
        'flowDayStr': '12312312'
      }, {
        'phoneNum': '134',
        'name': '测试',
        'flowDayStr': '12312312'
      }, {
        'phoneNum': '134',
        'name': '测试',
        'flowDayStr': '12312312',
        'count1': '23123213'
      }, {
        'phoneNum': '134',
        'name': '测试',
        'flowDayStr': '12312312',
        'count1': '23123213'
      }],
      loading: false
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    aaa() {
      const subOutputRankPrint = document.getElementById('Printing')
      const newContent = subOutputRankPrint.innerHTML
      const oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      setTimeout(() => {
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      }, 1000)
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

    /* 打印 */
  .titleName {
    text-align: center;
  }
  .labelName {
    width: 100px;
  }
  .Prinflex {
    display: flex;
  }
  /* 表格 */
  .marginT{
  margin: 20px 0;
}
.table-sick {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-collapse: collapse;
}
.thead-sick th{
    text-align: center;
    background-color: #fafafa;
    border: 1px solid #e9eaec;
    line-height: 30px;
}
.tr-sick td {
  /* // padding-left: 20px;
  // background: #FFEB9C; */
  text-align: center;
  border: 1px solid #e9eaec;
  line-height: 30px;
}
</style>
