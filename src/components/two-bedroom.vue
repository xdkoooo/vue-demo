<template>
<div class="two-bedroom">
    <div class="master-bedroom">
        <slot></slot>
    </div>
    <div class="secondary-bedroom">
        <slot name="secondary"></slot>
    </div>
    <div class="toilet">
        <slot name="toilet" v-bind="{ washer: true }"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'twobedroom',
    components: {},
    data() {
        return {}
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
