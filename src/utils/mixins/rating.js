/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-17 10:28:18
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-15 15:30:01
 */
import { mapState } from 'vuex'
import moment from 'moment' // 时间格式处理

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
