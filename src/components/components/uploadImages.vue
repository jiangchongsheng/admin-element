<template>
  <div class="flex-img">
    <div 
v-show="hideShow"
         style="width:148px;height:148px"
         class="el-upload-list el-upload-list--picture-card">
      <div 
style="width:148px;height:148px"
           class="el-upload-list__item is-success">
        <img 
:src="image"
             style="width:148px;height:148px"
             class="flex-img__image">
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check" />
        </label>
        <span 
class="el-upload-list__item-actions"
              style="width:148px;height:148px">
          <span class="el-upload-list__item-delete">
            <i 
class="el-icon-delete"
               @click.stop="handleRemove()" />
          </span>
        </span>
      </div>
    </div>
    <el-upload 
v-show="!hideShow"
               :action="uploadUrl"
               :show-file-list="false"
               :on-success="imageUploadSuccess"
               :before-upload="beforeUpload"
               class="image-uploader"
               accept="image/jpeg,image/jpg,image/png,image/gif">
      <i class="el-icon-plus" />
    </el-upload>
    <!-- <div slot="tip" class="el-upload__tip">尺寸宽度不低于640，高度不限制，支持jpg、png格式，1张上限</div> -->
  </div>
</template>
<script>
export default {
  model: {
    prop: 'modelUrl'
  },
  props: {
    // 图片
    imageurl: {
      type: String,
      default: ''
    },
    add: {
      type: Boolean,
      default: false
    },
    // 接口
    uploadUrl: {
      type: String,
      default: '/api/qiniu/setImage'
    }
  },
  data() {
    return {
      image: this.imageurl,
      file: this.image ? this.image : '',
      Img: process.env.CDN // img
    }
  },

  computed: {
    hideShow() { // 当图片多于一张的时候，就隐藏上传框
      return this.file !== ''
    }
  },
  watch: {
    imageurl(val, oldVal) {
      if (val) {
        this.file = val.replace(this.Img, '')
        this.image = val
      } else {
        this.image = ''
      }
    },
    add(val, oldVal) {
      this.file = ''
      this.image = ''
      this.$emit('input', '')
    }
  },

  methods: {
    imageUploadSuccess(response) {
      this.image = this.Img + response.data.src
      this.file = response.data.src
      this.$emit('input', response.data.src)
    },
    beforeUpload(file) {
      const isIMG = /.(gif|jpeg|png|jpg)$/.test(file.type)
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isIMG) {
        this.$message.error('图片类型必须是gif,jpg,jpeg,png中的一种')
      }
      if (!isLt2M) {
        this.$message.error('上传照片大小不能超过 2MB!')
      }
      return isIMG && isLt2M
    },
    handleRemove() {
      this.file = ''
      this.$emit('input', '')
    }
  }
}
</script>

<style scoped>
.flex-img {
  display: flex;
}

.image-uploader {
  background-color: #fbfdff;
  border: 1px dashed #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: auto;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  text-align: center;
}
.image-uploader:hover {
  border: 1px dashed #409eff;
}
.image-uploader {
  font-size: 28px;
  color: #8c939d;
}

.image-uploader .el-upload:hover {
  border-color: #409eff;
}

.flex-img__image {
  width: 146px;
  height: auto;

  border-radius: 6px;
}
</style>
<style>
.disabled {
  display: none;
}

.el-upload--picture-card {
  height: auto;
}

.el-upload-list--picture-card .el-upload-list__item {
  height: auto;
}

.el-upload-list--picture-card .el-upload-list__item {
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 148px;
  height: auto;
  margin: 0 8px 8px 0;
  display: inline-block;
}

.el-upload-list__item.is-success .el-upload-list__item-status-label {
  display: block;
  position: absolute;
  right: -15px;
  top: -6px;
  width: 40px;
  height: 24px;
  background: #13ce66;
  text-align: center;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);
}

.el-upload-list--picture-card .el-upload-list__item-actions {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
}
</style>
