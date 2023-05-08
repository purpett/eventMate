import { createComment } from "../apis/CommentApis";
import { useState } from "react"
export default function CreateCommentForm({ id, commentsToShow }){
  const [ newCommentInput, setNewCommentInput ] = useState({
    author: "64577ed65683384e242cb229",
    text: "",
    hideAuthor: false
  })
  const createOneComment = () => {
    createComment(id, newCommentInput)
      .then((response) => response.json())
      .then((result) => {
        commentsToShow(result.comments)
        setNewCommentInput({...newCommentInput, text: "", hideAuthor: false})
      })
      .catch((error) => console.log(error.message))
  }
  
  function handleTextInput (e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: e.target.value });
  }
  function handleHiddenNameInput (e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: `${e.target.checked}`})
  }

  return(
    <form>
      <h3>Comment Text</h3>
      <input placeholder="Comment Text"
      name="text"
      value={newCommentInput.text}
      onChange={handleTextInput}
      ></input>
      <p>Stay Annonymous</p>
      <input type="checkbox"
      name="hideAuthor"
      value={newCommentInput.hideAuthor}
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