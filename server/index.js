import graphqlYoga from 'graphql-yoga';
const { GraphQLServer, PubSub } = graphqlYoga;

const messages = [
  {
    id: '1',
    user: 'james',
    content: '今天有什麼作業啊',
    date: {
      year: 2020,
      mounth: 5,
      tday: 29,
      time: '16:9'
    }
  },
  {
    id: '2',
    user: 'abc',
    content: 'testing testing',
    date: {
      year: 2021,
      mounth: 3,
      tday: 11,
      time: '6:9'
    }
  },
  {
    id: '3',
    user: '小明',
    content: '聽說軟攻這堂課很讚，你有興趣ㄇ？',
    date: {
      year: 2021,
      mounth: 6,
      tday: 8,
      time: '3:10'
    }
  },
  {
    id: '4',
    user: 'james',
    content: '當然想修超好玩的，超想搶這這堂課的',
    date: {
      year: 2021,
      mounth: 6,
      tday: 8,
      time: '3:11'
    }
  },
  {
    id: '5',
    user: '小明',
    content: '搶起來搶起來！！！',
    date: {
      year: 2021,
      mounth: 6,
      tday: 8,
      time: '3:11'
    }
  },
  {
    id: '6',
    user: 'dj',
    content: '聽說在屏東大學資科系有學生自創的組織，好像挺棒',
    date: {
      year: 2021,
      mounth: 6,
      tday: 20,
      time: '13:01'
    }
  },
  {
    id: '7',
    user: 'barry',
    content: 'Yea, for sure.',
    date: {
      year: 2021,
      mounth: 6,
      tday: 20,
      time: '13:01'
    }
  }
];

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

      // const fakeDate = {
      //   year: 2021,
      //   mounth: 6,
      //   tday: 10,
      //   time: '14:36'
      // };

      messages.push({
        id,
        user,
        content,
        date

        //FOR TESTING
        // fakeDate
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

const options = {
  port: 8000
};
server.start(options, ({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});
