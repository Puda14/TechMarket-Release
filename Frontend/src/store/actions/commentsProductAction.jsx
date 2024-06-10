import {commentApi} from "../../../api/productApi.js";

export const getComments = async (productId) => {
    const res = await commentApi.getAllComments(productId);
    return res.data.data
    // Lấy thông tin người dùng cho mỗi bình luận
    // return await Promise.all(
    //     comments.map(async (comment) => {
    //         // Lấy thông tin người dùng cho comment chính
    //         const userRes = await userApi.getUserById(comment.userId);
    //         const updatedComment = {
    //             ...comment,
    //             username: userRes.data.data.name, // Hoặc bất kỳ thuộc tính nào bạn muốn từ dữ liệu người dùng
    //         };
    //
    //         // Lấy thông tin người dùng cho từng subComment
    //         const updatedSubComments = await Promise.all(
    //             comment.subComments.map(async (subComment) => {
    //                 if (subComment.userId) {
    //                     const subUserRes = await userApi.getUserById(subComment.userId);
    //                     return {
    //                         ...subComment,
    //                         username: subUserRes.data.data.name,
    //                     };
    //                 }
    //                 return subComment;
    //             })
    //         );
    //
    //         return {
    //             ...updatedComment,
    //             subComments: updatedSubComments,
    //         };
    //     })
    // );
};


export const createComment = async (productId, comment) => {
    const res = await commentApi.createComment(productId, comment);
    return res.data;
};

export const updateComment = async (productId, commentId, comment) => {
    const res = await commentApi.reply(productId, commentId, comment);
    return res.data;
};
