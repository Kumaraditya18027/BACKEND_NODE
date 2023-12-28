const http=require('http');
const url=require('url')
const fs=require('fs')
const path=require('path');
const port=5000;
const hostname="127.0.0.1";

const mimeTypes={
   html:"text/html",
   css:"text/css",
   js:"text/javascript",
   png:"image/png",
   jpeg:"image/jpeg",
   jpg:"image/jpg"
}    
http.createServer((req,res)=>{
    var myuri=url.parse(req.url).pathname;//url.parse helps ot the parse the requeste url form the client side and the .pathname mehtod used to extract the path name form it.// example : https://abc.in/about.html  here about.html is returned by above operation.// Extra URI mean uniform resource Identifier adnt the url is alos a type of URL.
    var filename=path.join(process.cwd(),decodeURIComponent(myuri));// here process.cwd() gives the present working directory and unescape is a method in javaScript which remove all the deleimeter in the filename like % or space or anything else.
    console.log("File is" + filename);
    var loadfile;
    //When file does not get loaded it leads to the crashing of the server so better enclose it in a try catch block, or weuse it as asynchronous operation.
    try{
        loadfile=fs.lstatSync(filename);//It is one of the method to loadfille provided by the fileSystem module in the node.
        if(loadfile && loadfile.isFile())
        {
            var mimeType=mimeTypes[path.extname(filename).split(".").reverse()[0]];   
            
        res.writeHead(200,{'Content-Type': mimeType});
        var filestream=fs.createReadStream(filename);
        filestream.pipe(res);
        }
        else if(loadfile.isDirectory())
    {
        res.writeHead(302,{"Location":"index.html",'Content-Type':'text/html'});//It provides the location of the file in the diretory that is nedde to be send as respose, note writeHead provie the meta data about he response to the client.
        res.end();
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write("5000 Internal Error, Sorry ofr Inconvienence");
        res.end();
    }

    }
    catch(error)
    {
          res.writeHead(404,{'Content-Type':'text/plain'});
          res.write("Status Code 404");
          res.end();
    }
   /* if(loadfile.isFile())
    {
        var mimeType=mimeTypes[path.extname(filename).split(".").reverse()[0]]; /*path.extname(filename): For "index.html," this function would return ".html" because it extracts the extension of the filename.

        .split("."): This would split ".html" into an array with one element: ["", "html"].
        
        .reverse(): Reversing the array results in ["html", ""].
        
        [0]: Retrieving the first element gives us "html."
        
        mimeTypes[...]: Looking up the MIME type for "html" in the mimeTypes object would return "html/text" because the object has a key-value pair for "html" with the corresponding MIME type.
        
        var mimeType = ...;: The obtained MIME type "html/text" is assigned to the variable mimeType.*/
    /*    res.writeHead(200,{'Content-Type': mimeType});
        var filestream=fs.createReadStream(filename);
        filestream.pipe(res);
    }
    else if(loadfile.isDirectory())
    {
        res.writeHead(302,{"Location":"index.html",'Content-Type':'text/html'});//It provides the location of the file in the diretory that is nedde to be send as respose, note writeHead provie the meta data about he response to the client.
        res.end();
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"});
        res.write("5000 Internal Error, Sorry ofr Inconvienence");
        res.end();
    }*/
}).listen(port,hostname,()=>{
    console.log("The server is running on https://"+hostname+":"+port+"/");
});