import { useState } from "react"

const Blog = ({blog, user, handleBlogLike}) => {
  const [showMore , setShowMore] = useState(false);
  const showBlogDetails = {display: showMore ? '': 'none'}
  return (
    <div>
      <p>{blog.title} {blog.author} <button onClick={()=> setShowMore(!showMore)}>show more</button></p>
      <div style={showBlogDetails}>
          <p>showing details</p>
          <p>URL: {blog.url}</p>
          <p>LIKE: {blog.upvotes} <button onClick={()=>handleBlogLike(user, blog)}>Like</button></p>
          <p>USER: {user.name}</p>
          <button onClick={()=> setShowMore(!showMore)}>hide details</button>
      </div>
    </div>  
  )
}

export default Blog