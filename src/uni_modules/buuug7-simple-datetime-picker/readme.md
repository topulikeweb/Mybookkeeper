# uniApp 简单的日期时间选择器

uniApp 日期时间选择器, 可选择年, 月, 日, 时, 分.

## screenshot

<p>
  <img align=top src="https://img-cdn-aliyun.dcloud.net.cn/stream/plugin_screens/19363640-a869-11e9-a6c7-7fb99abe2bbf_0.png?1629144139" width="300px" height="auto">
</p>

## 安装

推荐从[dcloud 插件市场](https://ext.dcloud.net.cn/plugin?id=592) 安装.

## 用法

在 template 中：

```vue
<template>
  <view>
    <button type="default" @click="openDatetimePicker">open picker</button>
    <SimpleDateTimePicker
      ref="myPicker"
      @submit="handleSubmit"
      :start-year="2000"
      :end-year="2030"
    />
  </view>
</template>
```

在 script 中：

> 该插件遵循 easycom 规范, 不用显式导入就可以使用 `<buuug7-simple-datetime-picker ... />` 该组件

```javascript
import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";

export default {
  components: {
    SimpleDateTimePicker,
  },
  data() {
    return {
      birthday: "",
    };
  },
  methods: {
    // 打开picker
    openDatetimePicker() {
      this.$refs.myPicker.show();
    },

    // 关闭picker
    closeDatetimePicker() {
      this.$refs.myPicker.hide();
    },

    handleSubmit(e) {
      // {year: "2019", month: "07", day: "17", hour: "15", minute: "21"}
      console.log(e);
      this.birthday = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
    },
  },
};
```

> Note: 不要把组件放 swiper 里面或者 v-for 里面等, 最好放在页面根部. 通常情况下打开 picker 需要调用`this.$refs.refName.show()`, 在选择完毕后 picker 会自动隐藏，不需要调用`this.$refs.refName.hide()`来手动隐藏。

## 属性说明

- `start-year`，类型 `number`，选择开始年份
- `end-year`，类型 `number`, 选择结束年份
- `@submit`, 类型 `function`, 监听选择事件，
- `ref`，指定该 picker 的引用，方便打开关闭
