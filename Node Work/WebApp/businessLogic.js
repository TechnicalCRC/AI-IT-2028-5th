let mCon = require("./mongoCon");

let insertData = async (document) => {
  try {
    await mCon.client.connect();
    console.log("Connection opened...");
    let db = await mCon.client.db(mCon.dbName);
    let result = 
    await db.collection("department").insertOne(document);
    console.log(await result);
  } catch (err) {
    console.log(err);
  } finally {
    await mCon.client.close();
    console.log("connection closed...");
  }
};

let findData = async () => {
  try {
    await mCon.client.connect();
    let db =await mCon.client.db(mCon.dbName);  // use AI&IT;
    let result = await db.collection('department').find().toArray();
  
   return await result;
  } catch (err) {
    console.log(err);
  } finally {
    await mCon.client.close();
  }
};

module.exports.InsertOne = insertData;
module.exports.Find = findData;