# 导入即用 全端支持
### 2.0插件地址  https://ext.dcloud.net.cn/plugin?id=5842  （基于uview2.0）
### 1.0插件地址  不在提供

#### 注意！！！
``` 
本插件基于 uview2.0进行重构 使用需要引入uview2.0支持
[ 点击uview2.0官网地址 ](https://www.uviewui.com/)
[引入uview2.0指南](https://ext.dcloud.net.cn/plugin?id=1593)
```
### 有问题 可评论 看到及时回复
# 使用方式
## 1. 注册
### App.vue引入组件样式即可
```javascript
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/components/active-form/css/active-form.scss";//注入active-form样式
</style>
```


## 2.页面使用

```javascript
<template>
    <view class="content">
        <active-form v-model="formData" num></active-form>
        
        <view class="subform" @click="sub">提交表单</view>
    </view>
</template>

<script>
import ActiveForm from "@/components/active-form/active-form";

export default {
    components: {
        ActiveForm,
    },
    data() {
        return {
            formData: [
                {
                    id: "sadasgh",
                    placeholder: "请选择年龄段",
                    label: "年龄",
                    type: "radio",
                    list: [
                        {
                            value: 1,
                            label: "15岁以下",
                        },
                        {
                            value: 2,
                            label: "16~20岁",
                        },
                        {
                            value: 3,
                            label: "21~25岁",
                        },
                        {
                            value: 4,
                            label: "26~30岁",
                        },
                        {
                            value: 5,
                            label: "31~40岁",
                        },
                        {
                            value: 6,
                            label: "40岁以上",
                        },
                    ],
                    rules: {
                        name: "age",
                        value: 1, // 字段值  list.value 填入回显 0 1
                        verify: false,
                        errMess: "请选择年龄段",
                    },
                },
                {
                    id: "kjjnsasd",
                    placeholder: "输入名字",
                    label: "姓名",
                    type: "text",
	            disabled:true,
                    rules: {
                        name: "name",
                        value: "",
                        verify: true,
                        errMess: "姓名未填写",
			regexp:'^赵'  //正则校验
                    },
                },
                {
                    id: "kjjnsasd",
                    placeholder: "输入验证码",
                    label: "验证码",
                    type: "code",
		    disabled:true,//是否禁用
                    rules: {
                        name: "code",
                        value: "",
                        verify: true,
                        errMess: "验证码未填写",
                    },
                    // 发送验证码回调   由于小程序props传递函数会丢失（此处无效） 此回调方法在组建内部书写  方法在目录active-form/mixins.js中自定义书写
                    // sendCodeCallback() {
                    //
                    // }
                },
                {
                    id: "uisdfjks",
                    placeholder: "请输入手机号",
                    label: "手机",
                    type: "mobile",
                    rules: {
                        name: "mobile",
                        value: "", //字段值
                        verify: true,
                        errMess: "手机号格式不正确",
                    },
                    oneKeyPhone: true, //是否开启微信点击获取手机号
                    //微信获取手机号回调  和参数oneKeyPhone配套  由于小程序props传递函数会丢失（此处无效） 方法在目录active-form/mixins.js中自定义书写
                    // getphonenumber({details}) {
                    //
                    // }
                },
                {
                    id: "ukhjgasdsas",
                    placeholder: "选择",
                    label: "性别",
                    type: "select",
                    show: false, //是否显示
                    title: "请选择性别",
                    list: [
                        {
                            value: 1,
                            name: "男",
                        },
                        {
                            value: 2,
                            name: "女",
                        },
                    ],
                    rules: {
                        name: "sex",
                        value: "", //list.value  0 1
                        label: "", // list.name  填入回显 '男'
                        verify: false,
                        errMess: "性别未选择",
                    },
                },
                {
                    id: "gdfjZjnx",
                    placeholder: "请输入地址信息",
                    label: "地址 ",
                    type: "text",
                    rules: {
                        name: "location",
                        value: "",
                        verify: false,
                        errMess: "地址不能为空",
                    },
                },
                {
                    id: "asdfdfgd",
                    label: "孩子头像 ",
                    type: "file",
                    accept: 'image',//接受的文件类型，file只支持H5（只有微信小程序才支持把accept配置为all、media）  可选 all | media | image | file | video
                    capture: ['album', 'camera'],// 图片或视频拾取模式，当accept为image类型时设置capture可选额外camera可以直接调起摄像头 String | Array
                    maxCount: 2, //最大选择图片的数量
                    sizeType: ['original', 'compressed'],//original 原图，compressed 压缩图，默认二者都有，H5无效
                    compressed: true,//当accept为video时生效，是否压缩视频，默认为true  Boolean	true	false
                    camera: 'back', //当accept为video时生效，可选值为back或front  	String	back	-
                    multiple: false, //是否开启图片多选，部分安卓机型不支持  false	true
                    maxSize: Number.MAX_VALUE,// 选择单个文件的最大大小，单位B(byte)，默认不限制	String | Number
                    previewImage: true,//是否在上传完成后展示预览图	Boolean	true	false
					disabled:false,//是否禁用
                    rules: {
                        name: "photo",
                        fileList: [],//显示已上传的文件列表  回显   [{url:'https://xxx.cn'}]
                        verify: true,
                        errMess: "请选择头像",
                    },
                },
                {
                    id: "oodsndf",
                    placeholder: "请选择兴趣",
                    label: "兴趣",
                    type: "checkbox",
                    list: [
                        {
                            value: 1,
                            name: "篮球",
			    disabled:true,//是否禁用
                        },
                        {
                            value: 2,
                            name: "足球",
                        },
                        {
                            value: 3,
                            name: "羽毛球",
                        },
                        {
                            value: 4,
                            name: "唱歌",
                        },
                        {
                            value: 5,
                            name: "街舞",
                        },
                        {
                            value: 6,
                            name: "yyds",
                        },
                        {
                            value: 7,
                            name: "跳舞",
                        },
                        {
                            value: 8,
                            name: "看剧",
                        },
                        {
                            value: 9,
                            name: "洗澡",
                        },
                    ],
                    rules: {
                        name: "interest",
                        value: [], //字段值 0 1
                        label: ['看剧'], //填入 list.name回显
                        verify: false,
                        errMess: "请选择年龄段",
                    },
                },
                {
                    id: "koptymk",
                    placeholder: "请输入公司名称",
                    label: "公司",
                    type: "text",
                    rules: {
                        name: "company",
                        value: "",
                        verify: false,
                        errMess: "公司名称不能为空",
                    },
                },
                {
                    id: "asdfgf",
                    placeholder: "(例如：平面设计、品牌设计、UI设计)",
                    label: "是否有设计相关经历？",
                    type: "textarea",
                    rules: {
                        name: "experience",
                        value: "", //字段值
                        verify: true,
                        errMess: "请输入经历",
                    },
                },
            ],
        };
    },
    methods: {
        // 提交表单
        sub() {
            this.$refs.activeForm.$vervify(this.formData); //表单校验 成功会继续往下走 失败抛出异常
            const res = this.$refs.activeForm.$submitForm(this.formData); //校验成功 获取表单值
            console.log('表单对象 :>> ', res);
        },
    },
};
</script>

<style lang="less">
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .subform {
        margin: 30rpx;
        padding: 20rpx 60rpx;
        border-radius: 18rpx;
        background-color: bisque;
    }
}
</style>

```


