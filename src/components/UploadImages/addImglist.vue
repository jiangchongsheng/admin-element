<template>
  <div>
    <el-upload
      :action="actionUrl"
      :before-upload="beforeAvatarUpload"
      :on-progress="uploadVideoProcess"
      :on-success="handleUploadSuccess"
      :data="uploadParams"
      :on-remove="handleRemove"
      :on-preview="handlePictureCardPreview"
      :file-list="filelist"
      multiple
      list-type="picture-card">
      <i class="el-icon-plus"/>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImages',
  model: {
    prop: 'uploadUrls'
  },
  props: {
    initfile: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    actionUrl: {
      type: String,
      default: process.env.BASE_API + '/api/upload'
      // default: 'http://10.10.1.73:8080/api/upload'
    },
    uploadParams: {
      type: Object,
      default() {
        return {
          uploadCustomizedDir: 'image',
          fileType: 'image'
        }
      }
    }
  },
  data() {
    return {
      filelist: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrls: '',
      urls: [],
      newfilelist: []

    }
  },
  created() {

  },
  methods: {
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 点击文件列表中已上传的钩子
    uploadVideoProcess(event, file, fileList) {
      // console.log('2', fileList)
    },
    // 删
    handleRemove(file, fileList) {
      var src = file.response.data[0]

      this.$emit('removeImg', src)
      //
    },
    beforeAvatarUpload(file) {
      const isIMG = /.(gif|jpeg|png|jpg|bmp)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isIMG) {
        this.$message.error('图片类型必须是gif,jpg,jpeg,png,bmp中的一种')
      }
      if (!isLt2M) {
        this.$message.error('上传照片大小不能超过 2MB!')
      }
      return isIMG && isLt2M
    },
    // 添加图片成功
    handleUploadSuccess(res, file) {
      if (res.code === '0000') {
        var data = {
          imagePath: res.data[0],
          classifyName: this.name,
          customerId: this.id
        }
        this.$emit('addImg', data)
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>
