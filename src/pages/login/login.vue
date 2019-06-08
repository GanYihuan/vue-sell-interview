<template>
  <div class="login-page">
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
        <div class="grid-content bg-purple">
          <el-input
            v-model="username"
            prefix-icon="profile"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col
        :span="16"
        :offset="4"
      >
        <el-input
          v-model="password"
          prefix-icon="password"
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
          <b>忘记密码？</b>
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
          type="primary"
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
// import CryptoJS from 'crypto-js' // encryption
export default {
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

<style lang="scss" scoped>
@import './login.scss'
</style>
