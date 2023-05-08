import Comment from "./Comment";

export default function Comments({ commentsArray, eventId }) {
  return(
    <div>
      {/* Checks if the there is information being passed down and if there is it maps through it creating a Comment component for each item in array. Each Comment component is passed the individual comment info and the eventId  */}
      {commentsArray ? 
      commentsArray.map((singleCommentInfo) => {
        return <Comment 
        singleCommentInfo = {singleCommentInfo}
        eventId = {eventId}
        key={singleCommentInfo._id}
        />
      })
      : null}
    </div>
  )
}