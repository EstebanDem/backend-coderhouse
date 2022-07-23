import dotenv from 'dotenv';
import koaBody from 'koa-body';
import koa from 'koa';
import mount from 'koa-mount'
import log4jsLogger from "./utils/loggers/Log4jsLogger.js";
import {graphqlHTTP} from "koa-graphql";
import {schema, queriesAndMutations} from "./graphql/Schema.js";

const app = new koa();
const GRAPHQL_ENDPOINT = '/graphql';

app.use(koaBody());
dotenv.config();

app.use(mount(GRAPHQL_ENDPOINT, graphqlHTTP({
    schema, rootValue: {
        queriesAndMutations
    }, graphiql: true
})));

const PORT = 6965;
const server = app.listen(PORT, () => {
    log4jsLogger.info(`🚀 Server started at http://localhost:${PORT}`)
    log4jsLogger.info(`🕸️  GraphQL Playground: http://localhost:${PORT}${GRAPHQL_ENDPOINT}`)
})

server.on('error', (err) => log4jsLogger.error(err));