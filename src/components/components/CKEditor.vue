<template>
  <div>
    <vue-ckeditor
      v-model="content"
      :config="config"
      @blur="onBlur($event)"
      @focus="onFocus($event)"
      @contentDom="onContentDom($event)"
      @dialogDefinition="onDialogDefinition($event)"
      @fileUploadRequest="onFileUploadRequest($event)"
      @fileUploadResponse="onFileUploadResponse($event)" />
    <div @click="aaa">确定</div>
  </div>
</template>

<script>
import VueCkeditor from 'vue-ckeditor2'

export default {
  components: { VueCkeditor },
  data() {
    return {
      content: '<p>asodfjaoisdjfsaijfd</p>',
      config: {
        // removePlugins: ["videoembed"],
        extraPlugins: ['html5video'],
        height: 300,
        filebrowserImageUploadUrl:
          '/api/ckeditor/action?action=uploadimage',
        filebrowserHtml5videoUploadUrl:
          '/api/ckeditor/action?action=uploadvideo'
      }
    }
  },
  methods: {
    aaa() {
      // console.log(this.content);

      // this.content.replace(/<p>/g, '""')

      var reg = /\<\/?p\>/g
      // var str = "ab<p>sdf</p>dd<a>dd</a>";

      this.content.replace(reg, '').replace(/&nbsp;/g, '').trim()

      // if (!)) {
      //   alert('为空')
      // }
    },
    onBlur(evt) {

    },
    onFocus(evt) {
      console.log('获取焦点', evt)
    },
    onContentDom(evt) {
      console.log('3', evt)
    },
    onDialogDefinition(evt) {
      console.log('4', evt)
    }
  }
}
</script>
