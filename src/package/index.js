import myBtn from "./components/myBtn/index";
import commonDialog from "./components/commonDialog/index";
import { checkWhatsApp, getIP } from "./utils/request";
const tools = {
  checkWhatsApp,
  getIP,
};
export { myBtn, commonDialog, tools };
