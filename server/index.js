import graphqlYoga from "graphql-yoga";
const { GraphQLServer, PubSub } = graphqlYoga;
// const { GraphQLServer } = require("graphql-yoga");

const messages = [];

//every graphal server need type, like schema
const typeDefs = `

    type Message {
        id: ID!
        user: String!
        content: String!
        date: Date!
    }

    type Date {
       year: Int!
       mounth: Int!
       tday: Int!
       time: String!
    }

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, content: String!): ID!
    }

    type Subscription {
        messages: [Message!]
    }
`;

//I got the type,
//now how i am actually get the data
const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;

      const dateNow = new Date();
      // const date = dateNow.getHours() + ":" + dateNow.getMinutes();
      // date.time = dateNow.getHours() + ":" + dateNow.getMinutes();
      const date = {
        year: dateNow.getFullYear(),
        mounth: dateNow.getMonth() + 1,
        tday: dateNow.getDate(),
        time: dateNow.getHours() + ":" + dateNow.getMinutes(),
      };

      messages.push({
        id,
        user,
        content,
        date,
      });
      return id;
    },
  },

  //todo
  // Subcription:[

  // ]
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
