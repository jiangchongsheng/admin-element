<template>
  <div>
    <div class="headQuery">
      <span>用户名称：</span>
      <el-input v-model.trim="queryValue.name" placeholder="请选择姓名" class="txtStyle"/>

      <el-button type="primary" size="small" @click="querybtn">查询</el-button>
    </div>

    <div class="headBtn">
      <el-button type="primary" size="small" @click="addAnAccount">添加用户</el-button>
    </div>

    <pagination :total="100" @get-data="getPageData">
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="Loading"
        border
        highlight-current-row>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="120"/>
        <el-table-column label="账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码111" align="center">
          <template slot-scope="scope">
            {{ scope.row.password }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.creationTime | dateFiler }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" align="center" min-width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.updateTime | dateFiler }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="dialogVisible = true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagination >

  </div>

</template>

<script>
import { userList } from '@/api/user'
// import { hasPermission } from '@/utils/valid'
import moment from 'moment'

export default {
  filters: {
    dateFiler(value) {
      return value? moment(value).format('YYYY-MM-DD HH:mm:ss') : "-"
    }
  },
  data() {
    return {

      queryValue: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
        roleName: ''
      },
      loading: false,
      tableData: []
    }
  },
  created() {
    this.getQueryList()
  },
  methods: {
    // 分页
    getPageData(obj) {
      this.queryValue.currentPage = obj.pageNum
      this.queryValue.pageSize = obj.pageRows
      this.getQueryList()
    },
    // 查询按钮
    querybtn() {
      this.getQueryList()
    },
    // 添加btn
    addAnAccount() {
      // this.dialogStatus = 'create'
      // this.addPopup = true
    },
    // 表格渲染
    getQueryList() {
      this.loading = true
      userList(this.queryValue).then(res => {
        if (res.code === 1) {
          this.loading = false
          this.queryValue.total = res.total || 0
          this.tableData = res.data
        }
      }).catch(e => { 
        this.loading = false
      })
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
