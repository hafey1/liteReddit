import "reflect-metadata";

import { MikroORM } from '@mikro-orm/core';
import { COOKIE_NAME, __prod__ } from './constants';
import microConfig from './mikro-orm.config';

import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import cors from 'cors';
import {buildSchema} from 'type-graphql';

import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';

import Redis from 'ioredis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MyContext } from "./types";



const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up(); //automatically runs migrations
    const app = express();
    
    const RedisStore = connectRedis(session);
    const redis = new Redis();


    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }))

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({ 
                client: redis,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
                httpOnly: true,
                sameSite: 'lax',
                secure: __prod__ //only works on https
            },
            saveUninitialized: false,
            secret: "asdfasdfswefwefafdsarsgbb",
            resave: false,
        })
    )
    
    //create a post object to be inserted into the Post table
    //const post = orm.em.create(Post, {title: 'my first post'});
    //await orm.em.persistAndFlush(post);
    //const posts = await orm.em.find(Post, {});
    //console.log(posts);
   
    //create a Graphql complient express server with apollo
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
        context: ({ req, res }): MyContext => ({ em: orm.em, req, res, redis })
    });
    
    apolloServer.applyMiddleware({ app, cors: false });

    app.get("/", (_, res) => {
        res.send("hello");
    });

    app.listen(4000, () => {
        console.log('server started on localhost:4000')
    })
};

main().catch(err => {
    console.log(err);
});