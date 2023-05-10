import { createComment } from "../apis/CommentApis";
import { useState } from "react"
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'

export default function CreateCommentForm({ id, setSingleEvent, setShowCommentForm }) {
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
        setShowCommentForm(false)
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
    <form className="comment-form">
      <div className="create-comment-container">
        <div className="create-comment-input">
          <label>Your comment</label>
          <input placeholder="Comment Text"
            name="text"
            type="text"
            autoFocus="on"
            value={newCommentInput.text}
            onChange={handleTextInput}
          />
        </div>
        <div className="create-comment-anonymous">
          <label>Stay Anonymous</label>
          <input type="checkbox"
            name="hideAuthor"
            // value={newCommentInput.hideAuthor}
            checked={newCommentInput.hideAuthor}
            onChange={handleHiddenNameInput}
          />
        </div>
        <button className="button"
          onClick={(e) => {
            createOneComment()
            e.preventDefault()
          }}
        >Create Comment</button>
      </div>
    </form>
  )
}