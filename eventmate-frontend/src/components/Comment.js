import { updateComment, deleteComment } from "../apis/CommentApis";
import { getPayloadFromToken } from '../tokenLogic/tokenLogic'
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
    if (e.keyCode == 27) {
      setShowForm(false)
    }
  }

  function handleBlur() {
    setShowForm(false)
  }

  function toggleForm() {
    setShowForm(!showForm)
  }

  return (
    <>
      {
        !showForm && <div>
          {/* Checks if hideAuthor is set to true if it is then it displays anonymous else it shows use - currently hard coded*/}

          <p>Author: {singleComment.author === `${payload.username}` ?
            (singleComment.hideAuthor ?
              `Anonymous (You)` : `${singleComment.author} (You)`
            ) : (singleComment.hideAuthor ?
              `Anonymous` : singleComment.author
            )
          }</p>

          <p>Comment: {singleComment.text}</p>
          {/* If the author Id equals the id of the user then update and delete buttons will be visable */}
          {singleComment.author === `${payload.username}` ?
            <div>
              <button onClick={toggleForm}>Edit Comment</button>
              <button onClick={deleteOneComment}>Delete Comment</button>
            </div> : null}

        </div>
      }
      {
        showForm && <form onSubmit={updateOneComment}>
          <input
            name="text"
            type="text"
            placeholder={singleComment.text}
            autoFocus="true"
            autoComplete="off"
            required
            value={editedComment.text}
            onChange={handleInputOnChange}
            onKeyDown={handleEscForm}
            onBlur={handleBlur}
          />
        </form>
      }
    </>
  )
}