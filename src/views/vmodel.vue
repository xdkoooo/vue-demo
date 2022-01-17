<template>
<div class="vmodel">
    <base-checkBox v-model="lovingVue"></base-checkBox>
</div>
</template>

<script>
import BaseCheckBox from '../components/v-model-test/base-checkbox'
export default {
    components: {
        BaseCheckBox
    },
    data() {
        return {
            lovingVue: false
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
