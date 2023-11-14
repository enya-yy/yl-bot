const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000; // 你可以根据需要更改端口

// 解析 JSON 请求体
app.use(bodyParser.json());

// 处理钉钉机器人消息
app.post("/webhook", (req, res) => {
  const message = req.body.text; // 从请求中获取消息内容

  // 修改为你的钉钉机器人 Webhook 地址
  const webhookUrl =
    "https://oapi.dingtalk.com/robot/send?access_token=YOUR_ACCESS_TOKEN";

  // 发送消息到钉钉机器人
  axios
    .post(webhookUrl, {
      msgtype: "text",
      text: {
        content: message,
      },
    })
    .then((response) => {
      console.log("Message sent successfully:", response.data);
      res.status(200).send("Message sent successfully");
    })
    .catch((error) => {
      console.error("Error sending message to DingTalk:", error.message);
      res.status(500).send("Error sending message to DingTalk");
    });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
