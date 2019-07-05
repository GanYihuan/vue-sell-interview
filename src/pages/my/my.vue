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
        <li class="money">
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
      <ul class="items">
        <li class="email">
          <el-row>
            <el-col :span="5">
              <router-link
                class="login"
                to="/login"
              >
                登录
              </router-link>
            </el-col>
          </el-row>
        </li>
        <li class="question">
          <el-row>
            <el-col :span="5">
              <router-link
                class="register"
                to="/register"
              >
                注册
              </router-link>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios' // Promise based HTTP client for the browser and node.js

export default {
  name: 'My',
  data() {
    return {
      user: '默认用户名',
      email: ''
    }
  },
  async mounted() {
    const { status, data: { user, email }} = await axios.get('/users/getUser')
    if (status === 200) {
      this.user = user
      this.email = email
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './my.styl'
</style>
