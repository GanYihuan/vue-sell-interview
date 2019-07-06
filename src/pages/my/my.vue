<template>
  <div class="my">
    <div class="header">
      <router-link
        class="logo"
        to="/login"
        tab="li"
      >
        <div class="icon" />
        <div class="nickname">
          {{ user }}
        </div>
      </router-link>
    </div>
    <div class="content">
      <ul class="items">
        <li class="address">
          <el-row>
            <el-col :span="5">
              用户名
            </el-col>
            <el-col
              :span="5"
              :offset="1"
            >
              {{ user }}
            </el-col>
          </el-row>
        </li>
        <li class="email">
          <el-row>
            <el-col :span="5">
              Email
            </el-col>
            <el-col
              :span="5"
              :offset="1"
            >
              {{ email }}
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <el-row>
      <el-col>
        <el-button
          class="btn login"
          type="warning"
          plain
          size="medium"
          @click="login"
        >
          登录
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button
          class="btn logout"
          type="warning"
          plain
          size="medium"
          @click="logout"
        >
          登出
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button
          class="btn register"
          type="warning"
          plain
          size="medium"
          @click="register"
        >
          注册
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import { Notyf } from 'notyf' // 纯js消息通知插件

export default {
  name: 'My',
  data() {
    return {
      user: '',
      email: ''
    }
  },
  async mounted() {
    const { status, data: { user, email }} = await axios.get('/users/getUser')
    if (status === 200) {
      this.user = user
      this.email = email
    }
  },
  methods: {
    async logout() {
      const { status, data } = await axios.get('/users/exit')
      const notyf = new Notyf()
      if (status === 200 && data && data.code === 0) {
        this.user = ''
        this.email = ''
        notyf.error(`登出操作`)
      }
    },
    register() {
      this.$router.push('/register')
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './my.styl'
</style>
