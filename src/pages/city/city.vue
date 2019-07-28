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
import axios from 'axios' // Promise based HTTP client for the browser and node.js
import CityHeader from './header'
import CitySearch from './search'
import CityList from './list'
import CityAlphabet from './alphabet'

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
    const { status, data: { citys }} = await axios.get('/locations/getCity')
    if (status === 200) {
      this.hotCities = citys.hotCities
      this.cities = citys.cities
    }
  },
  methods: {
    handleLetterChange(letter) {
      this.letter = letter
    }
  }
}
</script>
