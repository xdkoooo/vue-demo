<template>
<span>
    <slot v-bind:user="user">
        {{ user.lastName }}
    </slot>
</span>
</template>

<script>
export default {
    name: 'namecomps',
    components: {},
    data() {
        return {
            user: {
                firstName: 'xu',
                lastName: 'kuankuo'
            }
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
