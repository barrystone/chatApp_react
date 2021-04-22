import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

import '../assets/css/landingScreen.css';

import Chat from '../components/Chat';

const LandingPage = () => {
  const [user, setUser] = useState(localStorage.getItem('chatApp_react_user'));
  const [inChat, setInChat] = useState(user == null ? 0 : 1);

  const onChat = () => {
    if (user.length < 1) {
      alert('You should give a name!');
    } else {
      localStorage.setItem('chatApp_react_user', user);
      setInChat(1);
    }
  };

  const outChat = () => {
    localStorage.removeItem('chatApp_react_user');
    setInChat(0);
  };

  return !inChat ? (
    <div className="landing-wrap">
      <div className="appName">chatApp_react</div>
      <TextField
        className="landing__user"
        id="outlined-secondary"
        label="user"
        variant="outlined"
        color="primary"
        style={{ marginBottom: '50px', width: '400px' }}
        value={user}
        onChange={(e) => {
          setUser(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            onChat();
          }
        }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ width: '300px', height: '100px', fontSize: '30px' }}
        onClick={() => onChat()}
      >
        enter
      </Button>
    </div>
  ) : (
    <Chat user={user} outChat={() => outChat()} />
  );
};

export default LandingPage;
