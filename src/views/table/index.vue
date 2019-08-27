<template>
  <div class="app-container">

    <div >table+分页组件(列表需进行数据操作示例)</div>
    <pagination :total="100" @get-data="getPageData1">
      <el-table
        v-loading="loading1"
        :data="list1"
        element-loading-text="Loading"
        border
        highlight-current-row>
        <el-table-column align="center" label="序号" width="100">
          <template slot-scope="scope">
            <div style="color:red;">{{ scope.$index }}</div>
          </template>
        </el-table-column>
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
            <el-tag>{{ scope.row.status | statusFil }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="created_at" label="时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="dialogVisible = true">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagination >

    <div>普通table+分页组件</div>
    <pagination :total="100" @get-data="getPageData2">
      <el-table
        v-loading="loading2"
        :data="list2"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          align="center"/>
        <el-table-column
          prop="name"
          label="姓名"
          align="center"/>
        <el-table-column
          prop="province"
          label="省份"
          align="center"/>
        <el-table-column
          prop="city"
          label="市区"
          align="center"/>
        <el-table-column
          prop="address"
          align="center"
          label="地址"/>
        <el-table-column
          prop="zip"
          label="邮编"
          align="center"/>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagination>

    <div>table行内编辑+分页组件</div>
    <pagination :total="100" @get-data="getPageData2">
      <el-table
        v-loading="loading3"
        :data="list3"
        border
        style="width: 100%">

        <el-table-column label="日期" align="center">
          <template slot-scope="scope">
            <el-date-picker
              v-if="scope.row.edit"
              v-model="scope.row.date"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"/>
            <span v-else>{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.name"/>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="省份" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.province"/>
            <span v-else>{{ scope.row.province }}</span>
          </template>
        </el-table-column>

        <el-table-column label="市区" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.city"/>
            <span v-else>{{ scope.row.city }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地址" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.address"/>
            <span v-else>{{ scope.row.address }}</span>
          </template>
        </el-table-column>

        <el-table-column label="邮编" align="center">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" v-model="scope.row.zip"/>
            <span v-else>{{ scope.row.zip }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="saveData(scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </pagination>

    <!-- 弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      title="查看"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

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
      // 表格一
      loading1: false,
      list1: [{
        account: '1234567',
        password: '7654321',
        status: '1',
        time: '2019-4-30'
      }, {
        account: '323467',
        password: '122131',
        status: '2',
        time: '2019-3-30'
      }],
      // 表格二
      loading2: false,
      list2: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }],

      // 表格三
      loading3: false,
      list3: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        edit: false // 区分修改
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        edit: false // 区分修改
      }],

      dialogVisible: false
    }
  },
  created() {
  },
  methods: {
    // 第一分页
    getPageData1(data) {
      // data.pageNum 页  data.pageRows 条
      console.log(data)
      // 赋值 调表格接口
    },

    // 第二分页
    getPageData2(data) {
      // data.pageNum 页  data.pageRows 条
      console.log(data)
      // 赋值 调表格接口
    },

    // 弹出框关闭
    handleClose(done) {
      done()
    },

    // 表格三编辑
    editData(row) {
      var obj = row
      obj['edit'] = true
    },
    // 表格三保存
    saveData(row) {
      var obj = row
      obj['edit'] = false
    }
  }
}
</script>
