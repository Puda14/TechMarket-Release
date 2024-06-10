import React, { useState } from 'react';
import CommentForm from './CommentForm';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {stringAvatar} from "../../utils/avataAbout.js";

const CommentChild = ({ comment, replies, currentUserId, beReply, replyComment }) => {
    const [isReplying, setIsReplying] = useState(false);
    const handleReply = (text) => {
        replyComment(text, comment?._id);
        setIsReplying(false);
    };

    return (
        <div className={`p-2   ${beReply?" border-b":''}`}>
            <div className="flex items-center space-x-2">
                <Avatar {...stringAvatar(comment?.userName)} />
                <span className="font-bold ">{comment?.userName}</span>
            </div>
            <p className="ml-12 mt-2">{comment?.comment}</p>
            {currentUserId && beReply && (
                <div className="ml-10">
                    <Button
                        size="small"
                        variant="text"
                        onClick={() => setIsReplying(!isReplying)}
                    >
                        {isReplying ? "Cancel" : "Reply"}
                    </Button>
                </div>
            )}
            {isReplying && (
                <div className="ml-10">
                    <CommentForm
                        handleSubmit={handleReply}
                        submitLabel="Reply"
                    />
                </div>
            )}
            {replies?.length > 0 && (
                <div className="ml-10">
                    {replies.map((reply) => (
                        <CommentChild
                            key={reply._id}
                            comment={reply}
                            beReply={false}
                            replies={[]}
                            currentUserId={currentUserId}
                            replyComment={replyComment}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommentChild;
