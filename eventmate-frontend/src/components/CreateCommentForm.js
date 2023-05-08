import { createComment } from "../apis/CommentApis";
import { useState } from "react"
export default function CreateCommentForm({ id }){
  const [ newComment, setNewComment ] = useState({
    author: "64577ed65683384e242cb229",
    text: "",
    hideAuthor: false
  })
  const createOneComment = () => {
    createComment(id, newComment)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setNewComment({...newComment, text: "", hideAuthor: false})
      })
      .catch((error) => console.log(error.message))
  }
  
  function handleTextInput (e) {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  }
  function handleHiddenNameInput (e) {
    setNewComment({ ...newComment, [e.target.name]: `${e.target.checked}`})
  }

  return(
    <form>
      <h3>Comment Text</h3>
      <input placeholder="Comment Text"
      name="text"
      value={newComment.text}
      onChange={handleTextInput}
      ></input>
      <p>Stay Annonymous</p>
      <input type="checkbox"
      name="hideAuthor"
      value={newComment.hideAuthor}
      onChange={handleHiddenNameInput}
      ></input>
      <button
      onClick={(e) => {
        createOneComment()
        e.preventDefault()
      }}
      >Create Comment</button>
    </form>
  )
}