let http = require("http");
let fs = require("fs");

let server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.header);
  res.setHeader("Content-Type", "text/html");
  res.write("<HTML>");
  res.write("<head> <title> My server response</title> </head>");
  res.write("<body>");

  let menu = fs.readFileSync("menu.html");
  res.write(menu);
  
  if (req.url === "/") {
    res.statusCode = 200;
    res.write("<h1><u> My Home Page </u></h1>");
    res.write("<hr>");
    res.write("<h5> My first Page </h5>");
    res.write("<p> My para info</p> </body>");
    res.write("</HTML>");
    res.end();
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.write("<h1><u> About Page </u></h1>");
    res.write("<h5> About Page Info </h5>");
    res.write("<p> My about this website info</p> </body>");
    res.write("</HTML>");
    res.end();
  } else if (req.url.toLowerCase() === "/contact") {
    res.statusCode = 200;
    res.write("<h1><u> Contact Page </u></h1>");
    res.write("<h5> Contact Page Info </h5>");
    res.write(
      "<p> Contact No: 9897865565 <br/> Email Id: web@gmail.com </p> </body>",
    );
    res.write("</HTML>");
    res.end();
  } else {
    res.statusCode = 404;
    res.write(
      "<h1> 404 Error <br> Page not found </h1> <p> requested page not avaialble...",
    );
    res.write("</HTML>");
    res.end();
  }

  //    console.log("Server responded.... " + ++count);
  // process.exit();
});

let port = process.env.port || 4000;

server.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
