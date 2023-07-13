import { useState } from 'react'


const Blog = ({ blog, user, handleBlogLike, handleDeleteBlog, }) => {
    const [showMore, setShowMore] = useState('false')
    const handleShowMore = () => {
        setShowMore(!showMore)
    }

    const showBlogDetails = { display: showMore ? '': 'none' }
    return (
        <div className='blogComponent'>
            <p className='blogHeading'>{blog.title} {blog.author} </p>
            <button onClick={handleShowMore}>{showMore? 'hide': 'show more'}</button>
            <div style={showBlogDetails} className='blogDetails'>
                <p>showing details</p>
                <p>URL: {blog.url}</p>
                <p>LIKE: {blog.upvotes} <button onClick={ () => handleBlogLike(user, blog)}>Like</button></p>
                <p>USER: {user.name}</p>
                <button onClick={() => handleDeleteBlog(user, blog.id)}>delete blog</button>
            </div>
        </div>
    )
}

export default Blog