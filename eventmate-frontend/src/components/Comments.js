import Comment from "./Comment";

export default function Comments({ singleEventForComments }) {
  return(
    <div>
      {console.log(singleEventForComments.comments)}
      {singleEventForComments.comments ? 
      singleEventForComments.comments.map((singleCommentInfo) => {
        return <Comment 
        singleEventInfo = {singleCommentInfo}
        theEventIdForComments = {singleEventForComments._id}
        key={singleCommentInfo._id}
        />
      })
      : null}
    </div>
  )
}