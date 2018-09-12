<!--客户端申请审核-->
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content">
          <div class="flex">
            <span class="roleFont">名称</span>
            <el-input v-model="queryData.roleId" class="roleInput" placeholder="请输入角色ID"/>
            <span class="roleFont">网址</span>
            <el-input v-model="queryData.name" class="roleInput" placeholder="请输入角色名称"/>
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
      <el-col :span="24">
        <div class="flex">
          <div class="search el-icon-search" style=" margin-left: 115px;" @click="queryBtn()">查询</div>
        </div>
      </el-col>
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
            label="access_token有效期(s)"
            width="170"/>
          <el-table-column
            prop="sketch"
            align="center"
            label="refresh_token有效期(s)"
            width="170"/>
          <el-table-column
            prop="date"
            align="center"
            label="申请时间"
            width="170"/>
          <el-table-column
            prop="state"
            align="center"
            label="状态"
            width="210"/>
          <el-table-column
            align="center"
            label="操作"
            width="250"
            fixed="right">
            <template slot-scope="scope" >
              <el-button type="success" icon="el-icon-success" size="mini" @click="adoptBtn()">通过</el-button>
              <el-button type="danger" icon="el-icon-error" size="mini" @click="refuseBtn()">拒绝</el-button>
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
      // 查询的数据
      queryData: {
        roleId: '',
        name: '',
        date: ''
      },

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
      tableData: [{
        id: '12345',
        name: '赵龙青',
        sketch: '我是赵龙青',
        date: '2018-03-07 00:00:00',
        endDate: '2018-03-07 22:22:22',
        state: '通过'
      },
      {
        id: '23456',
        name: '戚竟赛',
        sketch: '我是戚竟赛',
        date: '2018-08-08 00:00:00',
        endDate: '2018-11-11 22:22:22',
        state: '不通过'
      },
      {
        id: '34567',
        name: '奥特曼',
        sketch: '我是奥特曼',
        date: '2018-08-08 00:00:00',
        endDate: '2018-11-11 22:22:22',
        state: '通过'
      }],
      value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value5: '',

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
    },

    // 查询的按钮（查询列表
    queryBtn() {

    },

    // 通过按钮（表格内按钮
    adoptBtn() {

    },

    // 拒绝按钮（表格内按钮
    refuseBtn() {

    }

  }

}

</script>

