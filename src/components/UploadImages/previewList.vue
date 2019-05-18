<template>
  <ul class="el-upload-list el-upload-list--picture-card">
    <li v-for="(item, index) in imageArr" v-if="item" :key="index" class="el-upload-list__item is-success">
      <img
        :src="imageHost + item"
        alt=""
        class="el-upload-list__item-thumbnail">
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(imageHost + item)">
          <i class="el-icon-zoom-in"/>
        </span>
      </span>
      <el-dialog :visible.sync="dialogVisible" :show-close="true">
        <img :src="dialogImageUrl" width="100%" alt="">
      </el-dialog>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PreviewList',
  props: {
    imageArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      imageHost: process.env.IMAGE_HOST
    }
  },
  methods: {
    // 预览
    handlePictureCardPreview(url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    }
  }
}
</script>
