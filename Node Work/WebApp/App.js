let http = require("http");
let fs = require("fs");
let bLogic = require("./businessLogic");

let server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.write("<HTML>");
    res.write("<Head> <title> My Web App</title> </head>");
    res.write("<body>");
    res.write("<a href='/'> Insert Department Record</a> || ");
    res.write("<a href='/show-record'> Show Department Record</a>");

    res.write("<h1> Department Insert Record </h1>");
    res.write("<hr>");
    res.write('<form method="POST" action="/submit-record">');
    res.write('Department Id:  <input type="text" name="deptId" /> <br><br>');
    res.write(
      'Department Name:  <input type="text" name="deptName" /> <br><br>',
    );
    res.write(
      'Department Location:  <input type="text" name="deptLoc" /> <br><br>',
    );
    res.write(
      'Department Type:  <input type="radio" name="deptType" value="Engineering" /> Engineering',
    );
    res.write(
      '<input type="radio" name="deptType" value="Medical" /> Medical ',
    );
    res.write(
      '<input type="radio" name="deptType" value="Management" /> Management <br> <br>',
    );
    res.write("<button> Insert Record </button> <br> <br>");
    res.write("<hr>");

    res.write('</form">');
    res.write("</body>");
    res.write("</HTML>");
    return res.end();
  } else if (req.url === "/submit-record" && req.method === "POST") {
    let bodyPart = [];
    req.on("data", (chunk) => {
      //      console.log(chunk);
      bodyPart.push(chunk);
    });

    req.on("end", () => {
      //    console.log(bodyPart);
      let fullBody = Buffer.concat(bodyPart).toString();
      console.log(fullBody);

      let parameters = new URLSearchParams(fullBody);
      console.log(parameters);

      let JSONData = {};

      for (let [key, value] of parameters.entries()) 
        JSONData[key] = value;
      
      console.log(JSONData);

      let jData = JSON.stringify(JSONData);
      console.log(jData);
      fs.writeFileSync("file1.txt", jData.toString());

      bLogic.InsertOne(JSONData);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } 
  else if (req.url === "/show-record") {
    res.write("<HTML>");
    res.write("<Head> <title> My Web App</title> </head>");
    res.write("<body>");
    res.write("<a href='/'> Insert Department Record</a> || ");
    res.write("<a href='/show-record'> Show Department Record</a>");

    res.write("<h1> Department Show Record </h1>");
    res.write("<hr> <hr>");

    // res.write("<h2>Data will show here </h2>");
    res.write("<table border='1' width='80%'>");
    res.write(`<tr> 
                  <th> S. No. </th> 
                  <th> Department Id </th> 
                  <th> Department Name </th> 
                  <th> Department Location </th> 
                  <th> Department Type </th> 
              </tr>`);

    let resultArray = await bLogic.Find();
    let c = 0

    await resultArray.forEach((data) =>{
    res.write(`<tr> 
                 <td style='text-align: center'>  ${++c} </td>
                 <td style='text-align: center'>  ${data.deptId} </td>
                 <td style='text-align: center'>  ${data.deptName} </td>
                 <td>  ${data.deptLoc} </td>
                <td>  ${data.deptType} </td>
            </tr>`);
    });

    res.write("</table>");

    res.write("<hr> <hr>");
    res.write("</body>");
    res.write("</HTML>");
    return res.end();
  }
});

let port = process.env.port || 2900;
server.listen(port, () => {
  console.log("Server stated at http://localhost:" + port);
});
