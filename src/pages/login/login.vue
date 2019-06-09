<template>
  <div class="login-page">
    <el-row>
      <el-col>
        <router-link
          class="logo"
          to="/navbar"
          tab="a"
        >
          <Header />
        </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="16"
        :offset="4"
      >
        <div class="form">
          账号登录
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="4"
        offset="4"
      >
        <div
          v-if="error"
          class="tips"
        >
          {{ error }}
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="16"
        :offset="4"
      >
        <el-input
          v-model="username"
          class="username"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
        />
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="16"
        :offset="4"
      >
        <el-input
          v-model="password"
          class="password"
          prefix-icon="el-icon-unlock"
          placeholder="请输入密码"
          show-password
          type="password"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="16"
        :offset="4"
      >
        <div class="foot">
          <el-checkbox v-model="checked">
            7天内自动登录
          </el-checkbox>
          <router-link
            class="logo"
            to="/register"
            tab="a"
          >
            <el-link
              type="primary"
              :underline="false"
            >
              注册账号
            </el-link>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="16"
        :offset="4"
      >
        <el-button
          class="btn-login"
          round
          size="mini"
          @click="login"
        >
          登录
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from '../home/header'
import CryptoJS from 'crypto-js' // encryption
import axios from 'axios'

export default {
  name: 'Login',
  components: {
    Header
  },
  data: () => {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      axios
        .post('/users/signin', {
          username: window.encodeURIComponent(this.username), // encodeURIComponent: Encoding Chinese
          password: CryptoJS.MD5(this.password).toString() // CryptoJS.MD5 encryption
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              // location.href = '/navbar'
              this.$router.push('/navbar')
            } else {
              this.error = data.msg
            }
          } else {
            this.error = `服务器出错`
          }
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './login.styl';
</style>
