<template>
  <div>
    <pagination :total="100" @get-data="getPageData">
      <table class="table-sick">
        <thead class="thead-sick">
          <th v-for="(item, index) in columns" :key="index">{{ item.label }}</th>
        </thead>
        <tbody>
          <template>
            <tr
              v-for="(item, index) in tableList"
              :key="index"
              style="font-family:'SimHei';"
              class="tr-sick"
            >
              <td v-for="(item1, index1) in columns" :key="index1">{{ item1.prop }}</td>
            </tr>
            <tr v-if="tableList.length === 0" class="tr-sick">
              <td colspan="4" style="text-align:center;color:#ccc">暂无数据</td>
            </tr>
          </template>
        </tbody>
      </table>
    </pagination>
  </div>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    columns: {
      type: Array,
      default: () => {
        return [{
          label: '时间',
          prop: 'date'
        },
        {
          label: '数量',
          prop: 'num'
        }]
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 1
      }
    }
  },
  methods: {
    getPageData(data) {

    }
  }
}
</script>

<style scoped>
/* 表格 */
.table-sick {
  width: 100%;
  /* border: 1px solid #ccc; */
  border-collapse: collapse;
  font-size: 12px;
  color: #ccc;
}
.thead-sick th {
  text-align: center;
  background-color: rgb(246, 248, 249);
  /* border: 1px solid #ccc; */
  line-height: 46px;
  color: rgb(154, 154, 154);
}
.tr-sick td {
  text-align: center;
  /* border: 1px solid #ccc; */
  line-height: 60px;
  color: #000;
}
</style>
