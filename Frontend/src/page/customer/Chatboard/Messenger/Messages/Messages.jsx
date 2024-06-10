import React, { useRef, useEffect } from "react";
import { styled } from "@mui/system";
import MessagesHeader from "./MessagesHeader";
import { connect } from "react-redux";
import Message from "./Message";
import DateSeparator from "./DateSeparator";

const MainContainer = styled("div")({
    height: "100%",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    scrollBehavior: "smooth",
});

const convertDateToHumanReadable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear(),
    };

    return format.replace(/mm|dd|yy|yyy/gi, (matched) => map[matched]);
};

const Messages = ({ chosenChatDetails, messages }) => {
    const messageContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    };

    return (
        <MainContainer ref={messageContainerRef}>
            <MessagesHeader name={chosenChatDetails?.name} />
            {messages.map((message, index) => {
                const sameAuthor =
                    index > 0 &&
                    messages[index].author._id === messages[index - 1].author._id;

                const sameDay =
                    index > 0 &&
                    convertDateToHumanReadable(new Date(message.date), "dd/mm/yy") ===
                    convertDateToHumanReadable(
                        new Date(messages[index - 1].date),
                        "dd/mm/yy"
                    );

                return (
                    <div key={message._id} style={{ width: "97%" }}>
                        {(!sameDay || index === 0) && (
                            <DateSeparator
                                date={convertDateToHumanReadable(
                                    new Date(message.date),
                                    "dd/mm/yy"
                                )}
                            />
                        )}
                        <Message
                            content={message.content}
                            name={message.author.name}
                            sameAuthor={sameAuthor}
                            date={convertDateToHumanReadable(new Date(message.date), "dd/mm/yy")}
                            sameDay={sameDay}
                        />
                    </div>
                );
            })}
        </MainContainer>
    );
};

const mapStoreStateToProps = ({ chat }) => {
    return {
        ...chat,
    };
};

export default connect(mapStoreStateToProps)(Messages);