# 组件参数

### 1.组件props

参数名      | 类型              | 介绍                       |
| -------- | --------------- | ------------------------ |
| formDate | Array           | v-model双向绑定 |
| num      | Boolean 默认false | 每个表单项前面是否带有序号


### 2.form 项参数说明

| 参数名           | 类型            | 是否必填 | 介绍                                                                            |
| ------------- | ------------- | ---- | ----------------------------------------------------------------------------- |
| id            | String number | 是    | 必填索引 不唯一                                                                         |
| placeholder   | String        | 是    | 提示          
| label   | String        | 是    | 开头标题         |
| type          | String        | 是    | 该表单项类型 当前支持 text(文本)、 number、 mobile、code(验证码)、 radio、 checkbox、 file(照片,文件)、 select(上拉选择) |
| list          | Array         | 是    | type为 radio、 checkbox、select时有效  
| list[index].disabled         | Boolean         | 否    | type为 radio、 checkbox、select时有效 
| disabled          | Boolean         | 否    | type为 radio、 checkbox、select时有效  
| rules.errMess | String        | 是    | 校验不通过时的错误提示                                                                   |
| rules.name    | String        | 是    | 接收字段名 后端接收的字段                                                                 |
| rules.value   | String Array      | 否    | 字段值                                                                           |
| rules.label  | String Array       | 是    | 是否校验该字段
| rules.verify  | Boolean       | 否    | 是否校验该字段
| rules.regexp  | String       | 否   | 正侧校验字段
| rules.fileList  | Array       | 是    |type为file时的 文件类型参数


### 3.校验方法

| 事件名                         | 返回参数   | 简介                     |
| --------------------------- | ------ | ---------------------- |
| $vervify(this.formData)     | null   | *表单校验 成功会继续往下走 失败抛出异常* |
| $submitForm(this.formData); | 表单字段对象 | *校验成功 获取表单值*           |

```javascript
<script>
export default {
  methods: {
    //点击提交按钮时触发 提交表单  this.formData为使用者定义的生成表单的js串
    sub() {
      this.$refs.activeForm.$vervify(this.formData); //表单校验 成功会继续往下走 失败抛出异常
      const res = this.$refs.activeForm.$submitForm(this.formData); //校验成功 获取表单值
      console.log('表单对象 :>> ', res);
    },
  },
};
```


### 4.由于小程序props传递函数会丢失（此处无效） 选项回调方法在目录active-form/mixins.js中自定义书写 
```javascript
export default {
    data() {
        return {}
    },
    methods: {
        // 微信小程序获取手机号
        async getphonenumber({detail}) {

        },
        // 获取验证码回调 此处调用api接口 并赋值
        async sendCodeCallback(item) {
            // item.rules.value =
        }
    }
}

```