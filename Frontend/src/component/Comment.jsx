import React, {useEffect, useState} from 'react';
import Comments from "./comments/Comments.jsx";

function Comment({productID}) {
    const {userDetails} = JSON.parse(localStorage.getItem('session'))
    return (
        <div>
            <Comments currentUserId={userDetails._id} productID={productID} userName={userDetails.name}  />
        </div>
    );
}

export default Comment;