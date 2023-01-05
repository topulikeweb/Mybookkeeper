## 引入插件
`在main.js中添加` 

import dropdown from './components/dropdown/dt-dropDown.vue'
Vue.component('dropdown', dropdown)



## 使用 

<dropdown :list="list" @onClick="dropDownChange"></dropdown>
