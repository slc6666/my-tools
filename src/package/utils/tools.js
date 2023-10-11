const customFetch = (url, method = "get", data = undefined) => {
  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // 解析JSON响应
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
};
export { customFetch };
