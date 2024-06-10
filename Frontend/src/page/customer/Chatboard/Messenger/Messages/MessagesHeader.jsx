import React from "react";
import { styled } from "@mui/system";
import Avatar from "../../../../../component/Avatar";
import Typography from "@mui/material/Typography";

const MainContainer = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MessagesHeader = ({ name = "" }) => {
  return (
    <MainContainer >
     <div className={'flex items-center '}>
         <Avatar large username={name} />
         <Typography
             variant="h6"
             sx={{
                 fontWeight: "bold",
                 color: "black",
                 marginLeft: "20px",
                 marginRight: "5px",
             }}
         >
             {name}
         </Typography>
     </div>
      <Typography
        sx={{
          color: "#b9bbbe",
          marginTop: "10px",

        }}
      >
        This is the beginning of your conversation with {name}
      </Typography>
    </MainContainer>
  );
};

export default MessagesHeader;
