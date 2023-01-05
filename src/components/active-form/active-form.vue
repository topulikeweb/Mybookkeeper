<template>
    <view class="active-form form-container">
        <view class="form-box">
            <block v-for="(item, index) in formData" :key="item.rules.name">
                <view class="form-item flex-row--c">
                    <!-- 单行文本框 -->
                    <view
                        class="line"
                        v-if="
                     item.type === 'text' ||
                     item.type === 'number' ||
                     item.type === 'code'
                     "
                    >
                        <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                        </view>
                        <!-- 发送验证码 -->
                        <view
                            class="line-right flex-row-sb-c pr20"
                            v-if="item.type == 'code'"
                        >
                            <input
                                type="text"
                                class="input"
								:disabled="item.disabled"
                                placeholder-class="plaClass"
                                :placeholder="item.placeholder"
                                v-model="item.rules.value"
                                @input="inputVal(index)"
                            />
                            <view style="width:250rpx">
                                <u-button
                                    size="mini"
                                    type="primary"
                                    :disabled="item.disabled||isSend"
                                    @click="sendCode(item)"
                                >
                                    {{ codeFont }}
                                </u-button>
                            </view>
                        </view>
                        <!-- 普通输入框 -->
                        <view class="line-right" v-else>
                            <input
                                type="text"
                                class="input"
								:disabled="item.disabled"
                                placeholder-class="plaClass"
                                :placeholder="item.placeholder"
                                v-model="item.rules.value"
                                @input="inputVal(index)"
                            />
                        </view>
                    </view>
                    <!-- 下拉选择-->
                    <view class="line" v-else-if="item.type == 'select'">
                        <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                        </view>
                        <view class="line-right pr20">
                            <input
                                disabled
                                type="text"
                                class="input"
                                placeholder-class="plaClass"
                                :placeholder="item.placeholder"
                                v-model="item.rules.label"
								:disabled="item.disabled"
                                @click="showSelect(item)"
                            />
                            <view class="select-icon"></view>
                            <u-action-sheet :actions="item.list" :title="item.title"
                                            safeAreaInsetBottom
                                            round="40"
                                            cancelText="取消"
                                            :show="item.show"
                                            @select="selectConfirm($event,item)"
                                            @close="selectClose(item)"
                            ></u-action-sheet>
                        </view>
                    </view>


                    <!-- 多行文本框 -->
                    <view class="textarea-box" v-else-if="item.type == 'textarea'">
                        <view :class="item.rules.verify ? '' : 'p-l14 '">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                        </view>
                        <view class="line-bottom-textarea">
                            <!-- placeholder-class="plaClass" -->
                            <textarea
                                style="color: #a7a7a7; font-size: 24rpx"
                                auto-height
                                :maxlength="-1"
								:disabled="item.disabled"
                                :placeholder="item.placeholder"
                                v-model="item.rules.value"
                                @input="inputVal(index)"
                            >
                            </textarea>
                        </view>
                    </view>
                    <!-- 上传图片 -->
                    <view class="img-box pt30 flex-col-l" v-else-if="item.type == 'file'">
                        <view class="font26" :class="item.rules.verify ? '' : 'p-l14 '">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                        </view>
                        <view class="img-upload p30">
                            <u-upload
                                :fileList="item.rules.fileList"
                                :disabled="item.disabled"
								
                                :accept="item.accept"
                                :capture="item.capture"
                                :maxCount="item.maxCount"
                                :sizeType="item.sizeType"
                                :compressed="item.compressed"
                                :camera="item.camera"
                                :multiple="item.multiple"
                                :maxSize="item.maxSize"
                                :previewImage="item.previewImage"

                                width="150rpx"
                                height="150rpx"

                                @afterRead="afterRead($event,item)"
                                @delete="deletePic($event,item)"
                            ></u-upload>
                        </view>
                    </view>

                    <!-- 单选框 -->
                    <view class="line-col" v-else-if="item.type === 'radio'">
                        <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                            <text
                                style="
                            font-size: 20rpx;
                            color: #9e9e9e;
                            margin-left: 23rpx;
                            width: 140rpx;
                            "
                            >(单选)
                            </text>
                        </view>
                        <view
                            class="line-bottom-select"
                            :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
                        >
                            <u-radio-group
                                v-model="formData[index].rules.value"
                                @change="radioChange($event, index)"
                                placement="row"
                            >
                                <u-radio
                                    size="35rpx"
                                    icon-size="35rpx"
                                    label-size="25rpx"
                                    shape="circle"
                                    v-for="(radioItem, radioIndex) in item.list"
                                    :key="radioIndex"
                                    :label="radioItem.label"
                                    :name="radioItem.value"
                                    :disabled="radioItem.disabled"
                                >{{ radioItem.label }}
                                </u-radio>
                            </u-radio-group>
                        </view>
                    </view>
                    <!-- 多选框 -->
                    <view class="line-col" v-else-if="item.type == 'checkbox'">
                        <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                            <text
                                style="
                             font-size: 20rpx;
                             color: #9e9e9e;
                             margin-left: 23rpx;
                             width: 140rpx;
                             "
                            >(多选)
                            </text>
                        </view>
                        <view
                            class="line-bottom-select pr20"
                            :style="{ 'padding-left': num ? '60rpx' : '34rpx' }"
                        >
                            <u-checkbox-group
                                v-model="item.rules.label"
                                @change="checkboxGroupChange($event,item)"
                            >
                                <u-checkbox
                                    icon-size="25rpx"
                                    label-size="25rpx"
                                    size="30rpx"
                                    v-for="(checkboxItem, checkboxIndex) in item.list"
                                    :key="checkboxIndex"
                                    :label="checkboxItem.name"
									:disabled="checkboxItem.disabled"
                                    :name="checkboxItem.name"
                                >
                                </u-checkbox>
                            </u-checkbox-group>
                        </view>
                    </view>

                    <!-- 手机输入框 -->
                    <view class="line" v-else-if="item.type == 'mobile'">
                        <view :class="item.rules.verify ? 'line-left' : 'p-l14 line-left'">
                            <text class="colorRed" v-if="item.rules.verify">*</text>
                            <text class="num" v-if="num">{{ index + 1 }}.</text>
                            {{ item.label }}
                        </view>
                        <view class="line-right pr20">
                            <input
                                type="number"
                                v-model="formData[index].rules.value"
                                :placeholder="item.placeholder"
                                @input="inputVal(index)"
                                class="input"
								:disabled="item.disabled"
                                :maxlength="11"
                                placeholder-class="plaClass"
                            />
                            <view style="width:200rpx" v-if="item.oneKeyPhone">
                                <u-button
                                    size="mini"
                                    type="primary"
                                    open-type="getPhoneNumber"
                                    @getphonenumber="getphonenumber"
									:disabled="item.disabled"
                                >一键获取
                                </u-button>
                            </view>

                        </view>
                    </view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
