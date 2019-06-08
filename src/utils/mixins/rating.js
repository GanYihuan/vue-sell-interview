import moment from 'moment'
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
    ...mapState(['dateType'])
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
