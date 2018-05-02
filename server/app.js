const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = 4000;

app.use(cors);

mongoose.connect('mongodb://')
mongoose.connection.once('open', () => {
    console.log('connected to db');
})

const graphqlOptions = {
    schema,
    graphiql: true
};

console.log(graphqlOptions);

app.use('/graphql', graphqlHTTP(graphqlOptions));

app.listen(port, () => console.log(`Listening on port ${port}`));