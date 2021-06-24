import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import AppBar from './AppBar';
import Messages from './Messages';
import InputBox from './inputBox';
import PopupWindow from './PopupWindow';

import { WebSocketLink } from '@apollo/client/link/ws';

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8000/',
  options: {
    reconnect: true
  }
});

//Conecting to apallo server
const client = new ApolloClient({
  link: wsLink,
  uri: 'http://localhost:4000/',
  // uri: process.env.SERVER_URL,
  cache: new InMemoryCache()
});

const Chat = ({ user, outChat }) => {
  // const localTimelineColor = localStorage
  //   .getItem('chatApp_react__chat-timelineColor')
  //   .split(',');
  const localTimelineColor = localStorage.getItem(
    'chatApp_react__chat-timelineColor'
  )
    ? localStorage.getItem('chatApp_react__chat-timelineColor').split(',')
    : [];

  const [timelineColor, setTimelineColor] = useState({
    todayColor:
      localTimelineColor[0] == null ? '#05c46b' : localTimelineColor[0],
    last7DayColor:
      localTimelineColor[1] == null ? '#ffd32a' : localTimelineColor[1],
    thisMonthColor:
      localTimelineColor[2] == null ? '#fdcb6e' : localTimelineColor[2]
  });

  const changeColor = (e) => {
    setTimelineColor({
      todayColor: e.nTodayColor,
      last7DayColor: e.nLast7DayColor,
      thisMonthColor: e.nThisMonthColor
    });

    localStorage.setItem(
      'chatApp_react__chat-timelineColor',
      `${e.nTodayColor},${e.nLast7DayColor},${e.nThisMonthColor}`
    );
  };

  return (
    <ApolloProvider client={client}>
      <AppBar />
      <div className="chat-wrap-container" id="chat">
        <div className="chat-wrap" id="chat-messages">
          <Messages
            user={user}
            // outChat={() => outChat()}
            timelineColor={timelineColor}
          />
          <div id="latest"></div>
        </div>
        <InputBox user={user} outChat={() => outChat()} />
      </div>
      <PopupWindow
        changeColor={(e) => changeColor(e)}
        timelineColor={timelineColor}
      />
    </ApolloProvider>
  );
};

export default Chat;

// export default () => (
//   <ApolloProvider client={client}>
//     <Chat />
//   </ApolloProvider>
// );
