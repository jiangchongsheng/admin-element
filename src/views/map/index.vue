<template>
  <div>
    <!-- @ready="handler" -->
    <baidu-map
      :zoom="zoom"
      :scroll-wheel-zoom="true"
      :center="center"
      class="bm-view"
      ak="87nNWmzP1Sj6R6DgL8HseKOtgHsZk5nL"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
      @ready="handler"
    >
      <bm-city-list :offset="{width:50,height:20}" anchor="BMAP_ANCHOR_TOP_LEFT"/>
      <bm-geolocation :label-style="{color: 'red', fontSize : '24px'}" :show-address-bar="true" :auto-location="true" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" />
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"/>

      <bm-control :offset="{width:150,height:10}" anchor="BMAP_ANCHOR_TOP_LEFT">
        <el-button plain type="primary" @click="openDistanceTool">开启测距</el-button>
      </bm-control>
    </baidu-map>

    <input v-model.number="center.lng">
    <input v-model.number="center.lat">
    <input v-model.number="zoom">

  </div>
</template>

<script>
// import moment from 'moment'
import BaiduMap from 'vue-baidu-map/components/Map/Map.vue' // 局部注册

import { BmCityList, BmGeolocation, BmNavigation, BmPanorama, BmControl } from 'vue-baidu-map'
// 第三方测距插件
import DistanceTool from 'bmaplib.distancetool'
export default {
  components: {
    BaiduMap,
    BmCityList,
    BmGeolocation,
    BmNavigation,
    BmPanorama,
    BmControl
  },
  data() {
    return {
      center: {
        lng: 116.404,
        lat: 39.915
      },
      zoom: 15,
      addressKeyword: ''
    }
  },
  created() {
  },
  methods: {
    handler({ BMap, map }) {
      this.distanceTool = new DistanceTool(map, { lineStroke: 2 })
    },
    openDistanceTool(e) {
      const { distanceTool } = this
      distanceTool && distanceTool.open()
    },
    syncCenterAndZoom(e) {
      // const { lng, lat } = e.target.getCenter()
      // this.center.lng = lng
      // this.center.lat = lat
      // this.zoom = e.target.getZoom()
    }
    // getCurlocation() { // 获取浏览器当前定位
    //   if (!this.BMap) return false
    //   const BMap = this.BMap
    //   const geolocation = new BMap.Geolocation()
    //   const _this = this
    //   geolocation.getCurrentPosition(function(r) {
    //     _this.map_center = r.point
    //     _this.shop_lng = r.point.lng
    //     _this.shop_lat = r.point.lat
    //   })
    // }
  }
}
</script>

<style type="text/css" scoped>
.bm-view {
  width: 100%;
  height: 500px;
}
</style>
