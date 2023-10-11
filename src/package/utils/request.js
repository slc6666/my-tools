import { customFetch } from "./tools";
const checkWhatsApp = async (whatsApp, country) => {
  const url = `https://publicsys.spotoclub.net/api/tool/whatsapp-validate/${whatsApp}/${country}`;
  return await customFetch(url, "get");
};
const getIP = async () => {
  const url = "https://publicsys.spotoclub.net/api/tool/getdefaultipinfo";
  return await customFetch(url, "get");
};
export { checkWhatsApp, getIP };
