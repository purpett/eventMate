import Comment from "./Comment";

export default function Comments({ eventId, comments, setSingleEvent }) {
  return (
    <div>
      {/* Checks if the there is information being passed down
      if there is it maps through it creating a Comment component for each item in array. 
      Each Comment component is passed the individual comment info and the eventId  */}
      {comments && comments.length ?
        comments.map((singleComment, index) => {
          return (
            <Comment
              index={index}
              singleComment={singleComment}
              setSingleEvent={setSingleEvent}
              eventId={eventId}
              key={singleComment._id}
            />
          )
        }) : null}
    </div>
  )
}
