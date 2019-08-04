<template>
  <div class="login-page">
    <el-row>
      <el-col>
        <Header />
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="21"
        :offset="3"
      >
        <div class="form">
          <span class="register-text">注册账号</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="19"
        :offset="0"
      >
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          label-width="100px"
        >
          <el-form-item
            label="昵称"
            prop="name"
          >
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input v-model="ruleForm.email" />
            <el-button
              size="mini"
              round
              :disabled="checked"
              @click="sendMsg"
            >
              发送验证码
            </el-button>
            <div class="status">
              {{ statusMsg }}
            </div>
          </el-form-item>
          <el-form-item
            label="验证码"
            prop="code"
          >
            <el-input
              v-model="ruleForm.code"
              maxlength="4"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pwd"
          >
            <el-input
              v-model="ruleForm.pwd"
              type="password"
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="cpwd"
          >
            <el-input
              v-model="ruleForm.cpwd"
              type="password"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn"
              type="warning"
              plain
              size="medium"
              @click="register"
            >
              注册
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              class="btn"
              type="warning"
              plain
              size="medium"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import { Notyf } from 'notyf' // Pure js message notification plugin
import CryptoJS from 'crypto-js' // encryption
import Header from 'pages/home/header'

export default {
  name: 'Register',
  components: {
    Header
  },
  data() {
    return {
      checked: false, // 验证码按钮开关
      verifyCode: '', // 验证码
      username: '',
      password: '',
      statusMsg: '', // 提示消息
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
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
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => { // Custom rule
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      const that = this
      let namePass
      let emailPass
      this.statusMsg = ''
      if (this.timerid) {
        return false
      }
      this.$refs['ruleForm'].validateField('name', valid => { // Verify that the username passed the check (element-ui method), If there is a value indicating that it has not passed check
        namePass = valid
      })
      this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })
      if (namePass || emailPass) { // not passed check
        return false
      }
      if (!namePass && !emailPass) { // passed check
        axios
          .post('/users/verify', {
            username: window.encodeURIComponent(that.ruleForm.name), // encodeURIComponent: Encoding Chinese
            email: that.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) { // code countdown
              let count = 60
              that.statusMsg = `验证码已发送，剩余${count--}秒`
              that.verifyCode = data.verifyCode
              that.timerid = setInterval(() => {
                that.statusMsg = `验证码已发送，剩余${count--}秒`
                that.checked = true
                if (count === 0) {
                  clearInterval(that.timerid)
                  that.statusMsg = ''
                  that.checked = false
                }
              }, 1000)
            } else {
              that.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      const notyf = new Notyf()
      if (this.ruleForm.code !== this.verifyCode) {
        notyf.error(`验证码错误!`)
        return false
      }
      this.$refs['ruleForm'].validate(valid => { // Verification form
        if (valid) {
          axios
            .post('/users/signup', {
              username: window.encodeURIComponent(this.ruleForm.name),
              password: CryptoJS.MD5(this.ruleForm.pwd).toString(), // CryptoJS.MD5 encryption
              email: this.ruleForm.email,
              code: this.ruleForm.code
            })
            .then(({ status, data }) => {
              const notyf = new Notyf()
              if (status === 200) {
                if (data && data.code === 0) {
                  this.$router.push('/login')
                } else {
                  notyf.error(`${data.msg}`)
                }
              } else {
                notyf.error(`服务器出错，错误码:${status}`)
              }
            })
        }
      })
    },
    login() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './register.styl';
</style>
