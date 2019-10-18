<template>
  <!-- 分页展示 -->
  <div>
    <table class="table-sick">
      <thead class="thead-sick">
        <th>姓名</th>
        <th>手机</th>
      </thead>
      <tbody>
        <template>
          <tr v-for="(item,index) in tableData" :key="index" class="tr-sick">
            <!-- colspan="2"  rowspan="2" -->
            <td>{{ item.name }}</td>
            <!-- <td>{{ item. }}</td> -->
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    total: { // 默认总数
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  mounted() {

  },
  methods: {

  }

}

</script>
<style scoped>
/* 表格 */
.table-sick {
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size:12px;
}
.thead-sick th {
  text-align: center;
  background-color: #fafafa;
  border: 1px solid #000;
  line-height: 20px;
}
.tr-sick td {
  text-align: center;
  border: 1px solid #000;
  line-height: 20px;
}
</style>
