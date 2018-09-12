<!--用户code管理-->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content" >
          <div class="flex">
            <span class="roleFont fontWidth">APPKey</span>
            <el-input v-model="input" class="roleInput" placeholder="请输入APPKey"/>
            <span class="roleFont fontWidth">用户名</span>
            <el-input v-model="input" class="roleInput" placeholder="请输入用户名"/>
            <span class="roleFont fontWidth">用户ID</span>
            <el-input v-model="input" class="roleInput" placeholder="请输入用ID"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <div class="block">
            <span class="roleFont">创建时间</span>
            <el-date-picker v-model="value5" :picker-options="pickerOptions2" type="datetimerange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" align="right"/>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="flex">
          <div class="search el-icon-search" style=" margin-left: 134px;">搜索</div>
          <div class="search el-icon-refresh">重置</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table :data="tableData" border style="width:1013px;margin-left: 54px;">
          <el-table-column prop="date" align="center" label="ID" width="160"/>
          <el-table-column prop="name" align="center" label="APPKey" width="160"/>
          <el-table-column prop="narrative" align="center" label="用户ID" width="160"/>
          <el-table-column prop="createTime" align="center" label="用户名" width="120"/>
          <el-table-column prop="createTime" align="center" label="创建时间" width="136"/>
          <el-table-column prop="lastChangeTIme" align="center" label="最后修改时间" width="136"/>
          <el-table-column align="center" label="操作" width="140" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!--分页 S-->
    <el-row>
      <el-col>
        <div class="block" style="margin-left: 54px">
          <el-pagination :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="pageSize" :total="Total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
        </div>
      </el-col>
    </el-row>
    <!--分页 E-->
  </div>
</template>

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
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: '',
      tableData: [{
        date: 'aaa',
        name: '杨萌',
        narrative: '老大',
        realname: '320123199803022020',
        status: '审核失败',
        createTime: '2018-06-05',
        lastChangeTIme: '2018-06-05',
        buttons: ''
      }, {
        date: 'aaa',
        name: '施雪龙',
        narrative: '小咪',
        createTime: '2018-06-05',
        lastChangeTIme: '2018-06-05',
        buttons: ''
      }, {
        date: 'aaa',
        name: '江重生',
        narrative: '老大',
        createTime: '2018-06-05',
        lastChangeTIme: '2018-06-05',
        buttons: ''
      }],
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      formInline: {
        user: '',
        region: ''
      },
      // 页数
      currentPage: 1,
      // 条数
      pageSize: 10,
      // 总数
      Total: 100
    }
  },
  methods: {
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

<style>
  @import url(../../styles/unified.css);
</style>
