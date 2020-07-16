/**
* @file  测试列表
* @author: 江重生
*/
<template>
  <i-page>
    <i-main>
      <el-form ref="form" :model="queryParams" label-width="50px">
        <el-row style="display: flex">
          <el-col :span="8" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="搜索:">
              <el-input v-model.trim="queryParams.searchKey" placeholder="测试名称" />
            </el-form-item>
          </el-col>
          <el-col
            :span="10"
            :lg="8"
            :md="8"
            :sm="12"
            :xs="24"
            style="margin-top:-3px;padding-left: 15px"
          >
            <el-button type="primary" @click="getInfo">查询</el-button>
            <el-button @click="addTest">添加测试</el-button>
            <el-button @click="addTest">添加问卷</el-button>
            <el-button
              size="medium"
              icon="el-icon-clear"
              class="issfe-infu issfe-infu-clear"
              type="text"
              @click="clear"
            />
            <el-button size="medium" icon="el-icon-refresh" type="text" @click="refresh" />
          </el-col>
        </el-row>
      </el-form>
      <i-table
        v-loading="loading"
        :show-operation="false"
        :columns="columns"
        :data="activityList"
        :border="true"
        :pagination="pagination"
        @on-pagination-change="handlePaginationChange"
      />
    </i-main>
  </i-page>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Page, Main } from '@/core/components/Page'
import Table from '@/core/components/Table'
import Button from '@/core/components/Button'
import { MessageMixin } from '@/core/mixins'

export default {
  components: {
    [Page.name]: Page,
    [Main.name]: Main,
    [Table.name]: Table,
    [Button.name]: Button
  },
  mixins: [MessageMixin],
  data() {
    return {
      loading: false,
      typeVal: '',
      typeList: [
        {
          name: '在线课程',
          value: '1'
        },
        {
          name: '调研活动',
          value: '2'
        },
        {
          name: '线上活动',
          value: '3'
        }
      ],
      statusList: [
        '筹备中',
        '测试中',
        '进行中',
        '临时暂停',
        '测试结束',
        '活动结束'
      ],
      colorList: [
        'rgb(0, 131, 212)',
        'rgb(249, 151, 6)',
        'rgb(17, 212, 0)',
        'rgb(128, 128, 128)',
        'rgb(198, 213, 137)',
        'rgb(0, 0, 0)'
      ],
      queryParams: {
        searchKey: ''
      },
      pagination: {
        pageSize: 20,
        currentPage: 1,
        total: 1
      },
      columns: [
        {
          label: '创建时间',
          prop: 'createTime'
        },
        {
          label: '测试名称',
          prop: 'name'
        },
        {
          label: '类型',
          prop: 'type'
        },
        {
          label: '创建人',
          prop: 'createName'
        },
        {
          label: '操作',
          prop: 'enable',
          align: 'center',
          render: (h, value) => {
            return h(
              'div',
              {
                style: {
                  align: 'center',
                  minWidth: '50px'
                }
              },
              [
                h(
                  'el-button',
                  {
                    attrs: {
                      type: 'text',
                      size: 'mini'
                    },
                    on: {
                      click: () => {
                        // this.$router.push({
                        //   name: 'editRoleManage',
                        //   params: {
                        //     row: value.row
                        //   }
                        // })
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'el-button',
                  {
                    attrs: {
                      type: 'text',
                      size: 'mini'
                    },
                    on: {
                      click: () => {
                        this.$confirm('确认是否删除当前数据?', '提示', {
                          confirmButtonText: '删除',
                          cancelButtonText: '取消',
                          type: 'error'
                        }).then(() => {})
                      }
                    }
                  },
                  '删除'
                )
              ]
            )
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['activityList']),
    params() {
      return {
        name: this.queryParams.searchKey,
        type: this.typeVal,
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    ...mapActions('activityConfiguration', [
      'getActivityList',
      'getDelActivity',
      'getUpdateActivityStatus'
    ]),
    updatedStatus(id, status) {
      this.getUpdateActivityStatus({
        id: id,
        status: status
      }).then(res => {
        // this.success('操作成功')
        this.getData()
      })
    },

    selectDropdown(i, val) {
      console.log(i, val)
    },
    confirm(index) {
      let confirmText = []
      if (index === 0) {
        confirmText = [
          '确认要开始当前活动吗?',
          '注: 1. 开始之后无法再进行测试',
          '2. 开始后系统将自动删除所有测试数据'
        ]
      } else if (index === 1) {
        confirmText = ['确认要暂停当前活动吗?']
      } else {
        confirmText = ['确认要结束当前活动吗?']
      }

      const newDatas = []
      const h = this.$createElement
      for (const i in confirmText) {
        if (i === '2') {
          newDatas.push(
            h(
              'p',
              {
                style: {
                  marginLeft: '23px'
                }
              },
              confirmText[i]
            )
          )
        } else {
          newDatas.push(h('p', null, confirmText[i]))
        }
      }
      return newDatas
    },
    getData() {
      this.loading = true
      this.getActivityList(this.params)
        .then(response => {
          this.loading = false
          if (response != null) {
            this.pagination.total = response.totalNum
          }
        })
        .catch(e => {
          this.loading = false
        })
    },
    getInfo() {
      this.pagination.currentPage = 1
      this.pagination.pageNum = 1
      this.getData()
    },
    handlePaginationChange(pagination) {
      this.pagination = Object.assign({}, this.pagination, pagination)
      this.getData()
    },
    // 清除
    clear() {
      this.queryParams = {
        searchKey: ''
      }
      this.pagination = {
        pageSize: 20,
        currentPage: 1,
        total: 1
      }
      this.getData()
    },
    // 刷新
    refresh() {
      this.pagination = {
        pageSize: 20,
        currentPage: 1,
        total: 1
      }
      this.getData()
    },
    addTest() {
      this.$router.push({
        name: 'addTest'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.popper-class {
  width: 300px;
}
</style>

