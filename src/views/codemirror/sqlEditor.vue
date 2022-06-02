<template>
  <div class="in-coder-panel">
    <textarea ref="mycode" v-model="code" class="text_cls"></textarea>
  </div>
</template>

<script>
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
const CodeMirror = require("codemirror/lib/codemirror");
require("codemirror/addon/edit/matchbrackets");
require("codemirror/addon/selection/active-line");
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/sql-hint");
// require("codemirror/addon/hint/anyword-hint");

export default {
  name: "in-coder",
  props: {
    // 外部传入的内容，用于实现双向绑定
    valueC: {
      type: String,
    },
    // 外部传入的语法类型
    language: {
      type: String,
      default: null,
    },
  },
  watch: {
    valueC(newVal) {
      //父组件传过来的值，这个需求需要传入点击的数据库表名，默认展示“SELECT * FROM student”
      this.editor.setValue("SELECT * FROM " + newVal);
    },
  },
  data() {
    return {
      code: "",
      editor: null,
      content: "",
    };
  },
  mounted() {
    // 初始化
    this._initialize();
  },
  methods: {
    //父组件调用清空的方法
    resetData() {
      this.editor.setValue("");
    },
    // 初始化
    _initialize() {
      const mime = "text/x-mysql";
      // let theme = 'ambiance'//设置主题，不设置的会使用默认主题
      this.editor = CodeMirror.fromTextArea(this.$refs.mycode, {
        // 选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
        mode: mime,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        extraKeys: {
          // 触发提示按键
          Ctrl: "autocomplete",
        },
        hintOptions: {
          // hint:
          // 自定义提示选项
          completeSingle: true, // 当匹配只有一项的时候是否自动补全
          tables: {}, // 代码提示,
          // hint: this.handleShowHint,
        },
      });
      this.editor.setValue(this.value || this.code);
      // 支持双向绑定
      this.editor.on("change", (coder) => {
        this.code = coder.getValue();
        if (this.$emit) {
          // 通过监听Input事件可以拿到动态改变的code值
          this.$emit("input", this.code);
        }
      });
      this.editor.on("inputRead", () => {
        this.editor.showHint();
      });
    },
    handleShowHint(cmInstance, hintOptions) {
      const options = this.editor.props.options;

      var WORD = /[\w\`~!@#$%^&*_\-+<>?:|.\/*\\[\]-~!@#￥%%*——\-+|\$]+/,
        RANGE = 500;

      var word = (options && options.word) || WORD;
      var range = (options && options.range) || RANGE;
      var cur = editor.getCursor(),
        curLine = editor.getLine(cur.line);
      var end = cur.ch,
        start = end;
      while (start && word.test(curLine.charAt(start - 1))) --start;
      var curWord = start != end && curLine.slice(start, end);

      var list = (options && options.list) || [],
        seen = {};
      var re = new RegExp(word.source, "g");
      for (var dir = -1; dir <= 1; dir += 2) {
        var line = cur.line,
          endLine =
            Math.min(
              Math.max(line + dir * range, editor.firstLine()),
              editor.lastLine()
            ) + dir;
        for (; line != endLine; line += dir) {
          var text = editor.getLine(line),
            m;
          while ((m = re.exec(text))) {
            if (line == cur.line && m[0] === curWord) continue;
            if (
              (!curWord || m[0].lastIndexOf(curWord, 0) == 0) &&
              !Object.prototype.hasOwnProperty.call(seen, m[0])
            ) {
              seen[m[0]] = true;
              list.push(m[0]);
            }
          }
        }
      }

      return {
        list: list,
        from: cmInstance.Pos(cur.line, start),
        to: cmInstance.Pos(cur.line, end),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.CodeMirror {
  width: 800px !important;
  height: 180px !important;
}
.in-coder-panel {
  border-radius: 5px;
  flex-grow: 1;
  display: flex;
  position: relative;
  width: 800px;
  .text_cls {
  }
  .cm-variable {
    font-size: 18px;
  }
}
.CodeMirror {
  flex-grow: 1;
  z-index: 1;
}
.CodeMirror-code {
  line-height: 19px;
}

.code-mode-select {
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;
  max-width: 130px;
}
</style>
