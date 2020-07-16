<template>
  <div>
    <div class="title-head">
      <div>{{ name }}</div>
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="btnType === index? 'btn-class hoverC': 'btn-class'"
        @click="btnclick(index)"
      >{{ item }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: () => {
        return ''
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      btnType: 0
    }
  },
  methods: {
    btnclick(index) {
      this.btnType = index
      this.$emit('subjectClick', index)
    }
  }
}
</script>
<style scoped>
.title-head {
  padding: 0px 10px;
}
.btn-class {
  width: 100%;
  padding: 0px 0px;
  margin-top: 20px;
  line-height: 34px;
  text-align: center;
  border: 1px solid #ccc;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}
.hoverC {
  border: 1px solid #01817b;
  color: #01817b;
}
</style>

