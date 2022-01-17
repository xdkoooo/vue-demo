<template>
<!--此处示例使用了element-ui-->
<div>
    <div>
        <span>搜索</span>
        <input v-model="searchValue" />
    </div>
    <!--列表，代码省略-->
    <div style="margin-top: 20px">
        <button ref="btn" @click="changeValue" id="firstBtn">{{msg}}</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            searchValue: '',
            formData: {
                name: '',
                age: 0,
            },
            msg: '原始值'
        }
    },
    watch: {
        // 在值发生变化之后，重新加载数据
        // searchValue(newValue, oldValue) {
        //     if (newValue !== oldValue) {
        //         this.$_loadData()
        //     }
        // },
        searchValue: {
            handler(newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.$_loadData()
                }
            },
            immediate: true
        },
        formData: {
            handler(newValue, oldValue) {},
            deep: true
        }

    },
    methods: {
        changeValue() {
            console.log('changeValue--this:', this);
            this.msg = "修改后的值"
            // console.log(this.$refs.btn.innerText);

            this.$nextTick(() => {
                console.log('callback--this:', this);
                console.log(this.$refs.btn.innerText);
            })
        },
        $_loadData() {
            // 测试防抖函数
            console.log('重新加载数据，此处需要通过函数防抖');
            // 重新加载数据，此处需要通过函数防抖

            setTimeout(() => {
                // 先赋值
                this.formData = {
                    name: '子君',
                    age: 18
                }
                // 等表单数据回填之后，监听数据是否发生变化
                const unwatch = this.$watch(
                    'formData',
                    () => {
                        console.log('数据发生了变化')
                    }, {
                        deep: true
                    }
                )
                // 模拟数据发生了变化
                setTimeout(() => {
                    this.formData.name = '张三'
                }, 1000)
            }, 1000)
        }
    }
}
</script>
