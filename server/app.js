const config = require('./config/secret.js');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());
console.log(config);
mongoose.connect('mongodb://' + config);
mongoose.connection.once('open', () => {
    console.log('connected to db');
})

const graphqlOptions = {
    schema,
    graphiql: true
};

app.use('/graphql', graphqlHTTP(graphqlOptions));

app.listen(port, () => console.log(`Listening on port ${port}`));
