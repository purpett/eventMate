import { updateComment, deleteComment } from "../apis/CommentApis";
import { getPayloadFromToken, tokenExp } from '../tokenLogic/tokenLogic'
import { useState } from "react";


export default function Comment({ singleComment, eventId, setSingleEvent }) {

  const [showForm, setShowForm] = useState(false)
  const [editedComment, setEditedComment] = useState(false)

  const payload = getPayloadFromToken();

  const updateOneComment = () => {
    updateComment(eventId, singleComment._id, editedComment)
      .then((response) => response.json())
      .then((result) => setSingleEvent(result))
      .catch((error) => console.log(error.message))
  }

  const deleteOneComment = () => {
    deleteComment(eventId, singleComment._id)
      .then((response) => response.json())
      .then((result) => setSingleEvent(result))
      .catch((error) => console.log(error.message))
  }

  function handleInputOnChange(e) {
    setEditedComment({ ...editedComment, text: e.target.value })
  }

  function handleEscForm(e) {
    if (e.keyCode === 27) {
      setShowForm(false)
    }
  }

  function handleBlur() {
    setShowForm(false)
  }

  function toggleForm() {
    setEditedComment({ text: singleComment.text })
    setShowForm(!showForm)
  }

  return (
    <div className="comment-container">
      <hr />
      <div className="one-comment">
        {
          !showForm && <div className="comment-content">
            {/* Checks if hideAuthor is set to true if it is then it displays anonymous else it shows use - currently hard coded*/}

            <span className="comment-text"> {singleComment.text}</span>

            {/* If the author Id equals the id of the user then update and delete buttons will be visable */}
            {tokenExp() && <p id="author"> {singleComment.author === `${payload.username}` ?
              (singleComment.hideAuthor ?
                `Anonymous (You)` : `${singleComment.author} (You)`
              ) : (singleComment.hideAuthor ?
                `Anonymous` : singleComment.author
              )
            } </p>}
          </div>
        }
        {
          showForm && <form onSubmit={updateOneComment} className="comment-form">
            <input
              name="text"
              type="text"
              placeholder={singleComment.text}
              autoFocus={true}
              autoComplete="off"
              required
              value={editedComment.text}
              onChange={handleInputOnChange}
              onKeyDown={handleEscForm}
              onBlur={handleBlur}
            />
          </form>
        }
        {singleComment.author === `${payload.username}` ?
          <div>
            <button className="normal-btn" onClick={toggleForm}>Edit Comment</button>
            <button className="danger-btn" onClick={deleteOneComment}>Delete Comment</button>
          </div> : null}
      </div>
    </div>
  )
}