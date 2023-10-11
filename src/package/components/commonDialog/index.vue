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
    show: {},
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      downloadUrl: "",
      dialogFormVisible: true,
      form: {
        whatsApp: "",
        country: "",
        email: "",
        username: "",
      },
      groupLink: "FeGHfFS7zwu3WI0YdjHRSz",

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
  computed: {},
  mounted() {},
  methods: {
    fetchData() {
      const url =
        "https://www.spotolearning.com/learningapi/api/info/collect/add";
      fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          ...this.form,
          extendField1: window.location.href,
          collectType: this.collectType,
          ipFrom: this.form.country,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.code == 200) {
            if (!this.needDown) {
              this.$emit("callBack");
              this.dialogFormVisible = false;
              this.$message.success("Submitted successfully");
              return;
            }
            this.$message({
              dangerouslyUseHTMLString: true,
              duration: 0,
              showClose: true,
              message: `Download Successful! <a style="color:#2a4182" href="https://chat.whatsapp.com/${this.groupLink}" target="_blank">Join WhatsApp study Group.</a>`,
              type: "success",
            });
            this.dialogFormVisible = false;
            localStorage.setItem("freeResourcesDown", true);
            window.open(
              `https://www.spotoexam.com/api/common/download/${this.downloadUrl}.pdf`,
              "_self"
            );
          } else {
            this.$message({
              dangerouslyUseHTMLString: true,
              duration: 0,
              showClose: true,
              message: res.msg,
              type: "warning",
            });
          }
        })
        .finally(() => {});
    },
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
</style>
