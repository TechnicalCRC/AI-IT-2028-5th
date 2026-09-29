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
    res.write("<button /> Insert Record </button> <br> <br>");
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

      for (let [k, v] of parameters.entries()) JSONData[k] = v;
      console.log(JSONData);

      let jData = JSON.stringify(JSONData);
      console.log(jData);
      fs.writeFileSync("file1.txt", jData.toString());

      bLogic.InsertOne(JSONData);
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (req.url === "/show-record") {
    res.write("<HTML>");
    res.write("<Head> <title> My Web App</title> </head>");
    res.write("<body>");
    res.write("<a href='/'> Insert Department Record</a> || ");
    res.write("<a href='/show-record'> Show Department Record</a>");

    res.write("<h1> Department Show Record </h1>");
    res.write("<hr> <hr>");

    res.write("<h2>Data will show here </h2>");
    res.write("<table border='1' width='50%'>");
    res.write('<th> <td> Department Id </td> <td> Department Name </td> <td> Department Loc </td> <td> Department Type </td> </th>');

    let resultArray = await bLogic.Find();

    await resultArray.forEach(data =>{
    res.write(`<tr> `);
    res.write(` <td>  ${data.deptId} </td>`);
    res.write(` <td>  ${data.deptName} </td>`);
    res.write(`<td>  ${data.deptLoc} </td>`);
    res.write(`<td>  ${data.deptType} </td>`);
    res.write(`</tr>`);
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
