import graphqlYoga from 'graphql-yoga';
const { GraphQLServer, PubSub } = graphqlYoga;

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

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);
//I got the type,
//now how i am actually get the data
const resolvers = {
  Query: {
    messages: () => messages
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;

      const dateNow = new Date();
      const date = {
        year: dateNow.getFullYear(),
        mounth: dateNow.getMonth() + 1,
        tday: dateNow.getDate(),
        time: dateNow.getHours() + ':' + dateNow.getMinutes()
      };

      messages.push({
        id,
        user,
        content,
        date
      });
      // just call the callback
      subscribers.forEach((fn) => fn());
      return id;
    }
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        // channel just random string
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      }
    }
  }
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
