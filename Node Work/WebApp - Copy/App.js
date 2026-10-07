let http = require("http");
let fs = require("fs");
let mCon = require("./mongoConn");

let server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);

  if (req.url === "/") {
    res.write("<HTML>");
    res.write("<Head> <title> My Web App</title> </head>");
    res.write("<body>");
    res.write("<a href='/'> Insert Data </a> || ");
    res.write("<a href='/show-record'> Show Data </a>  ");
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
      'Department Type:  <input type="radio" name="deptType" value="Eng" /> Engineering',
    );
    res.write('<input type="radio" name="deptType" value="Med" /> Madical ');
    res.write(
      '<input type="radio" name="deptType" value="Mgmt" /> Management <br> <br>',
    );
    res.write("<button /> Insert Record </button> <br> <br>");
    res.write("<hr>");

    res.write('</form">');
    res.write("</body>");
    res.write("</HTML>");
    return res.end();
  } else if (req.url === "/submit-record" && req.method === "POST") {
    let bp = [];

    req.on("data", (chunk) => {
      bp.push(chunk);
    });

    req.on("end", () => {
      let fb = Buffer.concat(bp).toString();

      console.log("Form Data:", fb);

      let pm = new URLSearchParams(fb);
      let jd = {};

      for (let [k, v] of pm.entries()) {
        jd[k] = v;
      }

      console.log("Data to Insert:", jd);

      mCon.Insert(jd);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else if (req.url === "/show-record") {
    res.write("<HTML>");
    res.write("<Head> <title> My Web App</title> </head>");
    res.write("<body>");
    res.write("<a href='/'> Insert Data </a> || ");
    res.write("<a href='/show-record'> Show Data </a>  ");

    res.write("<h1> Department Show Record </h1>");
    res.write("<hr>");
    res.write("<table border='1' width='50%'>");

    let resultArray = await mCon.Find();
    console.log("find in app : ");
    console.table(resultArray);
    res.write("<tr>");
    res.write(
      ` <td> Dept ID </td> <td> Dept Name </td> <td> Dept Location </td>`,
    );
    res.write("</tr>");

    resultArray.forEach((data) => {
      res.write("<tr>");
      // res.write(`<td> ${data._id} </td>`);
      res.write(`<td> ${data.deptId} </td>`);
      res.write(`<td> ${data.deptName} </td>`);
      res.write(`<td> ${data.deptLoc} </td>`);
      res.write("</tr>");
    });

    res.write("</table>");

    res.write("</body>");
    res.write("</HTML>");
    return res.end();
  }
});

let port = process.env.port || 2900;
server.listen(port, () => {
  console.log("Server stated at http://localhost:" + port);
});
