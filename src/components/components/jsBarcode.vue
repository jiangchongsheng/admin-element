<template>
  <div>
    <img id="barcode" >
    <div @click="test">test</div>
  </div>
</template>
<script>

import JsBarcode from 'jsbarcode'

export default {
  name: 'JsBarcode',
  data() {
    return {
    }
  },
  created() {

  },

  mounted() {
    const a = '11212'
    JsBarcode('#barcode', a, {

      format: 'CODE128', // 选择要使用的条形码类型

      text: '条形码的数据',

      displayValue: true, // 是否在条形码下方显示文字

      textPosition: 'bottom'// 设置文本的垂直位置

      // text: '显示文案',
      // format: 'CODE39',
      // displayValue: true,
      // width: 2.0,
      // height: 100,
      // margin: 0

    })
  },
  methods: {
    test() {
      JsBarcode('#barcode', '1234556', {

        format: 'CODE128', // 选择要使用的条形码类型

        text: '条形码的数据',

        displayValue: true, // 是否在条形码下方显示文字

        textPosition: 'bottom'// 设置文本的垂直位置

      // text: '显示文案',
      // format: 'CODE39',
      // displayValue: true,
      // width: 2.0,
      // height: 100,
      // margin: 0

      })
    }
  }
}
</script>
