<template>
  <div>
    <div class="headQuery">
      <span>用户名称：</span>
      <el-input v-model.trim="queryValue.userName" placeholder="请选择姓名" class="txtStyle"/>

      <el-button type="primary" size="small" @click="querybtn">查询</el-button>
    </div>

    <div class="headBtn">
      <el-button type="primary" size="small" @click="addAnAccount">添加用户</el-button>
    </div>

    <pagination :total="queryValue.total" @get-data="getPageData">
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
            <el-tag>{{ scope.row.status | statusFiler }}</el-tag>
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

    <!-- 弹出框 S -->
    <el-dialog :visible.sync="addPopup" :title="textMap[dialogStatus]" @closed="dialogClose">


      <el-form
        ref="addList"
        :model="addList"
        label-position="right"
        label-width="120px"
        style="margin-left:50px;margin-top: 20px;">

        <el-form-item label="用户名称">
          <el-input v-model.trim="addList.userName" class="testStyle"/>
        </el-form-item>

        <el-form-item label="用户账号">
          <el-input v-model.trim="addList.user" class="testStyle"/>
        </el-form-item>

        <el-form-item label="用户密码">
          <el-input v-model.trim="addList.password" placeholder="请输入密码" show-password class="testStyle"/>
        </el-form-item>

        <el-form-item label="角色">
          <el-input v-model.trim="addList.role" class="testStyle"/>
        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch
            v-model="addList.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="2">
          </el-switch>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="pan-btn tiffany-btn" @click="addPopup = false">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" class="pan-btn tiffany-btn" @click="addAccountList('addList')">确 定
        </el-button>
        <el-button v-else class="pan-btn tiffany-btn" @click="editAccountList('addList')">确 定</el-button>

      </div>
    </el-dialog>
    <!-- 弹出框 E -->

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
    },
    statusFiler(value) {
      return value === 1? '启用':'禁用'
    }

  },
  data() {
    return {

      queryValue: {
        currentPage: 1,
        pageSize: 5,
        total: 0,
        userName: ''
      },
      loading: false,
      tableData: [],

      active: 0,
      addList: {
        userName: '',
        user: '',
        password: '',
        status: '1',
        role: ''
      },

      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '',
      addPopup: false
    }
  },
  created() {
    this.getQueryList()
  },
  methods: {
    dialogClose() {

    },
    addAccountList () {

    },
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
      this.dialogStatus = 'create'
      this.addPopup = true
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
