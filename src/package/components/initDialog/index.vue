<template>
  <div class="dialog" v-if="show">
    <div class="content">
      <span class="el-icon-close close" @click="show = false"></span>
      <div class="header">
        <h2>
          <slot name="title"></slot>
        </h2>
        <p>Register on SPOTO Learning and grab the offer</p>
      </div>
      <div class="main">
        <div class="img_wrap">
          <img :src="mainImg" alt="" srcset="" />
        </div>
        <div>
          <p style="text-align: center">
            <slot name="desc"></slot>
          </p>
          <el-form ref="formData" :model="formData" class="form" :rules="rules">
            <el-form-item prop="email" class="email">
              <el-input
                v-model="formData.email"
                placeholder="*Your email"
              ></el-input
            ></el-form-item>

            <el-form-item prop="whatsApp">
              <el-input
                placeholder="*Please enter your Phone/WhatsApp(18250151260)"
                v-model="formData.whatsApp"
              >
              </el-input
            ></el-form-item>
            <el-select v-model="formData.targetExam" class="item">
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in selData"
                :key="index"
              ></el-option>
            </el-select>
            <br />
            <br />
            <el-checkbox v-model="subscribe"
              >Subscribe to SPOTO's marketing news</el-checkbox
            >
            <a @click="submitForm('formData')" v-loading="loading">
              Unlock Your Discount</a
            >
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../../utils/request";
export default {
  name: "initDialog",
  data() {
    return {
      subscribe: false,
      loading: false,
      rules: {
        whatsApp: [
          { required: true, message: "Please fill out", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "Please input the correct email address",
            trigger: ["blur"],
          },
        ],
      },

      formData: {
        email: "",
        whatsApp: "",
        targetExam: "Cisco Certification",
      },
    };
  },
  props: {
    mainImg: {
      type: String,
      required: true,
    },
    visiable: {
      type: Boolean,
      default: false,
      required: true,
    },
    selData: {
      type: Array,
      default: () => [
        "Cisco Certification",
        "F5 Certification",
        "ISACA Certification",
        "CompTIA Certification",
        "Other Network Certification",
      ],
    },
    normalSubmit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    show: {
      get() {
        return this.visiable;
      },
      set(val) {
        this.$emit("update:visiable", val);
      },
    },
  },
  async mounted() {},
  methods: {
    submitForm(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          if (this.normalSubmit) {
            this.loading = true;
            const { ip, country_name } = (await request.getIP()).data;
            this.handleSubmit(ip, country_name);
          } else {
            this.$emit("valid", this.formData);
          }
        }
      });
    },
    /**
     * 方法说明
     * @param {Array} formData 表单数据
     */
    handleSubmit(ip, city) {
      let that = this;
      let url =
        process.env.NODE_ENV === "development"
          ? "http://192.168.170.34:8090"
          : "https://www.spotolearning.com/learningapi";
      fetch(`${url}/api/info/collect/v2/add`, {
        method: "post",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },

        body: JSON.stringify({
          ...that.formData,
          ipAddr: ip,
          collectType: 6,
          ipFrom: city,
          extendField1: window.location.href,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.code == 200) {
            that.$message({
              message: "Submitted successfully",
              type: "success",
              duration: 0,
              showClose: true,
            });
            that.show = false;
          } else {
            that.$message({
              message: res.msg,
              type: "info",
              duration: 0,
              showClose: true,
            });
          }
        })
        .catch(() => {
          that.show = false;
          alert("net error");
        })
        .finally(() => {
          that.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  text-align: left;
}

@media screen and (min-width: 980px) {
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 99;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 980px;
    height: 582px;
    background: #ffffff;
    box-shadow: 0px 18px 55px 0px rgba(32, 70, 128, 0.2);
    border-radius: 9px;
    .close {
      position: absolute;
      right: 24px;
      top: 24px;
      font-size: 36px;
      font-weight: 600;
      color: #999;
      cursor: pointer;
    }
    .header {
      padding: 34px 0;
      text-align: center;
      box-shadow: 0px 9px 27px 0px rgba(23, 0, 63, 0.13);
      h2 {
        font-size: 41px;
        font-weight: bold;
        color: #212121;
        line-height: 44px;
      }
      p {
        margin-top: 12px;
        font-size: 22px;
        font-weight: 400;
        color: #575757;
        line-height: 44px;
      }
    }

    .blue {
      font-style: italic;
      color: #46b847;
    }
  }
  .main {
    padding: 26px 26px 26px 0;
    display: flex;
    gap: 18px;
    .img_wrap {
      width: 375px;
      height: 375px;
      object-fit: contain;
      & + div {
        padding-right: 20px;
        flex: 1;
      }
    }
    p {
      font-size: 20px;
      font-weight: 500;
      color: #212121;
      line-height: 28px;
      padding-bottom: 6px;
    }
    img {
      width: 100%;
    }
  }
  ::v-deep .el-input {
    position: relative;
    &::after {
      display: block;
      position: absolute;
      content: "";
      background-image: url("./img/ic-phone.png");
      background-repeat: no-repeat;
      width: 32px;
      height: 32px;
      background-size: 100%;
      top: 11px;
      left: 12px;
    }
  }
  .email {
    ::v-deep .el-input {
      &::after {
        background-image: url("./img/ic-email.png");
      }
    }
  }
  .item {
    ::v-deep .el-input {
      &::after {
        display: none;
      }
      .el-input__inner {
        padding-left: 24px;
      }
    }
  }

  ::v-deep .el-input__inner {
    padding-left: 48px;
    height: 52px;
    line-height: 52px;
    background: #f9f9fb;
    border: 1px solid #ececec;
    border-radius: 7px;
    color: #212121;
  }
  ::v-deep.el-select {
    width: 100%;
  }
  a {
    margin-top: 18px;
    display: block;
    width: 256px;
    cursor: pointer;
    height: 46px;
    background: #2a4182;
    border: 1px solid #ffffff;
    border-radius: 7px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 46px;
  }
}
@media screen and (max-width: 980px) {
  .dialog {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 2800px;
    background-color: rgba($color: #000000, $alpha: 0.6);
    z-index: 99;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 60px;
    margin: auto;
    width: 90%;
    background: #ffffff;
    box-shadow: 0px 18px 55px 0px rgba(32, 70, 128, 0.2);
    border-radius: 9px;
    .close {
      position: absolute;
      right: 18px;
      top: 12px;
      font-size: 24px;
      font-weight: 600;
      color: #999;
      cursor: pointer;
    }
    .header {
      padding: 32px 0 16px;
      text-align: center;
      box-shadow: 0px 9px 27px 0px rgba(23, 0, 63, 0.13);
      h2 {
        font-size: 24px;
        font-weight: bold;
        padding: 0 15px;
        color: #212121;
        line-height: 36px;
      }
      p {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #575757;
        line-height: 24px;
      }
    }

    .blue {
      font-style: italic;
      color: #46b847;
    }
  }
  .main {
    padding: 26px 15px 26px;
    .img_wrap {
      margin: auto;
      width: 90%;
    }
    p {
      padding: 0 15px;
      font-size: 15px;
      font-weight: 500;
      color: #212121;
      line-height: 24px;
    }
    img {
      width: 100%;
    }
  }
  ::v-deep .el-input {
    position: relative;
    &::after {
      display: block;
      position: absolute;
      content: "";
      background-image: url("./img/ic-phone.png");
      background-repeat: no-repeat;
      width: 20px;
      height: 20px;
      background-size: 20px;
      top: 11px;
      left: 12px;
    }
  }
  .email {
    ::v-deep .el-input {
      &::after {
        background-image: url("./img/ic-email.png");
      }
    }
  }
  .item {
    ::v-deep .el-input {
      &::after {
        display: none;
      }
      .el-input__inner {
        padding-left: 24px;
      }
    }
  }

  ::v-deep .el-input__inner {
    padding-left: 38px;
    height: 40px;
    line-height: 40px;
    background: #f9f9fb;
    border: 1px solid #ececec;
    border-radius: 7px;
    color: #212121;
  }
  ::v-deep.el-select {
    width: 100%;
  }
  a {
    margin-top: 18px;
    display: block;
    width: 256px;
    cursor: pointer;
    height: 40px;
    background: #2a4182;
    border: 1px solid #ffffff;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
}
</style>
