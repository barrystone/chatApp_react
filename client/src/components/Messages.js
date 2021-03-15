import React, { useEffect, useState, component } from "react";
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
      date {
        year
        mounth
        tday
        time
      }
    }
  }
`;

const Messages = ({
  user,
  outChat,
  timelineColor: { todayColor, last7DayColor, thisMonthColor },
}) => {
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
        <div className="error">
          <p>There has some problem on sever side.</p>
        </div>
      ) : (
        <>
          <div className="messages-wrap">
            <Grid>
              {data.messages.map(
                ({
                  id,
                  user: messageUser,
                  content,
                  date: { year, mounth, tday, time },
                }) => {
                  const dateNow = new Date();
                  let ShowTimelineColor =
                    year == dateNow.getFullYear()
                      ? mounth + "/" + tday ==
                        dateNow.getMonth() + 1 + "/" + dateNow.getDate()
                        ? todayColor
                        : tday >= dateNow.getDate() - 7
                        ? last7DayColor
                        : mounth == dateNow.getMonth() + 1
                      : thisMonthColor;

                  return (
                    <Grid
                      key={id}
                      className="message-box"
                      container
                      direction="column"
                      alignItems={
                        user === messageUser ? "flex-end" : "flex-start"
                      }
                      spacing={3}
                      style={{ borderColor: ShowTimelineColor }}
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
                            <div className="chatBox-date">{time}</div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                }
              )}
              <br /> <br />
              <br />
              <Grid />
              <div id="latest"></div>
            </Grid>
            <InputBox user={user} outChat={() => outChat()} />
          </div>
        </>
      )}
    </>
  );
};

export default Messages;
