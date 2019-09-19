<template>
  <div>
    12
  </div>
</template>

<script>
import NP from 'number-precision'
export default {
  data() {
    return {
    }
  },
  watch: {
    objData: {
      handler() {
        // this.drawLine()
      },
      deep: true

    }
  },
  created() {
    // 2090.03 132.03
    alert(NP.plus(2090.07, 132.07))
  },
  methods: {
    // accAdd(arg1, arg2) {
    //   let [r1, r2, m] = [0, 0]
    //   try {
    //     r1 = arg1.toString().split('.')[1].length
    //   } catch (e) { console.log('出错了') }
    //   try {
    //     r2 = arg2.toString().split('.')[1].length
    //   } catch (e) { console.log('出错了') }
    //   m = Math.pow(10, Math.max(r1, r2))
    //   return (arg1 * m + arg2 * m) / m
    // }
  }
}

</script>

<style></style>
