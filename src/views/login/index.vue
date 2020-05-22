<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left">
      <!-- <div class="title-container"> -->
        <h3 class="login_title">
          <img src="./001.png" class="title-logo" width="50" height="50" alt="">
          绿地集团欢迎你
          <!-- 后台管理系统 登录 -->
        </h3>
      <!-- </div> -->
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入账号"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"/>
      </el-form-item>

      <el-form-item prop="value">
        <el-input
          v-model="loginForm.value"
          auto-complete="on"
          placeholder="请输入校验码"
          @keyup.enter.native="handleLogin"/>
      </el-form-item>

      <identify v-model="content" :toLowerCase="true" style="margin-top: -10px" />

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">登录
      </el-button>

    </el-form>
  </div>
</template>

<script>
// import md5 from 'js-md5'
// import { setToken } from '@/utils/auth' // 现存一下
export default {
  name: 'Login',
  data() {
    return {
      eye: 'eye',
      loginForm: {
        username: '',
        password: '',
        value: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        value: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,

      content: ''
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.content !== this.loginForm.value.toLowerCase()) {
            this.$message.error("校验码输入有误")
            return
          }

          this.loading = true
          // const pas = this.loginForm.password
          // this.loginForm.password = md5(md5(this.loginForm.password) + 'asset') // 密码加密
          // 登录 进去 调接口 缓存存token 存vuex token
          this.$store.dispatch('Login', this.loginForm).then(() => {
            // this.loginForm.password = pas
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((error) => {
            // this.loginForm.password = pas
            this.loading = false
            this.$message({
              showClose: true,
              message: error,
              type: 'error'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>
<style scoped>
body {
    margin: 0px;
    padding: 0;
}
.login-container {
   background:url("./timg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}
  .login-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 400px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>