<template>
  <!-- 分页展示 -->
  <div style="margin-top:20px">
    <slot/>
    <el-pagination
      :current-page="queryData.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="queryData.pageRows"
      :total="total"
      style="margin:20px;float:right"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    total: { // 默认总数
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      queryData: {
        pageNum: 1, // 页
        pageRows: 10 // 条
      }
    }
  },
  mounted() {

  },
  methods: {
    // 条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.queryData = {
        pageNum: 1, // 避免bug
        pageRows: val
      }
      this.$emit('get-data', this.queryData)
    },
    // 页数
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.queryData.pageNum = val
      this.$emit('get-data', this.queryData)
    }

  }

  // 示例
  // <pagination :total="100" @get-data="getPageData">
  //     <el-table
  //       :data="tableData"
  //       style="width: 100%">
  //       <el-table-column
  //         prop="date"
  //         align="center"
  //         label="日期"/>
  //       <el-table-column
  //         prop="name"
  //         align="center"
  //         label="姓名"/>
  //       <el-table-column
  //         prop="address"
  //         align="center"
  //         label="地址"/>
  //     </el-table>
  //   </pagination>
}

</script>

