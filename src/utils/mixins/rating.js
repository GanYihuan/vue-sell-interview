import moment from 'moment'
const ALL = 2

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    },
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    }
  }
}
