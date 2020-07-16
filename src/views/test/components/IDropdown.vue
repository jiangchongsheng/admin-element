<template>
  <el-dropdown trigger="click" style="margin-right: 5px;" @command="itemClick">
    <div class="el-dropdown-link">
      <span style="width:16px">
        <svg-icon icon-class="select" />
      </span>
    </div>
    <el-dropdown-menu slot="dropdown" class="i-dropdown-menu">
      <!-- :disabled="(index === 0 && i === 0) || (index === maxI && i === 1 )" -->
      <el-dropdown-item
        v-for="(item, i) in list"
        :key="i"
        :disabled="(maxI <= 1 && i === 2)"
        :command="i"
      >{{ item }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  name: 'IDropdown',
  props: {
    name: {
      type: String,
      default: () => {
        return '下拉菜单'
      }
    },
    list: {
      type: Array,
      default: () => {
        return ['测试1', '测试2']
      }
    },
    index: {
      type: Number,
      default: null
    },
    maxI: {
      type: Number,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    itemClick(command) {
      this.$emit('select', command)
    },
    filterDisable(item) {
      if (item === '编辑') return false

      // 筹备中
      if (this.status === 1) {
        if (['开始', '测试', '删除'].indexOf(item) !== -1) {
          return false
        }
        // 测试中
      } else if (this.status === 2) {
        if (['开始', '结束测试'].indexOf(item) !== -1) {
          return false
        }
        // 进行中
      } else if (this.status === 3) {
        if (['暂停', '结束'].indexOf(item) !== -1) {
          return false
        }
        // 临时暂停
      } else if (this.status === 4) {
        if (['继续', '结束'].indexOf(item) !== -1) {
          return false
        }
        // 已结束
      } else if (this.status === 5) {
        if (['删除'].indexOf(item) !== -1) {
          return false
        }
      }
      return true
    }
  }
}
</script>
<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #01817b;
  font-size: 12px;
  &:hover {
    color: rgba($color: #01817b, $alpha: 0.7);
  }
}
.el-icon-arrow-down {
  font-size: 12px;
}
.i-dropdown-menu {
  /deep/ .el-dropdown-menu__item {
    font-size: 12px;
  }
}
</style>
