import { createComment } from "../apis/CommentApis";

export default function CreateCommentForm(){
  const eventId = "645416a1cdb6ffdcebe066a4"
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