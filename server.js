const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
var server = http.createServer(function OnRequest(req, res) {
    //如果頁面是/china且請求方法是GET就傳回china.html頁面
  if (req.url === "/china" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/china.html").pipe(res);
  }
  //如果頁面是主頁面/且請求方法是GET就傳回home.html頁面
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(__dirname + "/home.html").pipe(res);
  } 
  //否則如果是請求方法是GET就收集注冊資料並傳回所有users.json資料
  else if (req.method === "POST") {
    let body = "";//用來存放請求的資料
    //當請求傳入資料時，將資料字串累加成body
    req.on("data", function (chunk) {
      body += chunk.toString();//
    });
    //當請求結束時,解析body資料並將資料寫入users.json檔案再返回用戶所有資料庫資料
    req.on("end", function () {
        user = querystring.parse(body);//解析body資料或以下注解碼方式也可以
      //const params = new URLSearchParams(body);//需以URLSearchParams解析body資料
      //const user = {
        //name: params.get("name"),//提取用戶名稱
        //password: params.get("password"),//提取用戶密碼
      //};
      fs.readFile("users.json", function (err, data) {
        let dataBaseUsers = JSON.parse(data);
        dataBaseUsers.push(user);
        fs.writeFile(
          "users.json",
          JSON.stringify(dataBaseUsers),
          function (err) {
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(dataBaseUsers));
          }
        );
      });
    });
  }
});
server.listen(3000, "0.0.0.0");
console.log("Open at port 3000");
