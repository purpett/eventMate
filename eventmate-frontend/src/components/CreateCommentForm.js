import { createComment } from "../apis/CommentApis";

export default function CreateCommentForm({ id }){
  const eventId = id
  const newComment = {
    text: "Brand new comment"
  }
  const createOneComment = () => {
    createComment(eventId, newComment)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
  }
  return(
    <button
    onClick={createOneComment}
    >Create Comment</button>
  )
}