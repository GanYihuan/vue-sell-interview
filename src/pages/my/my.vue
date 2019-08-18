<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-07 00:14:33
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-18 22:57:02
 -->
<template>
  <div class="my">
    <div class="header">
      <div class="logo">
        <div class="icon" />
        <div class="nickname">
          {{ user }}
        </div>
      </div>
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
        <li>
          <el-row>
            <el-col :span="8">
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
            <el-col :span="8">
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
            <el-col :span="8">
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
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Notyf } from 'notyf' // 提示插件
import axios from 'axios' // Promise based HTTP client for the browser and node.js

export default {
  name: 'My',
  data() {
    return {
      user: '',
      email: ''
    }
  },
  async mounted() {
    // const { status, data: { user, email }} = await axios.get('/users/getUser')
    // if (status === 200) {
    //   this.user = user
    //   this.email = email
    // }
    axios
      .get('/api/user')
      .then((res) => {
        res = res.data
        if (res.data) {
          const data = res.data
          console.log(data, 'data-')
          this.user = data[0].username
        }
      })
  },
  methods: {
    async logout() {
      const { status, data } = await axios.get('/users/exit')
      const notyf = new Notyf()
      if (status === 200 && data && data.code === 0) {
        this.user = ''
        this.email = ''
        notyf.success(`登出操作`)
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
