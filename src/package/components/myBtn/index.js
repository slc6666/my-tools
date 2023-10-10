import myBtn from "./index.vue";
/* istanbul ignore next */
myBtn.install = function (Vue) {
  Vue.component(myBtn.name, myBtn);
};

export default myBtn;
