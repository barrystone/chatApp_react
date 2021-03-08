import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@material-ui/core";

import Chat from "./Chat";

const LandingPage = () => {
  const [user, setUser] = useState(localStorage.getItem("chatApp_react_user"));
  const [inChat, setInChat] = useState(user == null ? 0 : 1);

  const onChat = () => {
    if (user.length < 1) {
      alert("You should give a name!");
    } else {
      localStorage.setItem("chatApp_react_user", user);
      setInChat(1);
    }
  };

  const outChat = () => {
    localStorage.removeItem("chatApp_react_user");
    setInChat(0);
  };

  return !inChat ? (
    <div className="landing-wrap">
      <Grid container justify="center">
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            {/* <div className="wrap"> */}
            <div className="appName">chatApp_react</div>
            {/* </div> */}
          </Grid>
          <Grid item>
            <TextField
              className="user"
              id="outlined-secondary"
              label="user"
              variant="outlined"
              color="primary"
              style={{ marginBottom: "50px", width: "400px" }}
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
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "300px", height: "100px", fontSize: "30px" }}
              onClick={() => onChat()}
            >
              enter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Chat user={user} outChat={() => outChat()} />
  );
};

export default LandingPage;
