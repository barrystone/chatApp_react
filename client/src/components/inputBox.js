import React, { useState } from "react";
import { Grid, Input, Button } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";

const POST_MESSAGES = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const inputBox = ({ user, outChat }) => {
  const [textValue, setTextValue] = useState("");
  const [postMessage] = useMutation(POST_MESSAGES);

  const onSend = () => {
    if (textValue === "") {
      alert("Input is empty!");
    } else {
      postMessage({ variables: { user: user, content: textValue } });
      setTextValue("");
    }
  };

  return (
    <div className="inputBox">
      <Grid container direction="row">
        <Grid item>
          <Button
            className="outButton"
            variant="outlined"
            color="secondary"
            onClick={() => outChat()}
          >
            Out
          </Button>
        </Grid>

        <Grid item xs={9}>
          <Input
            className="textBox"
            id="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                e.preventDefault();
                onSend();
              }
            }}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            className="inputButton"
            variant="contained"
            color="primary"
            onClick={() => onSend()}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default inputBox;
