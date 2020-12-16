import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { User } from "./entities/User";
//as const changes type to 'lireddit'
//create migrations with npx mikro-orm migration:create
export default {
    migrations: {
        disableForeignKeys: false,
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/
    },
    entities: [Post, User],
    dbName: "lireddit",
    user: "postgres",
    password: "postgres",
    debug: !__prod__,
    type: "postgresql"
} as Parameters<typeof MikroORM.init>[0];