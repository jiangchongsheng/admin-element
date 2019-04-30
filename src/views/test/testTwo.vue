<template>
  <div>
    <identify />
    <upload-images />
    <pagination :total="100" @get-data="getPageData">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          align="center"
          label="日期"/>
        <el-table-column
          prop="name"
          align="center"
          label="姓名"/>
        <el-table-column
          prop="address"
          align="center"
          label="地址"/>
      </el-table>
    </pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    getPageData(val) {
      console.log(val)
    }
  }
}

</script>

<style></style>
