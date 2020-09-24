<template>
<transition name="custom-loading-fade">
    <div v-show="visible" class="custom-loading-mask">
        <div class="custom-loading-spinner">
            <i class="custom-spinner-icon"></i>
            <p class="custom-loading-text">{{ text }}</p>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'loading',
    components: {},
    data() {
        return {
            text: '',
            visible: false
        }
    },
    props: {},
    created() {},
    mounted() {},
    watch: {},
    computed: {},
    methods: {},
}
</script>

<style lang="scss" scoped>
</style>
