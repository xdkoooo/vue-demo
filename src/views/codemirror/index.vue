<template>
  <div class="">
    <sql-editor ref="sqlEditor" @input="input" :valueC="data_value"> </sql-editor>
  </div>
</template>

<script>
import sqlEditor from "./sqlEditor.vue";
export default {
  components: {
    sqlEditor,
  },
  data() {
    return {
      data_value: "test",
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    input(value) {
      // console.log("value", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
