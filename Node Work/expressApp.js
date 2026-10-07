let express = require("express");
let app = express();
let port = 2700;

app.get('/', (req,res)=>{
    console.log(req.url);
})
app.listen(port, ()=>{
    console.log("Express Server started at http://localhost:" +port);
})