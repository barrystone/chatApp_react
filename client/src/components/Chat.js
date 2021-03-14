import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import AppBar from "./AppBar";
import Messages from "./Messages";
import PopupWindow from "./PopupWindow";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const Chat = ({ user, outChat }) => (
  <ApolloProvider client={client}>
    <>
      <AppBar />
      <div className="chat-wrap">
        <Messages user={user} outChat={() => outChat()} />
      </div>
      <PopupWindow />
    </>
  </ApolloProvider>
);

export default Chat;

// export default () => (
//   <ApolloProvider client={client}>
//     <Chat />
//   </ApolloProvider>
// );
