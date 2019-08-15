const mongoose = require('mongoose')
const Schema = mongoose.Schema // Schema: Description of the table
const CMerchantSchema = new Schema({
  id: {
    type: Number,
    require: true
  },
  mt_poi_id: {
    type: Number,
    require: true
  },
  support_coupon: {
    type: Number,
    require: true
  },
  is_favorite: {
    type: Number,
    require: true
  },
  sort_reason_type: {
    type: Number,
    require: true
  },
  delivery_type: {
    type: Number,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  origin_status: {
    type: Number,
    require: true
  },
  avg_delivery_time: {
    type: Number,
    require: true
  },
  shipping_fee: {
    type: Number,
    require: true
  },
  shipping_fee_discount: {
    type: Number,
    require: true
  },
  min_price: {
    type: Number,
    require: true
  },
  new_promotion: {
    type: Number,
    require: true
  },
  month_sale_num: {
    type: Number,
    require: true
  },
  wm_poi_score: {
    type: Number,
    require: true
  },
  pre_book: {
    type: Number,
    require: true
  },
  brand_type: {
    type: Number,
    require: true
  },
  sales: {
    type: Number,
    require: true
  },
  priority: {
    type: Number,
    require: true
  },
  wm_poi_opening_days: {
    type: Number,
    require: true
  },
  buz_type: {
    type: Number,
    require: true
  },
  across_book_offset_days: {
    type: Number,
    require: true
  },
  across_book_max_days: {
    type: Number,
    require: true
  },
  latitude: {
    type: Number,
    require: true
  },
  longitude: {
    type: Number,
    require: true
  },
  primitiveDistance: {
    type: Number,
    require: true
  },
  support_pay: {
    type: Number,
    require: true
  },
  invoice_support: {
    type: Number,
    require: true
  },
  invoice_min_price: {
    type: Number,
    require: true
  },
  ad_type: {
    type: Number,
    require: true
  },
  sort_reason_tag: {
    type: String,
    require: true
  },
  distance: {
    type: String,
    require: true
  },
  poi_type_icon: {
    type: String,
    require: true
  },
  status_desc: {
    type: String,
    require: true
  },
  mt_delivery_time: {
    type: String,
    require: true
  },
  pic_url: {
    type: String,
    require: true
  },
  pic_url_square: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  shipping_time_x: {
    type: String,
    require: true
  },
  ad_attr: {
    type: String,
    require: true
  },
  shipping_fee_tip: {
    type: String,
    require: true
  },
  min_price_tip: {
    type: String,
    require: true
  },
  average_price_tip: {
    type: String,
    require: true
  },
  charge_info: {
    type: String,
    require: true
  },
  wm_poi_view_id: {
    type: String,
    require: true
  },
  discounts2: {
    type: Array,
    require: true
  },
  recommend_info: {
    type: Object,
    require: true
  },
  shipping_time_info: {
    type: Object,
    require: true
  },
  city: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('CMerchant', CMerchantSchema) // model create Model
