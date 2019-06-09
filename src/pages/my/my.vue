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
              您用户名
            </el-col>
            <el-col
              :span="5"
              :offset="1"
            >
              <el-link
                type="warning"
                :underline="false"
              >
                {{ user }}
              </el-link>
            </el-col>
          </el-row>
        </li>
        <li class="money">
          <el-row>
            <el-col :span="5">
              Email 地址
            </el-col>
            <el-col
              :span="5"
              :offset="1"
            >
              <el-link
                type="warning"
                :underline="false"
              >
                {{ email }}
              </el-link>
            </el-col>
          </el-row>
        </li>
      </ul>
      <ul class="items">
        <li class="email">
          <el-row>
            <el-col :span="5">
              <el-link
                type="primary"
                :underline="false"
              >
                意见反馈
              </el-link>
            </el-col>
          </el-row>
        </li>
        <li class="question">
          <el-row>
            <el-col :span="5">
              <el-link
                type="primary"
                :underline="false"
              >
                常见问题
              </el-link>
            </el-col>
          </el-row>
        </li>
      </ul>
      <p class="tel">
        <el-row>
          <el-col
            :span="10"
            :offset="7"
          >
            <el-link
              type="danger"
              :underline="false"
            >
              客服电话:&nbsp;101-097-77
            </el-link>
          </el-col>
        </el-row>
      </p>
      <p class="tel">
        <el-row>
          <el-col
            :span="10"
            :offset="7"
          >
            <el-link
              type="danger"
              :underline="false"
            >
              服务时间:&nbsp;9:00-23:00
            </el-link>
          </el-col>
        </el-row>
      </p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

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
