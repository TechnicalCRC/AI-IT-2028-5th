let { MongoClient } = require("mongodb");

console.log(MongoClient);

let client = new MongoClient(
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.9.2",
);

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
    
   const db = client.db('AI&IT');
   let result = await db.collection('employees').findOne();
   console.log(result);

  } catch (err) {
    console.log("Error occured....");
  } finally {
    await client.close();
    console.log("Connection closed successfully...");
  }
};

dbConnection();
