﻿<!--
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-09 02:34:05
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-21 02:31:07
 -->
<template>
  <div class="login-page">
    <el-row>
      <el-col>
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <!-- :span -> 占据空间 -->
      <!-- :offset -> 距离左侧距离 -->
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
        :span="16"
        :offset="4"
      >
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-form-item
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              class="username"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
            />
          </el-form-item>
          <el-form-item
            prop="pwd"
          >
            <el-input
              v-model="ruleForm.pwd"
              class="password"
              prefix-icon="el-icon-unlock"
              placeholder="请输入密码"
              show-password
              type="password"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="16"
        :offset="4"
      >
        <el-button
          class="btn"
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
      <el-col
        :span="16"
        :offset="4"
      >
        <el-button
          class="btn"
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

<script>
import { Notyf } from 'notyf' // 提示插件
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import CryptoJS from 'crypto-js' // 加密
import Header from 'pages/home/header'

export default {
  name: 'Login',
  components: {
    Header
  },
  data() {
    return {
      ruleForm: {
        name: '',
        pwd: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      const notyf = new Notyf()
      let namePass
      let pwdPass
      this.$refs['ruleForm'].validateField('name', valid => { // 验证用户名是否通过了检查（element-ui方法），如果有值表明它没有通过检查
        namePass = valid
      })
      this.$refs['ruleForm'].validateField('pwd', valid => { // 验证密码是否通过了检查（element-ui方法），如果有值表明它没有通过检查
        pwdPass = valid
      })
      if (namePass || pwdPass) { // 没通过检查
        return false
      }
      axios
        .post('/users/signin', {
          username: window.encodeURIComponent(this.ruleForm.name), // encodeURIComponent 编码中文
          password: CryptoJS.MD5(this.ruleForm.pwd).toString() // CryptoJS.MD5 加密
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              this.$router.push('/my')
            } else {
              if (namePass || pwdPass) {
                notyf.error('请完整输入信息')
              } else {
                notyf.error(`${data.msg}`)
              }
            }
          } else {
            notyf.error('服务器出错')
          }
        })
    },
    register() {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './login.styl'
</style>
