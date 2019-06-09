<template>
  <div class="login-page">
    <el-row>
      <el-col>
        <router-link
          class="logo"
          to="/home"
          tab="li"
        >
          <Header />
        </router-link>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="4"
        :offset="4"
      >
        <div class="form">
          <h4
            v-if="error"
            class="tips"
          >
            <i />
            {{ error }}
          </h4>
          <p>
            <span>账号登录</span>
          </p>
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
          <strong>注册账号</strong>
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
// import CryptoJS from 'crypto-js' // encryption
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
  layout: 'blank',
  methods: {
    login() {
      console.log('login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './login.styl';
</style>
