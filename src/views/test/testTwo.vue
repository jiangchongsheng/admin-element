<template>
  <div>
    <js-barcode
      ref-id="barcodeId"
      content="123123" />
    <identify v-model="content" />

    <copy-msg msg="我是复制的内容" />
    <qr-code value="我是扫描出来的值" />
    <div @click="bbb">sadasd</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: [],
      list2: [],
      list3: [],
      content: '12324',
      hahaha: [{ 'province_name': '海南', 'city': [{ 'id': '121', 'city_name': '三亚', 'area': [] }, { 'id': '120', 'city_name': '海口', 'area': [] }] }, { 'province_name': '山西', 'city': [{ 'id': '305', 'city_name': '临汾', 'area': [] }, { 'id': '300', 'city_name': '太原', 'area': [] }] }, { 'province_name': '辽宁', 'city': [{ 'id': '249', 'city_name': '丹东', 'area': [] }, { 'id': '245', 'city_name': '大连', 'area': [] }, { 'id': '244', 'city_name': '沈阳', 'area': [] }] }, { 'province_name': '广东', 'city': [{ 'id': '80', 'city_name': '佛山', 'area': [] }] }, { 'province_name': '贵州', 'city': [{ 'id': '114', 'city_name': '六盘水', 'area': [] }, { 'id': '111', 'city_name': '贵阳', 'area': [] }] }, { 'province_name': '甘肃', 'city': [{ 'id': '62', 'city_name': '兰州', 'area': [] }] }, { 'province_name': '江苏', 'city': [{ 'id': '220', 'city_name': '南京', 'area': [{ 'id': '220', 'area_name': '高淳区' }] }, { 'id': '227', 'city_name': '宿迁', 'area': [{ 'id': '227', 'area_name': '沭阳县' }] }, { 'id': '223', 'city_name': '常州', 'area': [] }, { 'id': '229', 'city_name': '徐州', 'area': [] }, { 'id': '231', 'city_name': '扬州', 'area': [] }, { 'id': '222', 'city_name': '无锡', 'area': [{ 'id': '222', 'area_name': '宜兴市' }] }, { 'id': '224', 'city_name': '淮安', 'area': [] }, { 'id': '230', 'city_name': '盐城', 'area': [] }, { 'id': '221', 'city_name': '苏州', 'area': [{ 'id': '221', 'area_name': '昆山市' }] }, { 'id': '225', 'city_name': '连云港', 'area': [] }, { 'id': '232', 'city_name': '镇江', 'area': [] }] }, { 'province_name': '江西', 'city': [{ 'id': '233', 'city_name': '南昌', 'area': [] }, { 'id': '235', 'city_name': '赣州', 'area': [] }] }, { 'province_name': '台湾', 'city': [{ 'id': '397', 'city_name': '台湾', 'area': [] }] }, { 'province_name': '安徽', 'city': [{ 'id': '3401', 'city_name': '合肥', 'area': [] }] }, { 'province_name': '吉林', 'city': [{ 'id': '212', 'city_name': '吉林', 'area': [] }] }, { 'province_name': '黑龙江', 'city': [{ 'id': '167', 'city_name': '哈尔滨', 'area': [] }, { 'id': '176', 'city_name': '齐齐哈尔', 'area': [] }] }, { 'province_name': '浙江', 'city': [{ 'id': '385', 'city_name': '嘉兴', 'area': [] }, { 'id': '383', 'city_name': '杭州', 'area': [] }, { 'id': '384', 'city_name': '湖州', 'area': [] }] }, { 'province_name': '湖北', 'city': [{ 'id': '195', 'city_name': '宜昌', 'area': [] }, { 'id': '180', 'city_name': '武汉', 'area': [] }] }, { 'province_name': '湖南', 'city': [{ 'id': '199', 'city_name': '常德', 'area': [] }, { 'id': '210', 'city_name': '株洲', 'area': [] }] }, { 'province_name': '河北', 'city': [{ 'id': '148', 'city_name': '张家口', 'area': [] }, { 'id': '138', 'city_name': '石家庄', 'area': [] }] }, { 'province_name': '河南', 'city': [{ 'id': '160', 'city_name': '新乡', 'area': [] }, { 'id': '162', 'city_name': '许昌', 'area': [] }, { 'id': '149', 'city_name': '郑州', 'area': [] }] }, { 'province_name': '云南', 'city': [{ 'id': '367', 'city_name': '昆明', 'area': [] }] }, { 'province_name': '山东', 'city': [{ 'id': '298', 'city_name': '枣庄', 'area': [] }, { 'id': '283', 'city_name': '济南', 'area': [] }, { 'id': '299', 'city_name': '淄博', 'area': [] }, { 'id': '284', 'city_name': '青岛', 'area': [] }] }, { 'province_name': '福建', 'city': [{ 'id': '61', 'city_name': '漳州', 'area': [] }, { 'id': '53', 'city_name': '福州', 'area': [] }] }, { 'province_name': '澳门', 'city': [{ 'id': '396', 'city_name': '澳门', 'area': [{ 'id': '396', 'area_name': '澳门' }] }] }, { 'province_name': '青海', 'city': [{ 'id': '275', 'city_name': '西宁', 'area': [] }] }, { 'province_name': '陕西', 'city': [{ 'id': '311', 'city_name': '西安', 'area': [] }] }, { 'province_name': '香港', 'city': [{ 'id': '395', 'city_name': '香港', 'area': [] }] }]
    }
  },
  created() {
    this.aaa(this.hahaha, this.list1, 'province_name', 'city')
    console.log(this.list1, this.list2, this.list3)
  },
  methods: {
    bbb() {
      console.log(this.list1, this.list2, this.list3, )
    },
    // list , 省市区list ，名称 ， 子集list ， key
    // 因为内部参数都不是统一的
    aaa(data, arr, name, sonlist, id) {
      for (let i = 0; i < data.length; i++) {
        arr.push({
          'name': data[i][name], // 名称
          'key': id || i// key 值
        })
        if (data[i][sonlist] && data[i][sonlist].length !== 0) {
          if (sonlist === 'area') { // 最下一级
            this.aaa(data[i][sonlist], this.list3, 'area_name', 'aa', i)
          } else {
            this.aaa(data[i][sonlist], this.list2, 'city_name', 'area', i)
          }
        }
      }
    }
  }
}

</script>

<style></style>
