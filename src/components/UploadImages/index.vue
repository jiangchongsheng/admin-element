<template>
  <el-form-item :label="label">
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
  </el-form-item>
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
    label: {
      type: String,
      default: '默认字段'
    },
    actionUrl: {
      type: String,
      default: process.env.BASE_API + '/api/upload'
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
  watch: {
    initfile(val, oldVal) {
      if (val) {
        this.urls = []
        var dataImg = val.split(',')
        var imgArray = []
        for (var i = 0; i < dataImg.length; i++) {
          imgArray.push({
            name: dataImg[i],
            url: process.env.IMAGE_HOST + '' + dataImg[i]
          })
          this.urls.push(dataImg[i])
        }
        this.filelist = imgArray
      } else {
        this.urls = []
        this.filelist = []
      }
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
      console.log('remove pic')
      this.urls.splice(this.urls.indexOf(file.name), 1)

      this.$emit('input', this.calcUrl())
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
    calcUrl() {
      return this.urls.join(',')
    },
    // 添加图片成功
    handleUploadSuccess(res, file) {
      // alert(1)

      if (res.code === '0000') {
        this.urls.push(res.data[0])
        this.$emit('input', this.calcUrl())
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
