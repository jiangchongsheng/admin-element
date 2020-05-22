### 图形验证码组件说明

v-model	           |  String  |  值
length             |  Number  |  随机几位数(默认4)
click              |  Boolean |  点击组件自动切换(默认true)
fontSizeMin        |  Number  |  字体最小值(默认25)
fontSizeMax        |  Number  |  字体最大值(默认35)
backgroundColorMin |  Number  |  验证码图片背景色最小值(默认200)
backgroundColorMax |  Number  |  验证码图片背景色最大值(默认220)
dotColorMin        |  Number  |  背景干扰点最小值(默认60)
dotColorMax        |  Number  |  背景干扰点最大值(默认120)
contentWidth       |  Number  |  容器宽度(默认116)
contentHeight      |  Number  |  容器高度(默认80)
toLowerCase        |  Boolean |  是否转换为小写(默认否)
toUpperCase        |  Boolean |  是否转换为大写(默认否) 一个， 两个都true 取小写。
showContent        |  String  |  随机的需要显示的内容 
                                 (默认 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ)

#### 用法
```javascript
<template>
   <identify v-model="content"/>
</template>
<script>

export default {
  data() {
    return {
      content: ''
    }
  }
}
</script>
```