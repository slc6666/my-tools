import commonDialog from "./index.vue";
/* istanbul ignore next */
commonDialog.install = function (Vue) {
  Vue.component(commonDialog.name, commonDialog);
};

export default commonDialog;
