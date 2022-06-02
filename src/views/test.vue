<template>
  <div class="component-code">
    <empty />

    <ace></ace>

    <vue-editor></vue-editor>
  </div>
</template>

<script>
import Loading from "../components/loading/index";
import Empty from "../components/empty/empty";

import vueEditor from "./aceeditor/index2.vue";

export default {
  name: "test",
  components: {
    Empty,
    vueEditor,
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {
    // const loading = Loading({
    //     text: '加载中。。。'
    // })
    this.$loading({
      text: "加载中2。。。",
    });
    setTimeout(() => {
      this.$loading().close();
    }, 3000);
  },
  mounted() {},
  watch: {},
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
