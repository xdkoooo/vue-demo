<template>
<div class="custom-input" :class="[
      `custom-input--${getSize}`,
      getDisabled && `custom-input--disabled`
    ]">
    <input class="custom-input__input" :value="value" @input="$_handleChange" />
</div>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
    props: {
        // 这里用了自定义v-model
        value: {
            type: String,
            require: {},
            default: ''
        },
        size: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    },
    // 通过inject 将form组件注入的实例添加进来
    // inject: ['customForm'],
    inject: {
        parentForm: {
            from: 'customForm',
            default: () => ({
                size: 'default'
            })
        }
    },
    computed: {
        // 通过计算组件获取组件的size, 如果当前组件传入，则使用当前组件的，否则是否form组件的
        getSize() {
            return this.size || this.customForm.size
        },
        // 组件是否禁用
        getDisabled() {
            const {
                disabled
            } = this
            if (disabled !== undefined) {
                return disabled
            }
            return this.customForm.disabled
        }
    },
    methods: {
        // 自定义v-model
        $_handleChange(e) {
            this.$emit('input', e.target.value)
        }
    }
}
</script>
