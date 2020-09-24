<template>
<div class="share-btn" @click="confirm">确定</div>
</template>

<script>
export default {
    name: 'empty',
    components: {},
    data() {
        return {}
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {
        confirm() {
            this.$emit('input', false)
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
