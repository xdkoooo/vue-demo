<template>
<input type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
</template>

<script>
export default {
    name: 'BaseCheckbox',
    components: {},
    data() {
        return {}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
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
