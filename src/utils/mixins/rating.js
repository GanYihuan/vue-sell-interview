import moment from 'moment' // 时间格式处理
import { mapState } from 'vuex'
const ALL = 2

export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  computed: {
    ...mapState({
      dateType: state => state.dateType
    })
  },
  methods: {
    onSelect(type) {
      this.selectType = type
    },
    onToggle() {
      this.onlyContent = !this.onlyContent
    },
    formatDate(time) {
      return moment(time).format(this.dateType)
    }
  }
}
