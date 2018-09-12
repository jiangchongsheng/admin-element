<!--客户端管理-->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="flex">
            <span class="roleFont">名称</span>
            <el-input v-model="queryData.name" class="roleInput" placeholder="请输入角色ID"/>
            <span class="roleFont">网址</span>
            <el-input v-model="queryData.url" class="roleInput" placeholder="请输入角色名称"/>
            <div class="block">
              <span class="roleFont">申请时间</span>
              <el-date-picker
                v-model="queryData.date"
                :picker-options="pickerOptions2"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"/>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="roleFont">默认授权</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>

      </el-col>
      <el-col :span="18">
        <div class="flex">
          <div class="search el-icon-search" style=" margin-left: 115px;" @click="queryListBtn()">查询</div>
        </div>
      </el-col>

      <!--编辑弹框 S-->
      <el-dialog :visible.sync="editProjectileFrame" title="编辑" width="46%">
        <div style="margin: 20px;"/>
        <el-form ref="editFromData" :model="editFromData" label-width="200px">
          <el-form-item label="appKey" prop="appKey">
            <el-input v-model="editFromData.appKey" :disabled="true" class="roleInput"/>
          </el-form-item>
          <el-form-item label="appSecret" prop="appSecret">
            <el-input v-model="editFromData.appSecret" :disabled="true" class="roleInput" />
          </el-form-item>
          <el-form-item label="名称" prop="type">
            <el-input :rows="2" v-model="editFromData.name" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="网址" prop="type">
            <el-input :rows="2" v-model="editFromData.name" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="图标" prop="type">
            <el-input :rows="2" v-model="editFromData.name" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="资源id" prop="type">
            <el-select v-model="resource_ids" placeholder="请选择" class="roleInput">
              <el-option
                v-for="item in resourceArrey"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="scope" prop="type">
            <el-select v-model="scope" placeholder="请选择" class="roleInput">
              <el-option
                v-for="item in scopeArray"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="授权类型" prop="type">
            <el-select v-model="grant_type" multiple placeholder="请选择" class="roleInput">
              <el-option
                v-for="item in grantArray"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item label="重定向路径" prop="type">
            <el-input :rows="2" v-model="editFromData.redirect_uri" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="AccessToken有效期" prop="type">
            <el-input :rows="2" v-model="editFromData.redirect_uri" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="RefreshToken有效期" prop="type">
            <el-input :rows="2" v-model="editFromData.redirect_uri" maxlength="100" class="roleInput"/>
          </el-form-item>
          <el-form-item label="信任" prop="type">
            <el-checkbox v-model="trustChecked">默认信任</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" icon="el-icon-close" round size="small" @click="editProjectileFrame = false">取 消</el-button>
          <el-button type="success" icon="el-icon-check" round size="small" @click="editProjectileFrame_sure('editFromData')">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑弹框  E-->

    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          style="width:1170px;margin-left: 54px;">
          <el-table-column
            prop="id"
            align="center"
            label="id"
            width="170"/>
          <el-table-column
            prop="name"
            align="center"
            label="名称"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="网址"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="图标"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="描述"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="是否默认授权"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="resource"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="scope"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="模式"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="重定向地址"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="角色"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="AccessToken有效期(s)"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="RefreshToken有效期(s)"
            width="170"/>
          <el-table-column
            prop="date"
            align="center"
            label="申请时间"
            width="170"/>
          <el-table-column
            align="center"
            label="操作"
            width="250"
            fixed="right">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-edit" size="mini" @click="editListBtn()">编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delListBtn()">删除</el-button>
            </template>

          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <!--分页 S-->
    <el-row>
      <el-col>
        <div class="block" style="margin-left: 54px">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageSize"
            :total="Total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
    <!--分页 E-->

  </div>

</template>

<style>
  @import url(../../styles/unified.css);
</style>

<script>
export default {
  data() {
    return {
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
      // 查询的数据（查询条件
      queryData: {
        name: '',
        url: '',
        date: ''
      },
      // 表格数据
      tableData: [{
        id: '12345',
        name: '赵龙青',
        sketch: '我是赵龙青',
        date: '2018-03-07 00:00:00',
        endDate: '2018-03-07 22:22:22'
      }],

      // 默认授权下拉框
      options: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      // 默认选择是
      value: '1',

      // 编辑弹出框===========
      editProjectileFrame: false,

      // 编辑里的数据
      editFromData: {
        appKey: '111111',
        appSecret: '222222',
        name: '我是哈哈哈',
        redirect_uri: '2123111111111'
      },

      // 编辑里的下拉框resource
      resourceArrey: [{
        label: '1',
        value: '选项一'
      },
      {
        label: '2',
        value: '选项二'
      }],
      resource_ids: '1',

      // 编辑里的下拉框scope
      scopeArray: [{
        label: '1',
        value: '选项一'
      },
      {
        label: '2',
        value: '选项二'
      }],
      scope: '1',

      // 编辑里的下拉框grant（多选下拉框
      grantArray: [{
        label: '1',
        value: '选项一'
      },
      {
        label: '2',
        value: '选项二'
      }],
      grant_type: '1',

      // 信任默认选中
      trustChecked: true,

      // 页数
      currentPage: 1,
      // 条数
      pageSize: 10,
      // 总数
      Total: 100
    }
  },
  methods: {

    // 查询按钮（表格查询
    queryListBtn() {

    },

    // 编辑按钮（表格里的按钮
    editListBtn() {
      this.editProjectileFrame = true
    },

    // 删除按钮（表格里的按钮
    delListBtn() {

    },

    // 编辑里面的确定===
    editProjectileFrame_sure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('验证成功通过')
        } else {
          return false
        }
      })
    },

    // 分页的条数（10，20，30，50）
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },

    // 分页的页数（1，2，3，4）
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }

  }

}

</script>

