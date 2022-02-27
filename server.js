// Include Express framework
var express = require('express');

// Include Express-GraphQL framework
var { graphqlHTTP } = require('express-graphql');

// Include body-parser middleware -- parse request bodies
var bodyParser = require('body-parser');

// Include Mongoose framework for MongoDB
var mongoose = require('mongoose');

// Use file-system to read the GraphQL scheme from "schema.graphql" file.  
// This is to avoid cluttering the server.js file
const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql', { encoding: 'utf-8' });

// Get the resolvers from a different file ("resolvers.js")
// Resolvers perform the work behind each GraphQL action
const resolvers = require('./resolvers');

// Associate the schema (type definitions) with their respective resolvers
const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create the application instance
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
		pretty: true
	})
);

// Launch application and listen to port 4000 on the localhost
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
