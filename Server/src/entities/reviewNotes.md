# Post.ts Review #

 TypeScript
 : Our language of choice for this application
 PostgreSQL
 : Our database management system, uses the sql relational database model
 Mikrorm
 : Our data mapper that turns our typescript into queries that are mapped to our databases on PostgreSQL
 Type-GraphQL
 : Our framework for creating an API  
 
 ## Summary ## 
 This app is built using TypeScript. This is used in conjunction with PostgreSQL, Mikrorm, and Type-GraphQL to create our backend. We use Mikrorm to communicate with the backend and have the additional layer of type-GraphQL on top of these interactions to create an API to communicate with PostgreSQL.

 {
    @Field(() => Int)
    @PrimaryKey()
    id!: number;
 }

In this code snippit above the top line is coming from Type-GraphQL, the second is coming from Mikrorm, and the last is TypeScript.