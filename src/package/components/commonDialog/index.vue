<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Username" prop="username">
        <el-input
          v-model="form.username"
          autocomplete="off"
          placeholder="Username"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email Address" prop="email">
        <el-input
          v-model="form.email"
          autocomplete="off"
          placeholder="Email Address"
        ></el-input>
      </el-form-item>
      <el-form-item label="Country" prop="country">
        <el-select
          v-model="form.country"
          filterable
          placeholder="Please Choose"
        >
          <el-option
            :value="item.country_code"
            v-for="(item, i) in countryData"
            :label="item.english_name"
            :key="i"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Contact Number" prop="whatsApp">
        <el-input
          v-model="form.whatsApp"
          autocomplete="off"
          placeholder="Example: 18250151260"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        :style="btn.style"
        @click="handleSubmit"
        :loading="loading"
      >
        {{ btn.text }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import countryData from "../../utils/countryData";
export default {
  name: "commonDialog",
  components: {},
  props: {
    title: {
      type: String,
      default: "Request a Brochure",
    },
    btn: {
      type: Object,
      default: () => {
        return {
          style: {},
          text: "Submit",
        };
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    visiable: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  data() {
    return {
      downloadUrl: "",
      form: {
        whatsApp: "",
        country: "",
        email: "",
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "Please Enter", trigger: "blur" },
        ],
        whatsApp: [
          { required: true, message: "Please Enter", trigger: "blur" },
        ],
        country: [
          { required: true, message: "Please Select", trigger: "blur" },
        ],
        email: [
          { required: true, message: "Please Enter", trigger: "blur" },
          {
            type: "email",
            message: "Please input the correct email address",
            trigger: ["blur"],
          },
        ],
      },
      countryData,
    };
  },
  computed: {
    dialogFormVisible: {
      get() {
        return this.visiable;
      },
      set(val) {
        this.$emit("update:visiable", val);
      },
    },
  },
  mounted() {},
  methods: {
    handleSubmit() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$emit("valid", {
            countryMsg: this.countryData.find(
              (item) => item.country_code === this.form.country
            ),
            ...this.form,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 960px) {
  ::v-deep .el-dialog {
    border-radius: 9px;
  }
  ::v-deep .el-form-item {
    position: relative;
  }
  .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    &::before {
      display: none;
    }
    line-height: 12px;
    position: absolute;
    padding: 0;
    background-color: #ffffff;
    left: 12px;
    top: -6px;
    padding: 0 6px;
    font-size: 12px;
    z-index: 2;
    font-weight: bold;
    color: #2a4182;
  }
  ::v-deep .el-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    & > div {
      width: 46%;
    }
  }
  ::v-deep .el-dialog__title {
    font-size: 22px;
    font-weight: bold;
    color: #212121;
  }
}
@media screen and (max-width: 960px) {
  ::v-deep .el-dialog {
    border-radius: 9px;
    width: 90%;
  }
  ::v-deep .el-form-item {
    position: relative;
  }
  .el-select {
    width: 100%;
  }
  ::v-deep .el-form-item__label {
    &::before {
      display: none;
    }
    line-height: 12px;
    position: absolute;
    padding: 0;
    background-color: #ffffff;
    left: 12px;
    top: -6px;
    padding: 0 6px;
    font-size: 12px;
    z-index: 2;
    font-weight: bold;
    color: #2a4182;
  }

  ::v-deep .el-dialog__title {
    font-size: 22px;
    font-weight: bold;
    color: #212121;
  }
}
</style>
