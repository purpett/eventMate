import { createComment } from "../apis/CommentApis";
import { useState } from "react"
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'

export default function CreateCommentForm({ id, setSingleEvent }) {
  const payload = getPayloadFromToken()
  const [newCommentInput, setNewCommentInput] = useState({
    author: `${payload.username}`,
    text: "",
    hideAuthor: false
  })
  const createOneComment = () => {
    createComment(id, newCommentInput)
      .then((response) => response.json())
      .then((result) => {
        // this is a whole event, so we can access all of its fields
        setSingleEvent(result)
        setNewCommentInput({ ...newCommentInput, text: "", hideAuthor: false })
      })
      .catch((error) => console.log(error.message))
  }

  function handleTextInput(e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: e.target.value });
  }
  function handleHiddenNameInput(e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: e.target.checked })
  }

  return (
    <form>
      <h3>Comment Text</h3>
      <input placeholder="Comment Text"
        name="text"
        value={newCommentInput.text}
        onChange={handleTextInput}
      />
      <p>Stay Annonymous</p>
      <input type="checkbox"
        name="hideAuthor"
        // value={newCommentInput.hideAuthor}
        checked={newCommentInput.hideAuthor}
        onChange={handleHiddenNameInput}
      />
      <button
        onClick={(e) => {
          createOneComment()
          e.preventDefault()
        }}
      >Create Comment</button>
    </form>
  )
}