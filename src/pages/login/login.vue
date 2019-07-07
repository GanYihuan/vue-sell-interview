<template>
  <div class="login-page">
    <el-row>
      <el-col>
        <Header />
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
import Header from 'pages/home/header'
import CryptoJS from 'crypto-js' // encryption
import axios from 'axios'
import { Notyf } from 'notyf' // 纯js消息通知插件

export default {
  name: 'Login',
  components: {
    Header
  },
  data: () => {
    return {
      checked: '',
      error: '',
      focus: false,
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
      this.$refs['ruleForm'].validateField('name', valid => { // Verify that the username passed the check (element-ui method), If there is a value indicating that it has not passed check
        namePass = valid
      })
      this.$refs['ruleForm'].validateField('pwd', valid => { // Verify that the username passed the check (element-ui method), If there is a value indicating that it has not passed check
        pwdPass = valid
      })
      if (namePass || namePass) {
        return false
      }
      axios
        .post('/users/signin', {
          username: window.encodeURIComponent(this.ruleForm.name), // encodeURIComponent: Encoding Chinese
          password: CryptoJS.MD5(this.ruleForm.pwd).toString() // CryptoJS.MD5 encryption
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
            this.error = `服务器出错`
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
@import './login.styl';
</style>
