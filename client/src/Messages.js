import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Identicon from "react-identicons";
import { Grid } from "@material-ui/core";

import InputBox from "./inputBox";

const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;

const Messages = ({ user, outChat }) => {
  const { data } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });

  useEffect(() => {
    window.scrollTo(
      0,
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  }, [data]);
  return (
    <>
      {!data ? (
        <h1>There is some problem for sever side.</h1>
      ) : (
        <>
          <Grid containet>
            <Grid item>
              {data.messages.map(({ user: messageUser, content }) => (
                <Grid
                  container
                  direction="column"
                  alignItems={user === messageUser ? "flex-end" : "flex-start"}
                  spacing={3}
                >
                  <Grid item>
                    <Grid container direction="row">
                      <Grid item>
                        <Identicon string={messageUser} size="40" />
                        <div className="userName">{messageUser}</div>
                      </Grid>
                      <Grid item>
                        <div
                          className="chatBox"
                          style={{
                            maxWidth: screen.width * 0.7,
                          }}
                        >
                          <p>{content}</p>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              <br /> <br />
              <br /> <br />
              <Grid />
            </Grid>
            <InputBox user={user} outChat={() => outChat()} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Messages;
