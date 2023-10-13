# my-tools

## Project Desc

- 这个项目是私人项目，主要是自己的工具库，组件哭
- 基于 vue 开发，依赖elementUI@2.15.14

## 组件

### 通用弹窗 commonDialog

- params visiable Boolean
- params title String "请输入用户信息"
- params btn Object
  `{
        style: {
          background: 'red',
          color: 'white'
        },
        text: '确定'
}`
- params loading Boolean
- 表单验证通过 @valid="cb"

### 页面初始弹窗 initDialog

- params loading 周五好累，以后完善
- params visiable Boolean
- params mainImg String require('/static/img/200-301.jpg')

- slot title
  `<template slot="title">
少时诵诗书 <span class="blue"> libai</span> 不急网络挣我钱
</template>
`
- slot desc
  `<template slot="desc">
  少时诵诗书 少时诵诗 少时诵诗书 fas fhasuidfh fsaduifh fgdsufs fsd ui
  <span class="blue"> libai</span>
</template>
`
- 表单验证通过 @valid="cb"

## 方法

### checkNumber

```js
- @param {string} type - The type of data to retrieve (options: "phone","whatsapp").
- @param {string} phone_number - The phone number to validate.(example: "15812341929")
- @param {string} country_code - The country code of the phone number. (example: "CN")
- @return {Promise} A promise that resolves to the retrieved data.
```

### getIP

```js
- @return {Promise<string>} The IP address as a string.
```

## 通用数据

### countryData 全球国家代码信息

```js
 {
    english_name: "United Arab Emirates",
    chinese_name: "阿拉伯联合酋长国",
    country_code: "AE",
    phone_code: "971",
  },
```
