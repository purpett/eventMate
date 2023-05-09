import Comment from "./Comment";

export default function Comments({ eventId, commentArray, commentsToShow }) {
  return (
    <div>
      {/* Checks if the there is information being passed down and if there is it maps through it creating a Comment component for each item in array. Each Comment component is passed the individual comment info and the eventId  */}
      {commentArray && commentArray.length ?
        commentArray.map((singleCommentInfo, index) => {
          return <Comment
            index={index}
            singleCommentInfo={singleCommentInfo}
            updateCommentList={commentsToShow}
            eventId={eventId}
            key={singleCommentInfo._id}
          />
        })
        : null}
    </div>
  )
}
