# we-datePicker

轻量级日期选择组件

## 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`

### 基本用法

    <template>
        <view>
            <view @click="showdate01">请选择时间 </view>     
            <view>{{date}}</view>
            <we-datePicker ref="datePicker" @confirm="getDate01"></we-datePicker>
        </view>
    </template>
    <script>
    export default {
        data() {
            return {
                date:""
            }
        },
        methods: {
             showdate01(e){
                   this.$refs.datePicker.show();
               },
             getDate01(e) {
                  console.log(e);
                  console.log(this);
                  this._data.date = e;
                  console.log(this._data.date);                       
                  }
        }    
    }
    </script>

## API

### Events

| 事件名      | 说明     | 返回值    |
| -------- | ------ | ------ |
| @confirm | 选中日期事件 | string |
