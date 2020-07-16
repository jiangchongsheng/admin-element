<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <el-form-item>
        <div style="display:flex">
          <i-wx-editor
            v-model.trim="item.title"
            :config="config"
            @on-change="(val)=>handleWxEditorChange(val,item)"
          />
          <div
            v-if="index !== 0"
            style="margin: 10px;font-size: 18px"
            @click="delSubject(list, index)"
          >
            <i style="cursor: pointer;" class="el-icon-delete" />
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <div v-if="item.type === 0">
          <div v-for="(ele, i) in item.list" :key="i" style="display:flex">
            <el-radio
              v-model="item.value"
              :label="ele.value"
              style="height:32px;line-height:32px"
            >{{ "" }}</el-radio>
            <div
              v-if="!ele.showInput"
              style="min-width:396px;display: inline-block;margin-left: -20px"
              @click="editName(ele)"
            >{{ ele.name }}</div>
            <el-input
              v-if="ele.showInput"
              ref="inputVal"
              v-model="value"
              style="width:396px;"
              @blur="blurName(ele)"
            />
            <div v-if="!ele.showInput" @click="addOption(item.list, i)">
              <i style="cursor: pointer;" class="el-icon-circle-plus-outline" />
            </div>
            <div
              v-if="!ele.showInput"
              style="margin-left:20px"
              @click="delOption(item.list, i, item)"
            >
              <i style="cursor: pointer;" class="el-icon-remove-outline" />
            </div>
          </div>
        </div>
        <div v-if="item.type === 1">
          <div v-for="(ele, i) in item.list" :key="i" style="display:flex">
            <el-checkbox v-model="ele.checked" @change="(val)=>checkChange(val, item, i)" />
            <div
              v-if="!ele.showInput"
              style="min-width:396px;display: inline-block;margin-left:20px"
              @click="editName(ele)"
            >{{ ele.name }}</div>
            <el-input
              v-if="ele.showInput"
              ref="inputVal"
              v-model="value"
              style="width:396px;margin-left:36px"
              @blur="blurName(ele)"
            />

            <div v-if="!ele.showInput" @click="addOption(item.list, i)">
              <i style="cursor: pointer;" class="el-icon-circle-plus-outline" />
            </div>
            <div
              v-if="!ele.showInput"
              style="margin-left:20px"
              @click="delOption(item.list, i, item)"
            >
              <i style="cursor: pointer;" class="el-icon-remove-outline" />
            </div>
          </div>
        </div>
        <div v-if="item.type === 2">
          <div v-for="(ele, i) in item.list" :key="i" style="display:flex">
            <el-radio
              v-model="item.value"
              :label="ele.value"
              style="height:32px;line-height:32px"
            >{{ ele.name }}</el-radio>
          </div>
        </div>
        <div v-if="item.type === 3">
          <el-row style="margin-top:20px">
            <el-col :span="12">
              <div class="list-group">
                <div class="list-title">选项</div>
                <draggable :list="item.list" class="list-draggable-a" group="people">
                  <div v-for="(element, i) in item.list" :key="i" class="list-group-item">
                    <div style="display:flex">
                      <div style="width:calc(100% - 28px);">{{ element.name }}</div>
                      <IDropdown
                        :index="i"
                        :max-i="item.list.length - 1"
                        :list="['修改', '新增', '删除']"
                        @select="val => selectIDropdown(val, item.list, i, '0', element)"
                      />
                    </div>
                  </div>
                  <!-- {{ element.name }} {{ index }}</div> -->
                </draggable>
                <div
                  v-if="item.list.length === 0"
                  class="list-group-item"
                  style="text-align:center;font-size:12px"
                >新增</div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="list-group">
                <div class="list-title">类别</div>
                <div v-for="(element, i) in item.typeList" :key="i">
                  <div style="display:flex">
                    <div class="list-title-type" style="width:calc(100% - 50px);">{{ element.name }}</div>
                    <IDropdown
                      :index="i"
                      :max-i="item.typeList.length - 1"
                      :list="['修改', '新增', '删除']"
                      @select="val => selectIDropdown(val, item.typeList, i, '1', element)"
                    />
                  </div>

                  <draggable :list="element.list" class="list-draggable" group="people">
                    <div
                      v-for="(ele, ii) in element.list"
                      :key="ii"
                      class="list-group-item"
                    >{{ ele.name }}</div>
                  </draggable>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-dialog :visible.sync="centerDialogVisible" width="30%" center>
          <el-input
            ref="content"
            v-model="content"
            @blur="blurContent(row)"
            @keyup.enter.native="blurContent(row)"
          />
        </el-dialog>

        <!-- <div v-if="item.type === 3">
          <div v-for="(ele, i) in item.list" :key="i" style="display:flex">
            <el-tag style="cursor: pointer;margin-top:3px;width:24px" type="success">{{ i + 1 }}</el-tag>
            <div
              v-if="!ele.showInput"
              style="min-width:336px;display: inline-block;margin-left:20px"
              @click="editName(ele)"
            >{{ ele.name }}</div>
            <el-input
              v-if="ele.showInput"
              ref="inputVal"
              v-model="value"
              style="width:336px;margin-left:36px"
              @blur="blurName(ele)"
            />
            <div
              v-if="!ele.showInput"
              style="width: 100px;display: flex; justify-content: space-between;padding-top:9px"
            >
              <i
                style="cursor: pointer;"
                class="el-icon-top"
                @click="moveList(item.list, i, 'top')"
              />
              <i
                style="cursor: pointer;"
                class="el-icon-bottom"
                @click="moveList(item.list, i, 'bottom')"
              />
              <i
                style="cursor: pointer;"
                class="el-icon-circle-plus-outline"
                @click="addOption(item.list, i)"
              />
              <i
                style="cursor: pointer;"
                class="el-icon-remove-outline"
                @click="delOption(item.list, i, item)"
              />
            </div>
          </div>
        </div>-->
      </el-form-item>
    </div>

    <el-form-item class="button-group">
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </div>
</template>
<script>
import WxEditor from '@/core/components/WxEditor'
import { MessageMixin } from '@/core/mixins'
import draggable from 'vuedraggable'
import IDropdown from './IDropdown'
export default {
  components: {
    [WxEditor.name]: WxEditor,
    IDropdown,
    draggable
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.children[0].focus()
      }
    }
  },
  mixins: [MessageMixin],
  props: {
    name: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      checkList: [],
      value: '', // 输入框内容
      show: false,

      content: '',
      centerDialogVisible: false,
      row: {},

      list: [
        {
          title: '标题内容（单选）',
          type: 0, // 0 1 2 3  单选题 多选题  判断题  配对题
          value: '0', // 问题答案  单选 ''   多选 []
          list: [
            {
              value: '0',
              name: '点击修改选项内容',
              showInput: false
            },
            {
              value: '1',
              name: '点击修改选项内容',
              showInput: false
            }
          ]
        }
      ],
      answer: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      config: {
        maximumWords: '1024',
        initialFrameHeight: 100,
        initialFrameWidth: 480,
        toolbars: [
          [
            'source',
            '|',
            'undo',
            'redo',
            '|',
            'fontsize',
            '|',
            'blockquote',
            'horizontal',
            '|',
            'removeformat',
            'formatmatch',
            'cleardoc',
            '|',
            'link',
            'unlink',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'fontborder',
            'spechars',
            'superscript',
            'subscript',
            '|',
            'forecolor',
            'backcolor',
            '|',
            'indent',
            '|',
            'justifyleft',
            'justifycenter',
            'justifyright',
            'justifyjustify',
            'justifyindent',
            '|',
            'rowspacingtop',
            'rowspacingbottom',
            'lineheight',
            'letterspacing',
            '|',
            'insertorderedlist',
            'insertunorderedlist',
            '|',
            'imagenone',
            'imageleft',
            'imageright',
            'imagecenter',
            'applets-card'
          ]
        ]
      }
    }
  },
  methods: {
    addList(index) {
      let name = '单选'
      let list = [
        {
          value: '0',
          name: '点击修改选项内容',
          showInput: false,
          checked: false
        },
        {
          value: '1',
          name: '点击修改选项内容',
          showInput: false,
          checked: false
        }
      ]
      let value = '0'
      let typeList = []
      if (index === 1) {
        name = '多选'
        value = []
        list = [
          {
            value: '0',
            name: '点击修改选项内容',
            showInput: false,
            checked: false
          },
          {
            value: '1',
            name: '点击修改选项内容',
            showInput: false,
            checked: false
          }
        ]
      } else if (index === 2) {
        name = '判断'
        value = '0'
        list = [
          {
            value: '0',
            name: '错误',
            showInput: false,
            checked: false
          },
          {
            value: '1',
            name: '正确',
            showInput: false,
            checked: false
          }
        ]
      } else if (index === 3) {
        name = '配对'
        list = [
          {
            name: '选项内容'
          },
          {
            name: '选项内容'
          }
        ]
        typeList = [
          {
            name: '分类选项',
            list: []
          },
          {
            name: '分类选项',
            list: []
          }
        ]
      }

      this.list.push({
        title: `标题内容-${name}`,
        type: index, // 0 1 2 3  单选题 多选题  判断题  配对题
        value: value, // 问题答案  单选 ''   多选 []
        list: list,
        typeList: typeList // 配对使用
      })
    },
    moveList(list, i, type) {
      const current = { ...list[i] }
      const one = { ...list[0] }
      const last = { ...list[list.length - 1] }

      if (type === 'top') {
        if (i === 0) {
          list.splice(i, 1, last)
          list.splice(list.length - 1, 1, current)
        } else {
          list.splice(i, 1, { ...list[i - 1] })
          list.splice(i - 1, 1, current)
        }
      } else {
        if (i === list.length - 1) {
          list.splice(i, 1, one)
          list.splice(0, 1, current)
        } else {
          list.splice(i, 1, { ...list[i + 1] })
          list.splice(i + 1, 1, current)
        }
      }
    },
    checkChange(val, item, i) {
      if (item.value.includes(item.list[i].value)) {
        if (!val) {
          item.value = item.value.filter(row => {
            return row !== item.list[i].value
          })
        }
      } else {
        if (val) {
          item.value.push(item.list[i].value)
        }
      }
    },
    addOption(list, i) {
      const num = list.length
      // if (num === 4) {
      //   return
      // }
      list.splice(i + 1, 0, {
        value: num,
        name: '点击修改选项内容',
        showInput: false,
        checked: false
      })
    },
    selectIDropdown(val, list, i, type, row) {
      // 删除
      if (val === 2) {
        list.splice(i, 1)
      } else if (val === 1) {
        if (type === '0') {
          list.splice(i + 1, 0, {
            name: '选项内容'
          })
        } else if (type === '1') {
          list.splice(i + 1, 0, {
            name: '分类选项',
            list: []
          })
        }
      } else {
        // 修改
        this.content = row.name
        this.row = row
        this.centerDialogVisible = true
      }
    },
    blurContent(row) {
      this.row.name = this.content
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false
      }
    },
    delOption(list, i, item) {
      const num = list.length
      // 最少两个
      if (num === 2) {
        this.error('至少存在两个选择项')
        return
      }

      if (item.value === list[i].value) {
        item.value = ''
      } else if (item.value.includes(list[i].value)) {
        item.value = []
        list[i].checked = false
      }
      list.splice(i, 1)

      // 避免value 一致的情况 ，
      list.forEach((element, index) => {
        element['value'] = index
      })
    },
    delSubject(list, i) {
      const num = list.length
      if (num === 1) {
        this.error('至少存在一个题目')
        return
      }
      list.splice(i, 1)
      list.forEach((element, index) => {
        element['value'] = index
      })
    },
    editName(row) {
      if (this.show) {
        return
      }
      this.value = row.name
      row.showInput = true
      // 是否存在
      this.show = true
      this.$nextTick(() => {
        this.$refs.inputVal[0].focus()
        // for (let i = 0; i < this.$refs.inputVal.length; i++) {
        //   this.$refs.inputVal[i].focus()
        // }
        //
      })
    },
    blurName(row) {
      if (this.value.trim()) {
        row.showInput = false
        row.name = this.value
        // 是否存在
        this.show = false
      }
    },
    handleWxEditorChange(value, row) {
      row.title = value
    },
    submit() {
      // this.list
      const isAlive = this.list.every(item => {
        return item.value && item.value.length > 0
      })
      if (!isAlive) {
        console.log(this.list)
        this.error('请检查,存在未匹配答案的题目')
        return
      } else {
        console.log(this.list)
        this.success('ok')
      }
    },
    cancel() {
      this.$router.go(-1)
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

.list-title {
  height: 40px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  font-size: 17px;
}
.list-group {
  width: 270px;
  min-height: 300px;

  border: 1px solid #ebeef5;
  color: #303133;
  background-color: #fff;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.list-draggable-a {
  min-height: 40px;
  /* overflow: auto; */
}
.list-draggable {
  /* min-height: 150px; */
  height: 180px;
  overflow: auto;
}
.list-group-item {
  width: 240px;
  margin: 4px auto;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ebeef5;
  color: #303133;
  background-color: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-left: 10px;
}
.list-title-type {
  margin-left: 20px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: bold;
}
</style>

