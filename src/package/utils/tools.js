// 通用的 fetch 请求函数
function customFetch(url, method, data = null) {
  const headers = {
    // 可以设置请求头，例如 'Content-Type' 或 'Authorization'
    "Content-Type": "application/json;charset=UTF-8",
  };

  // 如果是 GET 请求，将参数附加到 URL 的查询字符串中
  if (method === "GET" && data) {
    const params = new URLSearchParams(data);
    console.log(params.toString());
    url = `${url}?${params.toString()}`;
    console.log(url);
  }

  const options = {
    method,
    headers,
    // 这里可以根据需要设置其他选项，如身份验证、跨域请求等
  };

  if (method === "POST" && data) {
    options.body = JSON.stringify(data);
  }

  // 发起 fetch 请求
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // 解析响应数据
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export { customFetch };
