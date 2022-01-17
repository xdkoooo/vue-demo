<template>
<div class="component-code">
    <empty />
</div>
</template>

<script>
import Loading from '../components/loading/index'
import Empty from '../components/empty/empty'

export default {
    name: 'test',
    components: {
        Empty
    },
    data() {
        return {
            visible: false
        }
    },
    created() {
        // const loading = Loading({
        //     text: '加载中。。。'
        // })
        this.$loading({
            text: '加载中2。。。'
        })
        setTimeout(() => {
            this.$loading().close()
        }, 3000)
    },
    mounted() {},
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style lang="scss" scoped>
</style>
