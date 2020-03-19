const _ = require('lodash');

// Authors и Posts получают данные в виде
// JSON массивов с соответствующих файлов
const Authors = require('./data/authors');
const Posts = require('./data/posts');
// const Products = require('./data/products');

let {
    // Здесь базовые типы GraphQL, которые нужны в этом уроке
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    /* Это необходимо для создания требований
       к полям и аргументам */
    GraphQLNonNull,
    // Этот класс нам нужен для создания схемы
    GraphQLSchema
} = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "This represent an author",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLString)},
        name: { type: new GraphQLNonNull(GraphQLString)},
        twitterHandler: {type: GraphQLString}
    })
});

const PostType = new GraphQLObjectType({
    name: "s",
    description: "This represent a s",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function(post) {
                return _.find(Authors, a => a.id == post.author_id);
            }
        }
    })
});

// const ProductType = new GraphQLObjectType({
//     name : "Product",
//     description : "Just product, do you need something more my dummy",
//     fields : () => ({
//         id : {type : new GraphQLNonNull(GraphQLString)},
//         name : {type: new GraphQLNonNull(GraphQLString)},
//         description : {type: GraphQLString},
//         tags: { 
//             type: new GraphQLList(TagType),
//             resolve: function(product){
//                 return _.find(Products, prod. => prod.)
//             }
//         }
//     }) 
// });
const TagType = new GraphQLObjectType({
    name : "Tag",
    description : "Tag.. what are you staring at me dude",
    fields : () => ({
        id : {type : new GraphQLNonNull(GraphQLString)},
        name : {type: new GraphQLNonNull(GraphQLString)}
    }) 
});

const BlogQueryRootType = new GraphQLObjectType({
    name: "BlogAppSchema",
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function() {
                return Authors
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function() {
                return Posts
            }
        }
    })
});

const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
    /* Если вам понадобиться создать или 
       обновить данные, вы должны использовать
       мутации. 
       Мутации не будут изучены в этом посте.
       mutation: BlogMutationRootType
    */
});

module.exports = BlogAppSchema;