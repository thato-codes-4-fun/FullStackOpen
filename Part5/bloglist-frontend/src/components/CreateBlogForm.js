import React, { useState } from 'react'

export default function CreateBlogForm({
    handleCreateBlog,
}) {
    const [showBlogForm, setShowBlogForm]= useState(false)
    const showForm = { display: showBlogForm? '': 'none' }
    const hideForm = { display: showBlogForm? 'none': '' }
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const handleAuthorChange = ({ target }) => {
        setAuthor(target.value)
    }

    const handleTitleChange = ({ target }) => {
        setTitle(target.value)
    }

    const handleUrlChange = ({ target }) => {
        setUrl(target.value)
    }

    const handleSubmitBlog = (e) => {
        e.preventDefault()
        const blogData = {
            title,
            author,
            url
        }
        handleCreateBlog(blogData)
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <div style={hideForm}>
                <h1>CreateBlogForm</h1>
                <button onClick={() => {
                    setShowBlogForm(!showBlogForm)
                }}>create blog</button>
            </div>
            <div style={showForm}>
                <h3>Create new Blog</h3>
                <form onSubmit={handleSubmitBlog}>
                    <div>
                      Author:
                        <input
                            onChange={handleAuthorChange}
                            value={author}
                            type='text'
                        />
                    </div>
                    <div>
                      Title:
                        <input
                            onChange={handleTitleChange}
                            value={title}
                            type='text'
                        />
                    </div>
                    <div>
                        Url:
                        <input
                            onChange={handleUrlChange}
                            value={url}
                            type='text'
                        />
                    </div>
                    <button type='submit'>submit</button>
                    <button onClick={(e) => {
                        e.preventDefault()
                        setShowBlogForm(!showBlogForm)
                    }}>cancel</button>
                </form>
            </div>
        </div>
    )
}
