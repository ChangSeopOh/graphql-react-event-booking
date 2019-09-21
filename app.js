const express= require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose =require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

//to allow react server
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
  if(req.method==='OPTIONS'){
    return res.sendStatus(200); 
  }
  next();

});


//to use isAuth funtion.
app.use(isAuth);

//when deploy to live server, need to set false about graphiql
app.use('/graphql',
graphQlHttp({
    schema: graphQlSchema,
    rootValue : graphQlResolvers,
    graphiql: true 
}));
  

//mongoose.connect(`mongodb+srv//${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0~~~~~...address`, {
mongoose.connect(`mongodb://localhost:27017/events-react-dev`, {
    useNewUrlParser:true, 
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('Conntected to DB!');
    app.listen(8000); //only start when DB is connected
  }).catch(err =>{
    console.log('DB Error : ', err.message);
  });
  
