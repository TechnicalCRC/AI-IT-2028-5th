let { MongoClient } = require("mongodb");

console.log(MongoClient);

let client = new MongoClient("mongodb://127.0.0.1:27017");

//console.log(client);
let dbConnection = async () => {
  try {
    await client.connect();
    console.log("Connection establish successfully");

    // const db = client.db().admin().listDatabases();
    // console.log(await db);
    // console.table((await db).databases);
    // (await db).databases.forEach((data) => console.log(data.name));

    // const db = client.db('AI&IT').listCollections().toArray();
    // console.table((await db));
    // (await db).forEach(coll => console.log(coll.name));

    // const db = client.db("AI&IT");
    // let result = 
    // await db.collection("employees").find({city: {$ne: 'Noida'}},
    // {projection:{_id:0}}).sort({empName:-1}).toArray();
    // console.table(result);
   
    // result.forEach(data =>
    // { let name = data.empName || 'Name not provided';
    //   console.log(name)
    // })

    const db = client.db("AI&IT"); // use AI&IT
    const department = db.collection("department")
    let result = await department.insertOne({
      deptId: 152,
      deptName: 'CS-AI',
      deptLoc: '2nd Floor, C Block'
    });  

    console.log(result);


  } catch (err) {
    console.log("Error occured....");
  } finally {
    await client.close();
    console.log("Connection closed successfully...");
  }
};

dbConnection();
