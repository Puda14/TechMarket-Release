import React from "react";
import { styled } from "@mui/system";

const AvatarPreview = styled("div")({
  height: "42px",
  width: "42px",
  backgroundColor: "#5865f2",
  borderRadius: "42px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "20px",
  fontWeight: "700",
  marginLeft: "5px",
  color: "white",
});

const Avatar = ({ username, large }) => {
  return (
    <AvatarPreview style={large ? { height: "60px", width: "60px" } : { height: "40px", width: "40px"}} className={'flex justify-center items-center'}>
      {username.substring(0, 2)}
    </AvatarPreview>
  );
};

export default Avatar;
