import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Chat from 'chat/Chat';

const App = () => {
  //   document.body.style.overflowY = 'hidden';

  return (
    <div>
      <h1>Module Federation example</h1>
      <p>This is my Chat component in chatApp_react repo</p>
      <a
        href="https://github.com/barrystone/chatApp_react/blob/moduleFederation/client/src/screens/LandingScreen.js"
        target="_blank"
      >
        Chat component
      </a>
      <div
        className="chat-wrap"
        style={{
          width: '500px',
          height: '250px',
          position: 'fixed',
          right: '10px',
          bottom: '10px'
        }}
      >
        <Chat />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
