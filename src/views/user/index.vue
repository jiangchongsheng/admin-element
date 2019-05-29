<template>
  <div>
    <div class="headQuery">
      <span>角色名称：</span>
      <el-input v-model="queryValue.name" placeholder="请选择姓名" class="txtStyle"/>

      <el-button type="primary" size="small" @click="querybtn">查询</el-button>
    </div>

    <div class="headBtn">
      <el-button type="primary" size="small" @click="addAnAccount">添加角色</el-button>
      <!-- v-if="hasPermission('role:add')" -->
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      style="width:521px; margin-left:40px"
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
        width="200"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="hasPermission('role:update')"
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            v-if="hasPermission('role:delete')"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
          <el-input v-model="addList.roleName" class="testStyle"/>
        </el-form-item>

        <el-form-item label="角色设置">

          <div v-for="(item,group) in originData" :key="group">
            <el-checkbox
              :indeterminate="addList.permissionData[group].isIndeterminate"
              :name="group"
              v-model="addList.permissionData[group].checkAll"
              @change="handleCheckAllChange">{{
              originDataTitle[group] }} <i
                class="el-icon-caret-bottom
"/>
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
// import { query, del, add, update, queryRolePermission } from '@/api/role'
// import { hasPermission } from '@/utils/valid'

export default {
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
        page: 1,
        limit: 10,
        name: ''
      },
      Total: 0,
      addPopup: true,
      originDataTitle: {
        employee: '账户管理',
        user: '日志管理',
        role: '患者端'
      },
      originData: {
        employee: [{
          permissionName: 'employee:query',
          permissionBrief: '查询'
        }, {
          permissionName: 'employee:add',
          permissionBrief: '添加员工'

        }, {
          permissionName: 'employee:import',
          permissionBrief: '员工导入'
        }, {
          permissionName: 'employee:update',
          permissionBrief: '编辑'

        }, {
          permissionName: 'employee:delete',
          permissionBrief: '删除'
        }],
        user: [{
          permissionName: 'user:query',
          permissionBrief: '查询'
        }, {
          permissionName: 'user:add',
          permissionBrief: '添加账号'
        }, {
          permissionName: 'user:update',
          permissionBrief: '编辑'
        }, {
          permissionName: 'user:delete',
          permissionBrief: '删除'
        }],
        role: [{
          permissionName: 'role:query',
          permissionBrief: '查询'
        }, {
          permissionName: 'role:add',
          permissionBrief: '添加权限'
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
        perms: [],
        permissions: {
          employee: [],
          user: [],
          role: [],
          org: [],
          customer: []
        },
        permissionData: {
          employee: {
            checkAll: false,
            isIndeterminate: false
          }, user: {
            checkAll: false,
            isIndeterminate: false
          }, role: {
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
    // this.loadData()
  },
  methods: {
    // 查询按钮
    querybtn() {

    },
    // 弹出框关闭
    dialogClose() {
      console.log('closed')
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
        perms: []
      }
      for (var item in this.addList.permissions) {
        if (this.addList.permissions[item].length > 0) {
          data.perms.push(item)
        }
        this.addList.permissions[item].forEach((i) => {
          data.perms.push(i)
        })
      }
      return data
    },
    // 弹出框内添加
    addAccountList(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('data', this.addList)
        } else {
          return false
        }
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
