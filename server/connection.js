const {MongoClient} = require("mongodb");

const uri = mongodb+srv://whyang:yang890522@cluster0.jn664ob.mongodb.net/?retryWrites=true&w=majority || "mongodb://localhost:27017/?maxPoolSize=200";

const client = new MongoClient(uri);
client.connect().then(() => {
  console.log("connected db")
})

function getDB() {
  return client.db("twitter")
}

module.exports = {getDB}
