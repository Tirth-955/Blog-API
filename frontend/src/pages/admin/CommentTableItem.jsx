import React from "react";

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogDate = new Date(createdAt);

  return (
    <tr className="order-y border-gray-500">
      <td className="px-6 py-4">
        <b className="font-medium text-gray-700">Blog</b> : {blog.title}
        <br />
        <br />
        <b className="font-medium text-gray-700">Name</b> : {comment.name}
        <br />
        <b className="font-medium text-gray-700">Comment</b> : {comment.content}
      </td>

      <td className="px-6 py-4 max-sm:hidden">
        {BlogDate.toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <div>{!comment.isApproved}</div>
      </td>
    </tr>
  );
};

export default CommentTableItem;
