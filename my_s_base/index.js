const username = ''; // web访问的用户名
const password = ''; // web访问的密码
const port = ''; // web访问的端口
const UUID = '';
const ARGO_AUTH = '';
const SSH_USER = '';
const express = require("express");
const fs = require('fs');
const app = express();
var exec = require("child_process").exec;
const { createProxyMiddleware } = require("http-proxy-middleware");
const auth = require("basic-auth");

app.get("/", function (req, res) {
  res.send("hello world");
});

// 设置路由
app.get(`/${UUID}/node`, (req, res) => {
    fs.readFile(`/home/${SSH_USER}/s-c-f-serv00/list`, 'utf8', (err, data) => {
        if (err) {
            // 如果读取过程中发生错误，返回500状态码和错误消息
            return res.status(500).send('Error reading file.');
        }
        // 如果没有错误，将文件内容作为响应发送给客户端
        res.send(data);
    });
});

// 页面访问密码
app.use((req, res, next) => {
  const user = auth(req);
  if (user && user.name === username && user.pass === password) {
    return next();
  }
  res.set("WWW-Authenticate", 'Basic realm="Node"');
  return res.status(401).send();
});

app.get("/status", function (req, res) {
  let cmdStr =
    "ps -aux";
  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("<pre>命令行执行错误：\n" + err + "</pre>");
    } else {
      res.type("html").send("<pre>获取系统进程表：\n" + stdout + "</pre>");
    }
  });
});

//获取节点数据
app.get("/list", async function (req, res) {
  let cmdStr = `cat /home/${SSH_USER}/s-c-f-serv00/list`;
  const sub = UUID;

  const fileExists = (path) => {
    return new Promise((resolve, reject) => {
      fs.access(path, fs.constants.F_OK, (err) => {
        resolve(!err);
      });
    });
  };

  const waitForFile = async (path, retries, interval) => {
    for (let i = 0; i < retries; i++) {
      if (await fileExists(path)) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    return false;
  };

  const fileReady = await waitForFile('list', 30, 1000);

  if (!fileReady) {
    res.type("html").send("<pre>文件未生成</pre>");
    return;
  }

  exec(cmdStr, function (err, stdout, stderr) {
    if (err) {
      res.type("html").send("<pre>命令行执行错误：\n" + err + "</pre>");
    } else {
      const fullUrl = `${req.protocol}://${req.get('host')}/${sub}/node`;
      res.type("html").send("<pre>订阅地址：" + fullUrl + "\n\n节点数据：\n\n" + stdout + "</pre>");
    }
  });
});
  
// keepalive begin
//singbox保活
function keep_web_alive() {
  exec("pgrep -laf sing-box-freebsd", function (err, stdout, stderr) {
    // 1.查后台系统进程，保持唤醒
    if (stdout.includes("sing-box-freebsd")) {
      console.log("sing-box 正在运行");
    } else {
      //singbox 未运行，命令行调起
      console.log("singbox 未运行，命令行调起try...");
      exec(
        `/home/${SSH_USER}/s-c-f-serv00/sing-box-freebsd run -c /home/${SSH_USER}/s-c-f-serv00/config.json`,
        function (err, stdout, stderr) {
          if (err) {
            console.log("保活-调起sing-box-命令行执行错误:" + err);
          } else {
            console.log("保活-调起sing-box-命令行执行成功!");
          }
        }
      );
    }
  });
}

//Argo保活
function keep_argo_alive() {
  exec("pgrep -laf cloudflared-freebsd", function (err, stdout, stderr) {
    // 1.查后台系统进程，保持唤醒
    if (stdout.includes("cloudflared-freebsd tunnel")) {
      console.log("Argo 正在运行");
    } else {
      //Argo 未运行，命令行调起
      console.log("Argo 未运行，命令行调起try...");
      exec(`/home/${SSH_USER}/s-c-f-serv00/cloudflared-freebsd tunnel --edge-ip-version auto --protocol http2 run --token ${ARGO_AUTH}`, function (err, stdout, stderr) {
        if (err) {
          console.log("保活-调起Argo-命令行执行错误:" + err);
        } else {
          console.log("保活-调起Argo-命令行执行成功!");
        }
      });
    }
  });
}

app.get("/alive", async function (req, res) {
  keep_web_alive();
  keep_argo_alive();
  res.type("html").send("<pre>已调用保活方法</pre>");
});

keep_web_alive();
keep_argo_alive();

app.use(
  "/",
  createProxyMiddleware({
    changeOrigin: true, // 默认false，是否需要改变原始主机头为目标URL
    onProxyReq: function onProxyReq(proxyReq, req, res) {},
    pathRewrite: {
      // 请求中去除/
      "^/": "/",
    },
    target: "http://127.0.0.1/", // 需要跨域处理的请求地址
    ws: true, // 是否代理websockets
  })
);


app.listen(port, () => console.log(`Example app listening on port ${port}`));