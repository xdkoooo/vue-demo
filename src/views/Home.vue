<template>
  <div>
    <!-- <one-bedroom>
        <span>现房一张小床</span>
        <span>电脑桌子ddd</span>
    </one-bedroom> -->
    <two-bedroom>
      <div>
        <span>xxxx放一个大床，要结婚了，嘿嘿嘿</span>
        <span>放一个衣柜，老婆的衣服太多了</span>
        <span>算了，还是放一个电脑桌吧，还要写bug</span>
      </div>

      <div slot="secondary">
        <span>父母要住，放一个硬一点的床，软床对腰不好</span>
        <span>放一个衣柜</span>
      </div>

      <div slot="toilet" slot-scope="washer">
        <span v-if="washer">这里放洗衣机</span>
      </div>

      <!-- <template v-slot:secondary>
            <div>
                <span>父母要住，放一个硬一点的床，软床对腰不好</span>
                <span>放一个衣柜</span>
            </div>
        </template> -->

      <!-- <template v-slot:toilet="scope">
            <span v-if="scope.washer">这里放洗衣机</span>
        </template> -->
    </two-bedroom>

    <name-comps>
      <template v-slot:default="{ user }">
        {{ user.firstName }}
      </template>
    </name-comps>

    <name-comps v-slot:default="slotProps">
      {{ slotProps.user.firstName }}
    </name-comps>

    <todo-list>
      <template v-slot:todo="{ todo }">
        <span v-if="todo.isComplete">✔️</span>
        {{ todo.text }}
      </template>
    </todo-list>

    <custom-form size="small">
      <custom-form-item label="姓名">
        <custom-input v-model="formData.name" @input="textChange" />
      </custom-form-item>
    </custom-form>
  </div>
</template>

<script>
import OneBedroom from "../components/one-bedroom";
import TwoBedroom from "../components/two-bedroom";
import NameComps from "../components/user";
import TodoList from "../components/todolist";

import CustomForm from "../components/custom/custom-form";
import CustomFormItem from "../components/custom/custom-form-item";
import CustomInput from "../components/custom/custom-input";

export default {
  name: "home",
  components: {
    OneBedroom,
    TwoBedroom,
    NameComps,
    TodoList,
    CustomForm,
    CustomFormItem,
    CustomInput,
  },
  data() {
    return {
      formData: {
        name: "",
        age: 0,
      },
    };
  },
  created() {},
  mounted() {},

  pageVisible() {
    console.log("页面显示出来了");
  },
  pageHidden() {
    console.log("页面隐藏了");
  },
  watch: {},
  computed: {},
  methods: {
    textChange(value) {
      console.log("outside:", value);
    },
  },
};
</script>

<style lang="scss" scoped></style>
