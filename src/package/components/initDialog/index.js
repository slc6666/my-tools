import initDialog from "./index.vue";
/* istanbul ignore next */
initDialog.install = function (Vue) {
  Vue.component(initDialog.name, initDialog);
};

export default initDialog;
