<template>
  <div>
    <div class="headQuery">
      <span>角色名称：</span>
      <el-input v-model.trim="queryValue.roleName" placeholder="请选择姓名" class="txtStyle"/>

      <el-button type="primary" size="small" @click="querybtn">查询</el-button>
    </div>

    <div class="headBtn">
      <el-button type="primary" size="small" @click="addAnAccount">添加角色</el-button>
      <!-- v-if="hasPermission('role:add')" -->
    </div>

    <!-- 表格 -->
    <pagination :total="queryValue.total" @get-data="getPageData">
      <el-table
        v-loading="loading"
        :data="tableData"
        element-loading-text="Loading"
        highlight-current-row
        style="width:100%; margin-left:40px"
        border>
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="120"/>
        <el-table-column
          prop="roleName"
          label="角色名称"
          align="center"
          min-width="200"/>
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
        <el-table-column
          prop="roleDescription"
          label="角色描述"
          align="center"
          min-width="200"/>
        <el-table-column label="操作" min-width="200" align="center">
          <template slot-scope="scope">
            <!-- v-if="hasPermission('role:update')" -->
            <el-button
              v-if="scope.row.roleName !== 'admin'"
              size="mini"
              @click="handleEdit(scope.row)">编辑
            </el-button>
            <!-- v-if="hasPermission('role:delete')" -->
            <el-button
              v-if="scope.row.roleName !== 'admin'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagination>

    <!-- 弹出框 S -->
    <el-dialog :visible.sync="addPopup" :title="textMap[dialogStatus]" @closed="dialogClose">

      <el-form
        ref="addList"
        :rules="addValidation"
        :model="addList"
        label-position="right"
        label-width="120px"
        style="width: 1000px; margin-left:50px;margin-top: 20px;">

        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="addList.roleName" class="testStyle"/>
        </el-form-item>

        <el-form-item label="角色描述" prop="roleDescription">
          <el-input v-model.trim="addList.roleDescription" class="testStyle"/>
        </el-form-item>

        <el-form-item label="角色设置">

          <div v-for="(item,group) in originData" :key="group">
            <el-checkbox
              :indeterminate="addList.permissionData[group].isIndeterminate"
              :name="group"
              v-model="addList.permissionData[group].checkAll"
              @change="handleCheckAllChange">{{
              originDataTitle[group] }} <i class="el-icon-check"/>
            </el-checkbox>
            <el-checkbox-group v-model="addList.permissions[group]">
              <el-checkbox
                v-for="permission in originData[group]"
                :label="permission.permissionName"
                :name="group"
                :key="permission.permissionName"
                @change="handleCheckedCitiesChange">{{ permission.permissionBrief }}
              </el-checkbox>
            </el-checkbox-group>
          </div>

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
// getRoleDetails
import { getRoleInfoList, delRole, addRole, updateRole } from '@/api/role'
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

      permissions: {
        employee: [],
        user: [],
        role: []
      },
      permissionData: {
        employee: {
          checkAll: false,
          isIndeterminate: false
        },
        user: {
          checkAll: false,
          isIndeterminate: false
        },
        role: {
          checkAll: false,
          isIndeterminate: false
        }
      },
      // 添加验证
      addValidation: {
        roleName: [{
          required: true, message: '角色名不能为空', trigger: 'change'
        }]
      },

      tableData: [],
      queryValue: {   
        currentPage: 1,
        pageSize: 5,
        total: 0,
        roleName: ''
      },
      loading: false,
      addPopup: true,
      // 一级菜单
      originDataTitle: {
        user: '用户管理',
        role: '角色管理'
      },
      // 权限数据（二级菜单）
      originData: {
        // 用户权限
        user: [{
          permissionName: 'user:query',
          permissionBrief: '查询'
        }, {
          permissionName: 'user:add',
          permissionBrief: '添加'
        }, {
          permissionName: 'user:update',
          permissionBrief: '编辑'
        }, {
          permissionName: 'user:delete',
          permissionBrief: '删除'
        }],
        // 角色权限
        role: [{
          permissionName: 'role:query',
          permissionBrief: '查询'
        }, {
          permissionName: 'role:add',
          permissionBrief: '添加'
        }, {
          permissionName: 'role:update',
          permissionBrief: '编辑'
        }, {
          permissionName: 'role:delete',
          permissionBrief: '删除'
        }]
      },
      addList: {
        roleName: '',
        roleDescription: '',
        perms: [],
        permissions: {
          user: [],
          role: []
        },
        permissionData: {
          user: {
            checkAll: false,
            isIndeterminate: false
          },
          role: {
            checkAll: false,
            isIndeterminate: false
          }
        }
      },
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus: ''
    }
  },
  created() {
    this.addPopup = false

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
    // 弹出框关闭
    dialogClose() {
      // 初始化数据
      this.$refs['addList'].resetFields()
      this.addList.roleName = ''
      this.addList['id'] = ''
      this.addList.permissions = JSON.parse(JSON.stringify(this.permissions))
      this.addList.permissionData = JSON.parse(JSON.stringify(this.permissionData))
    },
    handleCheckAllChange(val, ev) {
      var group = (ev.target || ev.srcElement).getAttribute('name')
      var data = JSON.parse(JSON.stringify(this.originData[group]))
      var rdata = []
      data.forEach(d => rdata.push(d.permissionName))
      this.addList.permissions[group] = val ? rdata : []
      this.addList.permissionData[group].isIndeterminate = false
    },
    handleCheckedCitiesChange(value, ev) {
      var group = (ev.target || ev.srcElement).getAttribute('name')
      const checkedCount = this.addList.permissions[group].length
      this.addList.permissionData[group].checkAll = checkedCount === this.originData[group].length
      this.addList.permissionData[group].isIndeterminate = checkedCount > 0 && checkedCount < this.originData[group].length
    },
    // 添加btn
    addAnAccount() {
      this.dialogStatus = 'create'
      this.addPopup = true
    },
    // 页面勾选的数据
    getData() {
      var data = {
        id: this.addList['id'],
        roleName: this.addList.roleName,
        roleDescription: this.addList.roleDescription,
        perms: ''
      }
      var list = []
      for (var item in this.addList.permissions) {
        if (this.addList.permissions[item].length > 0) {
          list.push(item)
        }
        this.addList.permissions[item].forEach((i) => {
          list.push(i)
        })
      }
      data.perms = list.join(',')
      return data
    },
    // 表格编辑
    handleEdit(row) {
      this.dialogStatus = 'update'
      this.addPopup = true

      this.addList['id'] = row.roleId
      this.addList['roleName'] = row.roleName
      this.addList['roleDescription'] = row.roleDescription

      var perms = row.perms.split(',')
      this.addList.perms = perms

      for (var group in this.addList.permissions) {
        if (perms.indexOf(group) >= 0) {
          this.addList.permissionData[group].isIndeterminate = true
          perms.forEach(tmp => {
            if (tmp.indexOf(group) >= 0 && tmp !== group) {
              this.addList.permissions[group].push(tmp)
            }
          })
        }
      }
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
          delRole({ id: row.roleId }).then(res => {
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
    // 弹出框内添加
    addAccountList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = this.getData()
          addRole(data).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.getQueryList()
              this.addPopup = false
            } else {
              this.$message.error(res.message)
            }
          })
        } else {
          return false
        }
      })
    },
    // 弹出框内修改
    editAccountList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var data = this.getData()
          // console.log('data', data)

          updateRole(data).then(res => {
            if (res.code === 1) {
              this.$message.success(res.message)
              this.getQueryList()
              this.addPopup = false
            } else {
              this.$message.error(res.message)
            }
          })
          // this.getQueryList()
          // this.addPopup = false
        } else {
          return false
        }
      })
    },

    // 表格渲染
    getQueryList() {
      this.loading = true
      getRoleInfoList(this.queryValue).then(res => {
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
