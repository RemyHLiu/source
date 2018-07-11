const fs = require("fs");
const path = require("path");
const marked = require("marked");

const filepath= path.join(__dirname, process.argv[2]);

const template = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
</head>
<body>
    <div>{{{content}}}</div>
</body>
</html>`

fs.watchFile(filePath, (cur, pre) => {//options: 监听失效等
    if(cur.mtime !== pre.mtime) {

        //读取文件并转换写入
        fs.readFile(filePath, "utf8", (err,data) => {
            if（err） {console.log(err);return;}
            let html =  marked(data);

            //因为md文件转换成HTML 没有body等标签，需替换添加
            template = html.replace("{{{content}}}", html)；

            //写入html
            fs.writeFile(path.join(__dirname, "watch.html"), template, "utf8");
        })
    }
})
