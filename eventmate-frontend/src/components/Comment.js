import { updateComment, deleteComment } from "../apis/CommentApis";
import { useState } from "react";


export default function Comment({ singleCommentInfo, eventId, updateCommentList }) {
  const updatedComment = {
    text: "new text on this comment"
  }

  const [showForm, setShowForm] = useState(false)
  const [editedComment, setEditedComment] = useState(false)

  const updateOneComment = () => {
    updateComment(eventId, singleCommentInfo._id, updatedComment)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
  }

  const deleteOneComment = () => {
    deleteComment(eventId, singleCommentInfo._id)
      .then((response) => response.json())
      .then((result) => updateCommentList(result.comments))
      .catch((error) => console.log(error.message))
  }
  return (
    <>
      {/* Checks if hideAuthor is set to true if it is then it displays anonymous else it shows use - currently hard coded*/}
      <p>Author: {singleCommentInfo.hideAuthor ? "Anonymous" : "K-B"}</p>
      <p>Comment: {singleCommentInfo.text}</p>
      {/* If the author Id equals the id of the user then update and delete buttons will be visable */}
      {singleCommentInfo.author === "64577ed65683384e242cb229" ?
        <div>
          <button
            onClick={updateOneComment}
          >Update Comment</button>
          <button
            onClick={deleteOneComment}
          >Delete Comment</button>
        </div> : null}
    </>
  )
}