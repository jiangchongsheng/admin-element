<template>
  <div>
    <i-page>
      <i-main>
        <el-row style="padding-top:30px">
          <el-col :span="6">
            <i-main style="height:auto">
              <subjectBtn
                name="测试类型"
                :list="['单选题','多选题', '判断题', '配对题']"
                @subjectClick="subjectClick"
              />
            </i-main>
          </el-col>
          <el-col :span="18">
            <i-main>
              <el-form label-width="160px">
                <el-form-item label="类型" prop="type">
                  <el-select
                    v-model="formData.type"
                    clearable
                    style="width:480px"
                    placeholder="请选择"
                  >
                    <el-option label="测试" :value="1" />
                    <el-option label="问卷" :value="2" />
                  </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input v-model.trim="formData.name" style="width:480px" placeholder="请输入" />
                </el-form-item>
                <subjectList ref="subject" />
              </el-form>
            </i-main>
          </el-col>
        </el-row>
      </i-main>
    </i-page>
  </div>
</template>
<script>
import { Page, Main } from '@/core/components/Page'
import subjectBtn from './components/subjectBtn'
import subjectList from './components/subjectList'
// import WxEditor from '@/core/components/WxEditor'
export default {
  components: {
    [Page.name]: Page,
    [Main.name]: Main,
    // [WxEditor.name]: WxEditor,
    subjectBtn,
    subjectList
  },
  data() {
    return {
      radio: '1',

      btnType: '1',
      formData: {
        type: '',
        name: '',
        content: '1.请选择以下选项'
      }
    }
  },
  methods: {
    subjectClick(i) {
      this.$refs.subject.addList(i)
    },
    handleWxEditorChange(value) {
      this.formData.content = value
    },
    mountedcom(obj) {
      obj.canEdit = false
    }
  }
}
</script>