import mixins from "./mixins";

export default {
    name: "activeForm",
    mixins: [mixins],
    props: {
        //是否展示序号
        num: {
            type: Boolean,
            default: false,
        },
        value: {
            type: Array,
            default: () => {
                return [];
            },
        },
        //是否编辑表单
        isEdit: {
            type: Boolean,
            default: false,
        },
        //是否能删除
        isDel: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            submitData: "",
            selectBox: [],
            currentSelectIndex: "",
            currentSelectValue: "",
            codeFont: "获取验证码",
            wait: 60,
            isSend: false,
        };
    },
    computed: {
        formData: {
            get() {
                // console.log("this.formData", this.value)
                return this.value
            },
            set(nval) {
                this.$emit("input", nval);
            }
        }
    },
    methods: {
        // 删除图片
        deletePic($event, item) {
            item.rules.fileList.splice($event.index, 1)
            this.$emit('input', this.formData)
        },
        // 新增图片
        afterRead($event, item) {
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            item.rules.fileList = item.multiple ? $event.file : [$event.file]
            this.$emit('input', this.formData)
        },
        //显示select
        showSelect(item) {
            item.show = true;
            this.$emit('input', this.formData)
        },
        //input输入框的值传给父组件
        inputVal(index) {
            const data = {
                val: this.formData[index].rules.value,
                index: index,
            };
            if (String(data.val) != "" && String(data.index) != "") {
                this.formData[data.index].rules.value = data.val;
            }
            this.$emit("input", this.formData);
        },
        // 单选 下拉框点击确定
        selectConfirm($event, item) {
            item.rules.label = $event.name;
            item.rules.value = $event.value;
            item.show = false
            this.$emit("input", this.formData);
        },
        selectClose(item) {
            item.show = false;
        },
        //单选 点击触发
        radioChange($event, index) {
            this.$emit("input", this.formData);
        },
        //复选框 点击触发
        checkboxGroupChange($event, item) {
            // console.log("$event", $event)
            const selectArr = item.list.filter((v => ($event.includes(v.name)))) //过滤
            // console.log("selectArr", selectArr)
            item.rules.value = selectArr.map(v => (v.value))
            this.$emit("input", this.formData);
        },

        // 发送验证码
        sendCode(item) {
            let setTime = 0;
            this.sendCodeCallback(item)
            if (!this.isSend) {
                this.isSend = true;
                setTime = setInterval(() => {
                    this.wait--;

                    this.codeFont = this.wait + "重新发送";
                    if (this.wait == 0) {
                        clearInterval(setTime);
                        this.codeFont = "获取验证码";
                        this.isSend = false;
                        this.wait = 60;

                    }
                }, 1000);
            }
        },
        //校验
        $vervify() {
            this.formData.forEach((item) => {
                if (item.rules.verify) {
                    switch (item.type) {
                        case "checkbox":
                            if (item.rules.value.length == 0) {
                                uni.showToast({
                                    title: item.rules.errMess || "请选择" + item.label,
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            break;
                        case "file":
                            if (item.rules.fileList.length == 0) {
                                uni.showToast({
                                    title: item.rules.errMess || "请选择" + item.label,
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            break;
                        case "mobile":
                            if (!item.rules.value) {
                                uni.showToast({
                                    title: "手机号不能为空",
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            if (!/^\s{0}$|^1\d{10}$/.test(item.rules.value)) {
                                uni.showToast({
                                    title: "手机格式错误",
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            break;
                        default:
                            if (!item.rules.value) {
                                uni.showToast({
                                    title: item.rules.errMess || item.label + "不能为空",
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            if (item.rules.regexp && !(new RegExp(item.rules.regexp).test(item.rules.value))) {
                                uni.showToast({
                                    title: item.label + "格式不正确",
                                    duration: 2000,
                                    icon: "none",
                                });

                                throw Error(); //终止函数
                            }
                            break;
                    }
                }
            });
        },
        // 提交序列化的表单
        $submitForm() {
            const formData = this.formData
            console.log("formData :>> ", formData);
            let submitData = {};
            for (let i = 0; i < formData.length; i++) {
                if (formData[i].type === 'file') {
                    submitData[formData[i].rules.name] = formData[i].rules.fileList;
                    break;
                }
                submitData[formData[i].rules.name] = formData[i].rules.value;

            }
            return submitData;
        }
    },
};
</script>

<style lang="scss" scoped>
.active-form {
    min-height: 200px;

    .plaClass {
        text-align: right;
        font-size: 26rpx;
    }

    // 下拉icon
    .select-icon {
        float: right;
        border-bottom: 2rpx solid #999;
        border-right: 2rpx solid #999;
        width: 16rpx;
        height: 16rpx;
        transform: rotate(-45deg);
        margin-right: 10rpx;
    }

    .form-box {
        width: 100%;
        box-sizing: border-box;
    }

    .colorRed {
        color: red;
        padding: 0 10rpx;
    }

    .line-right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }

    .line-bottom-select {
        padding-top: 40rpx;
    }

    .line-bottom-textarea {
        padding-top: 20rpx;

        textarea {
            min-height: 100rpx;
        }
    }

    .line-left {
        display: flex;
        min-width: 22%;
        align-items: center;
        height: 100%;
        letter-spacing: 0.5px;
        font-size: 26rpx;
        color: #000000;
        box-sizing: border-box;
    }

    .p-l14 {
        padding-left: 34rpx;
    }

    .textarea-box {
        width: 100%;
        border-bottom: 1px solid #ededed;
        padding-top: 20rpx;
        font-size: 26rpx;

        textarea {
            padding-left: 32rpx;
            height: 100rpx;
            font-size: 25rpx;
            color: #333;
        }
    }

    .line {
        padding: 27rpx 0;
        display: flex;
        align-items: center;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ededed;
        overflow: hidden;

        .input {
            padding-right: 20rpx;
            height: 100%;
            width: 100%;
            text-align: left;
            font-size: 28rpx;
            color: #333;
            border: none;
            overflow: hidden;
            text-overflow: ellipsis;
            outline: none;
        }
    }

    .line-col {
        padding: 27rpx 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid #ededed;
        overflow: hidden;

        .input {
            padding-right: 20rpx;
            height: 100%;
            width: 100%;
            text-align: left;
            font-size: 28rpx;
            color: #333;
            border: none;
            overflow: hidden;
            text-overflow: ellipsis;
            outline: none;
        }
    }

    .num {
        margin-right: 8rpx;
    }
}
</style>
