import { updateComment, deleteComment } from "../apis/CommentApis";


export default function Comment( {singleEventInfo, theEventIdForComments} ) {
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
      {singleEventInfo.author === "64577ed65683384e242cb229" ?
      <div>
      <button
      onClick={updateOneComment}
      >Update Comment</button>
      <button
      onClick={deleteOneComment}
      >Delete Comment</button>
      </div>: null}
    </>
  )
}