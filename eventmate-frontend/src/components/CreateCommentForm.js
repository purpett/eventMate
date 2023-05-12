import { createComment } from "../apis/CommentApis";
import { useState } from "react"
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'

export default function CreateCommentForm({ id, setSingleEvent }) {
  // Grab the payload and store it in a variable
  const payload = getPayloadFromToken()
  // Handle the comment input form information
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

  // Handles the changes in the text input. It is dynamic but does not have to be.
  function handleTextInput(e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: e.target.value });
  }
  // Handles the changes in the checkbox. It is dynamic but does not have to be.
  function handleHiddenNameInput(e) {
    setNewCommentInput({ ...newCommentInput, [e.target.name]: e.target.checked })
  }

  return (
    <form className="comment-form">
      <div className="create-comment-container">
        <div className="create-comment-input">
          <input placeholder="Write a comment..."
            name="text"
            type="text"
            autoFocus="on"
            value={newCommentInput.text}
            onChange={handleTextInput}
          />
        </div>
        <div className="create-comment-anonymous">

          <label>
            Stay anonymous
          </label>
          <label className="switch">
            <input
              type="checkbox"
              id="_checkbox"
              name="hideAuthor"
              checked={newCommentInput.hideAuthor}
              onChange={handleHiddenNameInput}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <button className="normal-btn"
          onClick={(e) => {
            createOneComment()
            e.preventDefault()
          }}
        >Create Comment</button>
      </div>
    </form>
  )
}