let { MongoClient } = require("mongodb");

let client = new MongoClient("mongodb://localhost:27017");

let mInsert = async (str) => {
  try {
    await client.connect();
    console.log("con success..");

    let db = await client.db("AI&IT");
    let res = await db.collection("department").insertOne(str);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("con close..");
  }
};

let mFind = async () => {
  let res = "";
  try {
    await client.connect();
    console.log("con success..");

    let db = await client.db("AI&IT");
    let res = await db.collection("department").find().toArray();
    // console.log("find in mcon: ");
    // console.log(res);
     return await res; 
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
    console.log("con close..");
   } 
   //return await res;

};

module.exports.Insert = mInsert;
module.exports.Find = mFind;
