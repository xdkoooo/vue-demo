<template>
  <div class="">
    <editor
      ref="editor"
      v-model="content"
      @init="editorInit"
      lang="sql"
      theme="eclipse"
      width="800"
      height="500"
    ></editor>
  </div>
</template>

<script>
export default {
  components: {
    editor: require("vue2-ace-editor"),
  },
  data() {
    return {
      content: "select * from table_1",
    };
  },
  created() {},
  mounted() {
    console.log("xxxx----");

    console.log(this.$refs["editor"]);

    this.$refs["editor"].editor.setOptions({
      enableSnippets: true,
      enableLiveAutocompletion: true,
      enableBasicAutocompletion: true,
    });
  },
  watch: {},
  computed: {},
  methods: {
    editorInit: function () {
      console.log("init...");
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/sql");
      // require("brace/mode/javascript"); //language
      // require("brace/mode/less");
      require("brace/theme/eclipse");
      require("brace/snippets/sql"); //snippet
    },
  },
};
</script>

<style lang="scss" scoped></style>
