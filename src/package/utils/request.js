import { customFetch } from "./tools";
/**
 * Retrieves data from the specified API endpoint.
 *
 * @param {string} type - The type of data to retrieve (options: "phone","whatsapp").
 * @param {string} phone_number - The phone number to validate.(example: "15812341929")
 * @param {string} country_code - The country code of the phone number. (example: "CN")
 * @return {Promise} A promise that resolves to the retrieved data.
 */
const checkNumber = async (type = "phone", phone_number, country_code) => {
  const url = `https://publicsys.spotoclub.net/api/tool/${type}-validate`;
  return await customFetch(url, "GET", {
    phone_number,
    country_code,
  });
};
/**
 * Retrieves the IP address from the specified URL.
 *
 * @return {Promise<string>} The IP address as a string.
 */
const getIP = async () => {
  const url = "https://publicsys.spotoclub.net/api/tool/getdefaultipinfo";
  return await customFetch(url, "GET");
};
/**
 * Retrieves the active top text from the specified URL.
 *
 * @param {string} [str="active_top_text"] - The name of the active top text.
 * @return {Promise} A promise that resolves to the response of the customFetch function.
 */
const getActiveTopText = async (str = "active_top_text") => {
  const url = "https://www.spotodumps.com/api/appConfig/" + str;
  const response = await customFetch(url, "GET");
  if (str === "active_top_text" && response && response.code === 0) {
    return response.data;
  }
  return response;
};
export default { getIP, checkNumber, getActiveTopText };
