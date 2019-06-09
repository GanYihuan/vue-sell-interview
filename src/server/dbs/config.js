export default {
  dbs: 'mongodb://127.0.0.1:27017/student', // Set address, Default port, student: Name database
  redis: {
    get host() { // Default host
      return '127.0.0.1'
    },
    get port() { // Default port
      return 6379
    }
  },
  smtp: {
    get host() { // Default Tencent mailbox
      return 'smtp.qq.com'
    },
    get user() { // Tencent mailbox that accepts the verification code
      return '583520052@qq.com'
    },
    get pass() { // SMTP Tencent mailbox authorization code
      return 'vjalqgcbjqdhbbfb'
    },
    get code() { // Verification code generation
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    get expire() { // Verification code expiration time
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
