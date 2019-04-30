<template>
  <div class="app-container">
    <div>分页组件</div>

    <pagination :total="100" @get-data="getPageData">
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row>
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="密码" align="center">
          <template slot-scope="scope">
            {{ scope.row.password }}
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.status | statusFil }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
      </el-table>
    </pagination >
  </div>
</template>

<script>

// import { getList } from '@/api/table'

export default {
  filters: {
    statusFil: function(val) {
      return val === '1' ? '使用' : '未启'
    }
  },

  data() {
    return {
      listLoading: false,
      list: [{
        account: '1234567',
        password: '7654321',
        status: '1',
        time: '2019-4-30'
      }, {
        account: '323467',
        password: '122131',
        status: '2',
        time: '2019-3-30'
      }]
    }
  },
  created() {
  },
  methods: {
    // 分页
    getPageData(data) {
      // data.pageNum 页  data.pageRows 条
      // 赋值 调表格接口
    }
  }
}
</script>
