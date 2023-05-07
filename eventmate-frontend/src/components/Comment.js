import { updateComment, deleteComment } from "../apis/CommentApis";


export default function Comment( {singleEventInfo, theEventIdForComments} ) {
  const commentId = "64561cbd8e63544fead2954f"
  const updatedComment = {
    text: "new text on this comment"
  }
  const updateOneComment = () => {
    updateComment(theEventIdForComments, singleEventInfo._id, updatedComment )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
  }
  const deleteOneComment = () => {
    deleteComment(theEventIdForComments, singleEventInfo._id)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
    }
  return(
    <>
      <p>Author: {singleEventInfo.hideAuthor?"Anonymous": "K-B" }</p>
      <p>Comment: {singleEventInfo.text}</p>
      <button
      onClick={updateOneComment}
      >Update Comment</button>
      <button
      onClick={deleteOneComment}
      >Delete Comment</button>
    </>
  )
}