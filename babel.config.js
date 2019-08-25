/*
 * @Description:
 * @version:
 * @Author: GanEhank
 * @Date: 2019-06-08 19:33:01
 * @LastEditors: GanEhank
 * @LastEditTime: 2019-08-22 01:50:46
 */
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
