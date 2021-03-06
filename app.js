let express = require('express')
let app = express()
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 4500;
const mongoUrl = "mongodb+srv://test:test123@cluster0.8vlxh.mongodb.net/testing?retryWrites=true&w=majority"
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res)=>
{
    res.send("<h2>Welcome to Express</h2>")
})


//Home details
app.get('/details', (req, res)=> {
    let hom_id = Number(req.query.id)
    let query = {};
    if(hom_id) {
        query = {id:hom_id}
    }

    db.collection('movies').find(query).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})

//to get movie details
app.get('/moviedetails', (req, res)=> {
    let mov_id = Number(req.query.id)
    let query = {};
    if(mov_id) {
        query = {"id":mov_id}
    }

    db.collection('details').find(query).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})


//Home details
app.get('/hdetails/:id',(req,res) => {
    let movId  = Number(req.params.id)
    // let restId = mongo.ObjectId(req.params.id)
    db.collection('details').find({id:movId}).toArray((err,result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//Home

app.get('/home',(req,res)=>{
    db.collection('movies').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})


//Home Details
app.get('/homeDetails',(req,res)=>{
    db.collection('home').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})

//Movies

app.get('/movies',(req,res)=>{
    db.collection('details').find().toArray((err,result)=>
    {
        if(err) throw err;
        res.send(result)
    })
})

MongoClient.connect(mongoUrl, (err,connection)=>{
    if(err) console.log('error while connecting')
    db=connection.db('testing');
    app.listen(port,(req,res)=>{
        console.log(`listening on the port no ${port}`)
    })
})