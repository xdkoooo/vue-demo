<template>
<ul>
    <li v-for="todo in filteredTodos" v-bind:key="todo.id">
        <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
        <slot name="todo" v-bind:todo="todo">
            <!-- 后备内容 -->
            {{ todo.text }}
        </slot>
    </li>
</ul>
</template>

<script>
export default {
    name: 'todolist',
    components: {},
    data() {
        return {
            filteredTodos: [{
                    text: '看电影',
                    isComplete: true
                },
                {
                    text: '学习',
                    isComplete: false
                },
                {
                    text: '玩乐',
                    isComplete: true
                },
                {
                    text: '吃饭',
                    isComplete: true
                }
            ]
        }
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style lang="scss" scoped>
</style>
