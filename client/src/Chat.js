import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Container } from "@material-ui/core";

import Messages from "./Messages";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const Chat = ({ user, outChat }) => (
  <ApolloProvider client={client}>
    <>
      <Container>
        <Messages user={user} outChat={() => outChat()} />
      </Container>
    </>
  </ApolloProvider>
);

export default Chat;

// export default () => (
//   <ApolloProvider client={client}>
//     <Chat />
//   </ApolloProvider>
// );
