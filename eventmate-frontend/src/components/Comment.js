import { updateComment, deleteComment } from "../apis/CommentApis";
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'


export default function Comment( {singleCommentInfo, eventId, updateCommentList} ) {
  const payload = getPayloadFromToken();
  const updatedComment = {
    text: "new text on this comment"
  }
  const updateOneComment = () => {
    updateComment(eventId, singleCommentInfo._id, updatedComment )
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
  return(
    <>
      <p>Author: {singleCommentInfo.author === `${payload.username}`?
        (singleCommentInfo.hideAuthor?
          `Anonymous (You)`: `${singleCommentInfo.author} (You)`
          ):
          (singleCommentInfo.hideAuthor?
            `Anonymous`: singleCommentInfo.author
            )
      }</p>
      <p>Comment: {singleCommentInfo.text}</p>
      {singleCommentInfo.author === `${payload.username}` ?
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