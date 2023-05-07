import { createComment } from "../apis/CommentApis";
import { useState } from "react"
export default function CreateCommentForm({ id }){
  const [ newComment, setNewComment ] = useState({
    author: "Anonymous",
    text: ""
  })
  const createOneComment = () => {
    createComment(id, newComment)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error.message))
  }
  
  function handleTextInput (e) {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
    console.log(newComment);
  }

  return(
    <form>
      <h3>Comment Text</h3>
      <input placeholder="Comment Text"
      name="text"
      ></input>
      <p>Stay Annonymous</p>
      <input type="checkbox"
      name="author"
      onChange={(e) => console.log(e.target.checked)}
      ></input>
      <button
      onClick={createOneComment}
      >Create Comment</button>
    </form>
  )
}