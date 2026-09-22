let http = require('http');

// let req_listener = (req, res)=>{
//     console.log(req);
// }
let count = 0;
let server = http.createServer((req, res)=>{
    console.log(req.url, req.method, req.header);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<HTML>');
    res.write('<head> <title> My server response</title> </head>');
    res.write('<body><h1><u> My Home Page </u></h1>');
    res.write('<h5> My first Page </h5>');
    res.write('<p> My para info</p> </body>');
    res.write('</HTML>');    
    res.end();


    //    console.log("Server responded.... " + ++count);
    // process.exit();

});

let port = process.env.port || 4000;

server.listen(port, ()=>{
    console.log("Server started on http://localhost:" + port);
})