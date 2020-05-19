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
    <div style="padding: 0 40px">
      <pagination :total="queryValue.total" @get-data="getPageData">
        <el-table
          v-loading="loading"
          :data="tableData"
          element-loading-text="Loading"
          highlight-current-row
          border
          style="width:100%;">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="120"/>
          <el-table-column label="用户名称" align="center" min-width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户账号" align="center" min-width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.user }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="密码111" align="center">
          <template slot-scope="scope">
            {{ scope.row.password }}
          </template>
        </el-table-column> -->
          <el-table-column class-name="status-col" label="状态" align="center">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.status | statusFiler }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" min-width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.creationTime | dateFiler }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" min-width="130">
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime | dateFiler }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" min-width="200" label="操作">
            <template slot-scope="scope">
              <!-- <el-button v-if="scope.row.type === 2" type="info" size="small" @click="handleEdit(scope.row)">重置密码</el-button> -->
              <el-button v-if="scope.row.type !== 2" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button
                v-if="scope.row.type !== 2 && $store.getters.userInfo.id !== scope.row.id"
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </pagination >
    </div>

    <!-- 弹出框 S -->
    <el-dialog :visible.sync="addPopup" :title="textMap[dialogStatus]" @closed="dialogClose">

      <el-form
        ref="addList"
        :model="addList"
        :rules="addValidation"
        label-position="right"
        label-width="120px"
        style="margin-left:50px;margin-top: 20px;">

        <el-form-item label="用户名称" prop="userName">
          <el-input v-model.trim="addList.userName" class="testStyle"/>
        </el-form-item>

        <el-form-item label="账号" prop="user">
          <el-input v-model.trim="addList.user" class="testStyle"/>
        </el-form-item>

        <el-form-item v-if="dialogStatus == 'create'" label="密码" prop="password">
          <el-input v-model.trim="addList.password" placeholder="请输入密码" type="password" show-password class="testStyle"/>
        </el-form-item>

        <el-form-item label="角色" prop="role">
          <!-- <el-input v-model.trim="addList.role" class="testStyle"/> -->
          <el-select v-model="addList.role" class="testStyle" clearable placeholder="请选择" @change="roleChange">
            <el-option
              v-for="(item,index) in roleOptions"
              :key="index"
              :label="item.roleName"
              :value="item.roleName"/>
          </el-select>

        </el-form-item>

        <el-form-item label="是否启用">
          <el-switch
            v-model="addList.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"/>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="pan-btn tiffany-btn" @click="dialogClose">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" class="pan-btn tiffany-btn" @click="addAccountList('addList')">确 定
        </el-button>
        <el-button v-else class="pan-btn tiffany-btn" @click="editAccountList('addList')">确 定</el-button>

      </div>
    </el-dialog>
    <!-- 弹出框 E -->

  </div>

</template>

<script>
import { userList, addUser, selectRole, delUser, updateUser } from '@/api/user'
// import { hasPermission } from '@/utils/valid'
import md5 from 'js-md5'
import moment from 'moment'

export default {
  filters: {
    dateFiler(value) {
      return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
    statusFiler(value) {
      return value === 1 ? '启用' : '禁用'
    }

  },
  data() {
    return {
      roleOptions: [],
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
        status: 1,
        role: '',
        roleId: ''
      },

      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: '',
      addPopup: false,
      // 添加验证
      addValidation: {
        userName: [{
          required: true, message: '用户名称不能为空', trigger: 'change'
        }],
        user: [{
          required: true, message: '账号不能为空', trigger: 'change'
        }],
        password: [{
          required: true, message: '密码不能为空', trigger: 'change'
        }],
        role: [{
          required: true, message: '角色不能为空', trigger: 'change'
        }]
      }
    }
  },
  created() {
    this.getQueryList()
    console.log('123', this.$store.getters.userInfo.id)
  },
  mounted() {
    selectRole().then(res => {
      if (res.code === 1) {
        this.roleOptions = res.data
      }
    })
  },
  methods: {
    roleChange(val) {
      // addList.roleId
      if (val) {
        this.roleOptions.forEach(element => {
          if (val === element.roleName) {
            this.addList['roleId'] = element.roleId
          }
        })
      }
    },
    dialogClose() {
      this.addPopup = false
      this.$refs['addList'].resetFields()
    },
    // 表格编辑
    handleEdit(row) {
      console.log('rwo', row)
      this.dialogStatus = 'update'
      this.addPopup = true

      this.addList = { ...row }
      this.addList['id'] = row.id
    },
    // 表格删除
    handleDelete(row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除接口
          delUser({ id: row.id }).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.getQueryList()
            } else {
              this.$message.error(res.message)
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        })
    },
    editAccountList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = { ...this.addList }
          updateUser(data).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.getQueryList()
              this.addPopup = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return
        }
      })
    },
    addAccountList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = { ...this.addList }
          data.password = md5(md5(data.password) + 'asset') // 密码加密
          addUser(data).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.getQueryList()
              this.addPopup = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return
        }
      })
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
