import { updateComment, deleteComment } from "../apis/CommentApis";


export default function Comment() {

  const eventId = "645416a1cdb6ffdcebe066a4"
  const commentId = "64561cbd8e63544fead2954f"
  const updatedComment = {
    text: "new text on this comment"
  }
  const updateOneComment = () => {
    updateComment(eventId, commentId, updatedComment )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
  }
  const deleteOneComment = () => {
    deleteComment(eventId, commentId)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
    }
  return(
    <>
      <button
      onClick={updateOneComment}
      >Update Comment</button>
      <button
      onClick={deleteOneComment}
      >Delete Comment</button>
    </>
  )
}