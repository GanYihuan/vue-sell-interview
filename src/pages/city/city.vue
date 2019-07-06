<template>
  <div>
    <city-header />
    <city-search :cities="cities" />
    <city-list
      :cities="cities"
      :hot="hotCities"
      :letter="letter"
    />
    <city-alphabet
      :cities="cities"
      @change="handleLetterChange"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'

export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data() {
    return {
      cities: {},
      hotCities: [],
      letter: ''
    }
  },
  async mounted() {
    // this.getCityInfo()
    const { status, data: { citys }} = await axios.get('/locations/getCity')
    if (status === 200) {
      this.hotCities = citys.hotCities
      this.cities = citys.cities
      console.log(this.cities, this.hotCities)
    }
  },
  methods: {
    getCityInfo() {
      axios
        .get('/api/city')
        .then(this.handleGetCityInfoSucc)
    },
    handleGetCityInfoSucc(res) {
      res = res.data.data
      console.log(res[0], 'res--')
      if (res[0].ret && res[0].data) {
        const data = res[0].data
        this.cities = data.cities
        this.hotCities = data.hotCities
      }
    },
    handleLetterChange(letter) {
      this.letter = letter
    }
  }
}
</script>
