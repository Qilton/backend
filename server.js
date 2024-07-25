const express = require('express')
const path=require('path')
const dotenv=require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors=require('cors')
dotenv.config()

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'passop';

const app = express();
app.use(express.static(path.join(__dirname,"dist")))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,"dist/index.html"))
})

const port = 3000
app.use(bodyParser.json())
app.use(cors())
 client.connect()
 
 app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})



 app.post('/', async(req, res) => {
  const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result:findResult})
})


 app.delete('/', async(req, res) => {
  const password=req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json(findResult)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})