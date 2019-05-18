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
      type: [Object, String],
      default: {} || ''
    },
    name: {
      type: [String, Object],
      default: ''
    },
    id: {
      type: [String, Number],
      default: ''
    },
    actionUrl: {
      type: String,
      default: process.env.BASE_API + '/api/upload'
      // default: 'http://10.10.1.237:8080/api/upload'
    },
    uploadParams: {
      type: Object,
      default() {
        return {
          uploadCustomizedDir: 'images',
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
      newfilelist: [],
      removeId: []

    }
  },
  watch: {
    initfile(val, oldVal) {
      if (val) {
        console.log('val', val)
        var imgArray = []
        for (var i = 0; i < val.customerResourcess.length; i++) {
          imgArray.push({
            classifyName: val.classifyName,
            name: val.customerResourcess[i],
            customerId: val.customerResourcess[i].customerId,
            id: val.customerResourcess[i].customerId,
            url: process.env.IMAGE_HOST + '' + val.customerResourcess[i].imagePath
          })
          this.urls.push(val[i])
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
      console.log('我是最棒的', file, fileList)
      var data = {}
      if (file.response) { // 自己上传的删除
        data = {
          imagePath: file.response.data[0],
          classifyName: this.name,
          id: ''
        }
      } else { // 后台传来的值的删除
        data = {
          imagePath: file.name.imagePath,
          classifyName: file.name.classifyName,
          id: file.name.id
        }

        this.removeId.push(file.name.id)
        this.$emit('GetremoveImg', this.removeId)
      }

      this.urls.splice(this.urls.indexOf(file.name), 1)
      console.log('demaxiya', data)

      this.$emit('removeImg', data)
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
        var data = {
          imagePath: res.data[0],
          classifyName: this.name,
          customerId: this.id
        }
        this.urls.push(res.data[0])
        console.log('添加的数据', data)
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
