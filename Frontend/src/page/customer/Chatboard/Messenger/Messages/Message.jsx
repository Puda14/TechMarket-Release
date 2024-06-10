import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../../../../component/Avatar";
import Typography from "@mui/material/Typography";

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MessageContent = styled("div")({
  color: "rgb(234 88 12)",
});

const SameAuthorMessageContent = styled("div")({
  color: "rgb(234 88 12)",

});

const SameAuthorMessageText = styled("span")({
  marginLeft: "70px",
});

const Message = ({ content, sameAuthor, name, date, sameDay }) => {
  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }

  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar username={name} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "16px", color: "black" }} className={' flex items-center justify-between w-full'}>
          {name}{" "}
          <span style={{ fontSize: "10px", color: "#72767d",marginLeft:"6px" }}>{date}</span>
        </Typography>
        <MessageContent className={'!text-orange-600'}>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

export default Message;
