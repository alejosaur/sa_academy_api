import { ApolloServer, gql } from 'apollo-server';
import { CoursesAPI } from './datasource';

const { find, filter } = require('lodash');

const typeDefs = gql`
    type Course {
        code: ID!
        credits: Int
        name: String
        professor: String
    }

    type Query {
        course(code: ID!): Course
        courses: [Course]
    }

    type Mutation {
        createCourse(   credits: Int
                        name: String
                        professor: String): Course

        updateCourse(   code: ID!
                        credits: Int
                        name: String
                        professor: String): Course

        deleteCourse(code: ID):String
    }
`;

const resolvers = {
    Query: {
        course: (root, { code }, { dataSources }) => dataSources.CoursesAPI.getACourse(code),
        courses: (root, args, { dataSources }) => dataSources.CoursesAPI.getAllCourses(),
    },
    Mutation: {
        createCourse: (root, args, { dataSources }) =>  dataSources.CoursesAPI.createACourse(args),

        updateCourse: (root, args, { dataSources }) =>  dataSources.CoursesAPI.editACourse(args),

        deleteCourse: (root, { code }, { dataSources }) =>  dataSources.CoursesAPI.deleteACourse(code),
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        CoursesAPI: new CoursesAPI(),
    }),
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
