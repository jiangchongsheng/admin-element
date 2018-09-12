<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content" >
          <div class="flex">
            <span class="roleFont fontWidth">用户ID</span>
            <el-input v-model="listQuery.userId" class="roleInput" placeholder="请输入用户ID"/>
            <span class="roleFont longFontWidth">用户名</span>
            <el-input v-model="listQuery.userName" class="roleInput" placeholder="请输入用户名"/>
            <span class="roleFont longFontWidth">用户昵称</span>
            <el-input v-model="listQuery.userNick" class="roleInput" placeholder="请输入用户昵称"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <span class="roleFont fontWidth">角色筛选</span>
          <el-select v-model="value" class="roleInput">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <span class="roleFont longFontWidth">手机</span>
          <el-input v-model="listQuery.userPhone" class="roleInput" placeholder="请输入用户手机"/>
          <span class="roleFont longFontWidth">邮箱</span>
          <el-input v-model="listQuery.userEmail" class="roleInput" placeholder="请输入用户邮箱"/>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <span class="roleFont fontWidth">状态</span>
          <el-select v-model="status.userStatus" class="roleInput" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.state" :label="item.stateName" :value="item.state"/>
          </el-select>
          <span class="roleFont longFontWidth">用户注册IP</span>
          <div class="block">
            <el-input v-model="listQuery.userRegisterIp" class="roleInput" placeholder="请输入用户注册IP"/>
          </div>
          <span class="roleFont longFontWidth">用户最后登陆IP</span>
          <div class="block">
            <el-input v-model="listQuery.userLastLoginIp" class="roleInput" placeholder="请输入用户最后登陆IP"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <span class="roleFont shortwidth">国家</span>
          <el-select v-model="listQuery.userCountry" style="width: 181px;" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <span class="roleFont shortwidth">省</span>
          <el-select v-model="listQuery.userProvince" style="width: 181px;" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <span class="roleFont shortwidth">市</span>
          <el-select v-model="listQuery.userCity" style="width: 181px;" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
          <span class="roleFont shortwidth">区</span>
          <el-select v-model="listQuery.userState" style="width: 181px;" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <div class="block" style="width: 604px" >
            <span class="roleFont">最后登录时间</span>
            <el-date-picker v-model="lastLoginTime" :picker-options="pickerOptions2" value-format="timestamp" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" align="right"/>
          </div>
          <div class="block">
            <span class="roleFont">创建时间</span>
            <el-date-picker v-model="createTime" :picker-options="pickerOptions2" value-format="timestamp" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" align="right"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <div class="search el-icon-search" style=" margin-left: 161px;" @click="queryList()">搜索</div>
          <div class="search el-icon-plus" @click="addUsers()">新增</div>
          <div class="search el-icon-refresh" @click="refresh()">重置</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-loading="listLoading" :data="tableData" border style="width:1240px;margin-left: 54px;">
          <el-table-column prop="id" align="center" label="用户ID" width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userName" align="center" label="用户名称" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userNick" align="center" label="用户昵称" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.userNick }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userEmail" align="center" label="状态" width="160">
            <template slot-scope="scope">
              <el-tag>{{ userOptions[scope.row.userStatus] || '' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="roleId" align="center" label="角色" width="120">
            <template slot-scope="scope">
              <span>{{ cycleRole(scope.row.roles) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userPhone" align="center" label="手机" width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.userPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="userEmail" align="center" label="邮箱" width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.userEmail }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" align="center" label="创建时间" width="160">
            <template slot-scope="scope">
              <span>{{ timeStamp(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" align="center" label="最后修改时间" width="180">
            <template slot-scope="scope">
              <span>{{ timeStamp(scope.row.updateTime) == 'Invalid date' ? '' : timeStamp(scope.row.updateTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="300" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="roleData(scope.row)">修改角色</el-button>
              <el-button type="success" icon="el-icon-edit" size="mini" @click="update(scope.row)">编辑</el-button>
              <el-button :title="filterBtn" type="warning" icon="el-icon-delete" size="mini" @click="handleStatusUpdate(scope.row)">{{ filterBtn[scope.row.userStatus] || '' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--添加用户弹框-->
    <el-dialog :visible.sync="dialogVisible" title="添加用户" width="50%">
      <el-form ref="dataForm" :inline="true" :model="temp" label-width="80px">
        <div class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="temp.userName" class="roleInput" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="temp.userPhone" class="roleInput" placeholder="请输入手机号"/>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="密码">
            <el-input v-model="temp.userPassword" class="roleInput" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="temp.userEmail" class="roleInput" placeholder="请输入邮箱"/>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="昵称">
            <el-input v-model="temp.userNick" class="roleInput" placeholder="请输入昵称"/>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="temp.userCountry" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="省">
            <el-select v-model="temp.userProvince" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="市">
            <el-select v-model="temp.userCity" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="区">
            <el-select v-model="temp.userState" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" icon="el-icon-close" round size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" icon="el-icon-check" round size="small" @click="createData">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加用户弹框-->

    <!--编辑用户弹框-->
    <el-dialog :visible.sync="dialogVisible2" title="编辑用户" width="50%">
      <el-form ref="dataForm2" :inline="true" :model="temp2" label-width="80px">
        <div class="demo-form-inline">
          <el-form-item label="用户名">
            <el-input v-model="temp2.userName" class="roleInput" placeholder="请输入用户名"/>
          </el-form-item>
          <el-form-item label="手机">
            <el-input v-model="temp2.userPhone" class="roleInput" placeholder="请输入手机号"/>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="密码">
            <el-input v-model="temp2.userPassword" class="roleInput" placeholder="请输入密码"/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="temp2.userEmail" class="roleInput" placeholder="请输入邮箱"/>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="昵称">
            <el-input v-model="temp2.userNick" class="roleInput" placeholder="请输入昵称"/>
          </el-form-item>
          <el-form-item label="国家">
            <el-select v-model="temp2.userCountry" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="省">
            <el-select v-model="temp2.userProvince" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="市">
            <el-select v-model="temp2.userCity" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="demo-form-inline">
          <el-form-item label="区">
            <el-select v-model="temp2.userState" class="roleInput" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="RoleName" :disabled="true" class="roleInput" placeholder=""/>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" icon="el-icon-close" round size="small" @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="success" icon="el-icon-check" round size="small" @click="updateData()">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑用户弹框-->
    <!--修改用户角色弹框-->
    <el-dialog :visible.sync="dialogVisible3" title="修改用户角色" width="66%">
      <el-form ref="dataForm3" :inline="true" :model="temp3" label-width="80px">
        <el-form-item label="用户ID">
          <el-input v-model="temp3.userId" :disabled="true" class="inputWidth" placeholder=""/>
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="80px">
        <el-form-item label="用户名称">
          <el-input v-model="temp3.userName" :disabled="true" class="inputWidth" placeholder=""/>
        </el-form-item>
      </el-form>
      <el-form :inline="true" label-width="80px">
        <div class="flex">
          <el-form-item label="角色列表"/>
          <el-table :data="tableData2" border style="width: 100%" > <!-- @selection-change="selectRow"-->
            <el-table-column align="center" min-width="100px" label="角色名称">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-select v-model="scope.row.roleId" class="edit-input" style="width:100px" size="small">
                    <el-option v-for="item in RoleOptions" :key="item.id" :label="item.roleName" :value="item.id"/>
                  </el-select>
                </template>
                <span v-else>{{ scope.row.roleName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="160px" label="开始生效时间">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.startTime" value-format="timestamp" type="datetime" placeholder="选择日期时间" style="width:200px" size="small"/>
                </template>
                <span v-else>{{ timeStamp(scope.row.startTime) == 'Invalid date' ? '' : timeStamp(scope.row.startTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="160px" label="失效时间">
              <template slot-scope="scope">
                <template v-if="scope.row.edit">
                  <el-date-picker v-model="scope.row.endTime" value-format="timestamp" type="datetime" placeholder="选择日期时间" style="width:200px" size="small"/>
                </template>
                <span v-else>{{ timeStamp(scope.row.endTime) == 'Invalid date' ? '' : timeStamp(scope.row.endTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="300" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
                <el-button v-if="scope.row.edit" type="success" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">Ok</el-button>
                <el-button v-else type="primary" size="small" icon="el-icon-edit" @click="updateRoleList(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>

            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-circle-plus" round size="small" style="margin-right: 200px;" @click="addRow()">新 增 角 色</el-button>
        <el-button type="info" icon="el-icon-close" round size="small" @click="dialogVisible3 = false">取 消</el-button>
        <el-button type="success" icon="el-icon-check" round size="small" @click="updateRoleData">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户角色弹框-->
    <!--分页 S-->
    <el-row>
      <el-col>
        <div class="pagination-container" style="margin-left: 54px">
          <el-pagination :current-page.sync="listQuery.pageNum" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
    <!--分页 E-->
  </div>
</template>
<script>
import { fetchList, updateList, createUser, openUserStatus, fetchRoleList, fetchInfoList, updateRole, queryAllROle } from '@/api/user'
import moment from 'moment'
// import md5 from 'js-md5'
export default {
  data() {
    return {
      listLoading: true,
      total: null,
      listQuery: {
        pageNum: 1,
        pageSize: 10,
        lastLoginStartTime: '',
        lastLoginEndTime: '',
        createStartTime: '',
        createEndTime: ''
      },
      roleQuery: {
        startTime: '',
        endTime: ''
      },
      temp: {
        userName: '',
        userPhone: '',
        userPassword: '',
        userEmail: '',
        userNick: '',
        userCountry: '',
        userProvince: '',
        userCity: '',
        userState: ''
      },
      RoleName: '',
      temp2: {
        userName: '',
        userPhone: '',
        userPassword: '',
        userEmail: '',
        userNick: '',
        userCountry: '',
        userProvince: '',
        userCity: '',
        userState: '',
        userId: ''
      },
      temp3: {
        userId: '',
        id: '',
        roleId: '',
        roleName: '',
        startTime: '',
        endTime: ''
      },
      status: {
        userStatus: 10,
        userId: ''
      },
      statusOptions: [{
        state: 0,
        stateName: '禁用'
      }, {
        state: 10,
        stateName: '启用'
      }],
      newID: {
        id: '',
        roleId: ''
      },
      filterBtn: {
        10: '禁用',
        0: '启用'
      },
      userOptions: {
        0: '禁用',
        10: '启用'
      },
      UserStatus: {
        userStatus: '',
        userId: ''
      },
      options: [{
        value: '选项1',
        label: '普通用户'
      }, {
        value: '选项2',
        label: '管理员'
      }],
      RoleOptions: [],
      selectListRow: [],
      options2: [],
      value: '选项1',
      value3: '选项1',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value2: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      createTime: '',
      lastLoginTime: '',
      tableData: [],
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      tableData2: [],
      cacheRoleTable: {},
      newRow: null
    }
  },
  created() {
    this.getList()
    this.getAllRole()
  },
  methods: {
    // 时间戳转化成yyyy
    timeStamp(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
      // return time
    },
    queryList() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    // 查询用户信息
    getList() {
      this.listLoading = true
      if (this.lastLoginTime === null || this.lastLoginTime === '' || this.lastLoginTime === undefined) {
        this.listQuery.lastLoginStartTime = ''
        this.listQuery.lastLoginEndTime = ''
      } else {
        this.listQuery.lastLoginStartTime = this.lastLoginTime[0]
        this.listQuery.lastLoginEndTime = this.lastLoginTime[1]
      }
      if (this.createTime === null || this.createTime === '' || this.createTime === undefined) {
        this.listQuery.createStartTime = ''
        this.listQuery.createEndTime = ''
      } else {
        this.listQuery.createStartTime = this.createTime[0]
        this.listQuery.createEndTime = this.createTime[1]
      }
      fetchList(this.listQuery).then(response => {
        this.tableData = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    // 循环角色
    cycleRole(roles) {
      if (Array.isArray(roles) && roles.length !== 0) {
        for (var i = 0; i < roles.length; i++) {
          var roleName = ',' + roles[i].roleName
          return roleName.substring(1)
        }
      }
    },
    // 添加用户
    addUsers() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
    },
    createData() {
      this.listLoading = true
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createUser(this.temp).then(response => {
            this.getList()
            this.dialogVisible = false
            if (response.code === '0000') {
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              })
            } else {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'error'
              })
            }
            this.listLoading = false
          })
        }
      })
    },
    // 编辑用户信息
    update(row) {
      this.dialogVisible2 = true
      this.RoleName = this.cycleRole(row.roles)
      // this.temp2 = Object.assign({}, row) // copy obj
      fetchInfoList({ userId: row.id }).then(response => {
        this.temp2 = response.data
        this.temp2.roleName = this.RoleName
      })
    },
    updateData() {
      this.$refs['dataForm2'].validate((valid) => {
        if (valid) {
          this.temp2.userId = this.temp2.id
          const tempData = Object.assign({}, this.temp2)
          updateList(tempData).then(response => {
            if (response.code === '0000') {
              this.$message({
                showClose: true,
                message: '编辑成功！',
                type: 'success'
              })
              this.dialogVisible2 = false
              this.getList()
            } else {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'error'
              })
              this.dialogVisible2 = true
            }
          })
        }
      })
    },
    // 查询用户角色
    roleData(row) {
      this.temp3.userId = row.id
      this.temp3.userName = row.userName
      fetchRoleList({ userId: row.id }).then(response => {
        const items = response.data
        items.map(v => {
          this.$set(v, 'edit', false)
        })
        this.tableData2 = items
      })
      this.dialogVisible3 = true
    },
    // 行内编辑表格
    cancelEdit(row) {
      row.roleId = this.cacheRoleTable[row.id].roleId
      row.roleName = this.cacheRoleTable[row.id].roleName
      row.startTime = this.cacheRoleTable[row.id].startTime
      row.endTime = this.cacheRoleTable[row.id].endTime
      row.edit = false
      this.$message({
        message: '已取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      this.$refs['dataForm3'].validate((valid) => {
        console.log('debug')
        if (valid) {
          var data = Object.assign({}, row)
          data['userId'] = this.temp3.userId
          updateRole(data).then(response => {
            if (response.code === '0000') {
              this.$message({
                showClose: true,
                message: '编辑成功！',
                type: 'success'
              })
              this.dialogVisible3 = false
              this.getList()
            } else {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'error'
              })
              this.dialogVisible3 = true
            }
          })
        }
      })
      row.edit = false
      this.$message({
        message: '角色名称已成功修改',
        type: 'success'
      })
    },
    // 转换角色 id转换为中文
    // roleNameFilter(rolename) {
    //   queryAllROle().then(response => {
    //     for (let i = 0; i <response.data.lenght ; i++) {
    //       if(response.data[i].id === rolename){
    //         return response.data[i].roleName
    //       }
    //     }
    //   })
    // },
    // 编辑用户角色
    updateRoleList(row) {
      if (!this.cacheRoleTable[row.id]) {
        this.cacheRoleTable[row.id] = row
      }
      row.edit = true
    },
    updateRoleData() {
      this.$refs['dataForm3'].validate((valid) => {
        if (valid) {
          console.log(this.newID)
          // this.temp3.userId = this.temp2.id
          var tempRoleData = Object.assign({}, this.temp3)
          tempRoleData.roleName = this.newRow.roleName
          tempRoleData.startTime = this.newRow.startTime
          tempRoleData.endTime = this.newRow.endTime
          tempRoleData.id = this.newID.id
          tempRoleData.roleId = this.newID.roleId
          updateRole(tempRoleData).then(response => {
            if (response.code === '0000') {
              this.$message({
                showClose: true,
                message: '编辑成功！',
                type: 'success'
              })
              this.dialogVisible3 = false
              this.getList()
            } else {
              this.$message({
                showClose: true,
                message: response.msg,
                type: 'error'
              })
              this.dialogVisible3 = true
            }
          })
        }
      })
    },
    // 查询所有角色
    getAllRole() {
      queryAllROle().then(response => {
        console.log(response.data)
        this.RoleOptions = response.data
      })
    },
    // // 新增角色
    // selectRow(val) {
    //   this.selectListRow = val
    // },
    // addRow() {
    //   var list = {
    //     roleName: this.roleName,
    //     startTime: this.startTime,
    //     endTime: this.endTime
    //   }
    //   this.tableData2.unshift(list)
    // },user.js
    // 切换状态
    handleStatusUpdate(row) {
      this.UserStatus.userId = row.id
      this.UserStatus.userStatus = (row.userStatus === 10 ? 0 : 10)
      openUserStatus(this.UserStatus).then(response => {
        if (response.code === '0000') {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            showClose: true,
            message: response.msg,
            type: 'error'
          })
        }
      })
    },
    // 重置
    handleClear() {
      this.listQuery = {
        userId: '',
        userName: '',
        userNick: '',
        userPhone: '',
        userEmail: '',
        userRegisterIp: '',
        userLastLoginIp: '',
        userCountry: '',
        userProvince: '',
        userCity: '',
        userState: ''
      }
      this.value = '选项1'
      this.status.userStatus = 10
      this.lastLoginTime = ''
      this.createTime = ''
    },
    refresh() {
      this.handleClear()
    },
    // 分页
    // 分页的条数（10，20，30，50）
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    // 分页的页数（1，2，3，4）
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    }

  }
}
</script>

<style>
  @import url(../../styles/unified.css);
</style>
