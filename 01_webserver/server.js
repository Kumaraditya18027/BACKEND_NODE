const http=require("http");
const port=5000
const hostname="127.0.0.1"
 http.createServer((req,res)=>
 {
    res.writeHead(200,{"content-Type": "text/plain"});
    res.end("Hello world");
 }).listen(port,hostname,()=>{
    console.log("Server is running at http://"+hostname+":"+port+"/");
 })