<template>
  <div>
    <button class="button default" @click="handleClick('默认按钮')">
      默认按钮
    </button>
    <button class="button secondary" @click="handleClick('次要按钮')">
      次要按钮
    </button>
    <button class="button success" @click="handleClick('成功按钮')">
      成功按钮
    </button>
    <button class="button warning" @click="handleClick('警告按钮')">
      警告按钮
    </button>
  </div>
</template>

<script>
export default {
  name: "my-btn",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    handleClick(a) {
      console.log(a);
    },
  },
};
</script>
<style scoped lang="scss">
// 定义颜色变量
$default-color: #3498db;
$secondary-color: #e74c3c;
$success-color: #2ecc71;
$warning-color: #f1c40f;
$danger-color: #e74c3c;

// 按钮基础样式
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.default {
    background-color: $default-color;
    color: #ffffff;

    &:hover {
      background-color: darken($default-color, 10%);
    }
  }

  &.secondary {
    background-color: $secondary-color;
    color: #ffffff;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }

  &.success {
    background-color: $success-color;
    color: #ffffff;

    &:hover {
      background-color: darken($success-color, 10%);
    }
  }

  &.warning {
    background-color: $warning-color;
    color: #ffffff;

    &:hover {
      background-color: darken($warning-color, 10%);
    }
  }

  &.danger {
    background-color: $danger-color;
    color: #ffffff;

    &:hover {
      background-color: darken($danger-color, 10%);
    }
  }
}
</style>
