const express= require('express');
const bodyParser = require('body-parser');
const graphQlHttp = require('express-graphql');
const mongoose =require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use('/graphql',graphQlHttp({
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
    app.listen(3000); //only start when DB is connected
  }).catch(err =>{
    console.log('DB Error : ', err.message);
  });
  
