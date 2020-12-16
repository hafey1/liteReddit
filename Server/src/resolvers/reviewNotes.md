# post.ts Review #

## Resolvers ##

Type-GraphQL uses resolvers to create its API. 
 Resolver
 : a set of interactions that are used to mutate or query the backend.

 example of query:
 {    
     @Query(() => Post, {nullable: true})
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() {em}: MyContext
    ): Promise<Post | null> {
        return em.findOne(Post, { id }); 
    }
}
example of mutation:
{
    @Mutation(() => Post)
    async createPost(
        @Arg('title', () => String) title: string,
        @Ctx() {em}: MyContext
    ): Promise<Post> {
        const post = em.create(Post, {title});
        await em.persistAndFlush(post);
        return post; 
    }
}
