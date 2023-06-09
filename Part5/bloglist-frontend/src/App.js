import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import DisplayName from './components/DisplayName'
import CreateBlogForm from './components/CreateBlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [user, setUser] = useState(null)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [showMore , setShowMore] = useState(false)


    useEffect( () => {
        const storageUser = window.localStorage.getItem('user')
        if(storageUser){
            let user = JSON.parse(storageUser)
            setUser(user)
        }
    },[])

    useEffect(() => {
        const fecthdata = async() => {
            try {
                let blogData = await blogService.getAll(user)
                setBlogs(blogData)
            } catch (error) {
                console.log(error)
                setError('error no user found')
                setTimeout(() => setError(null),3000)
            }
        }
        fecthdata()
    },[user] )

    const handleShowMore = () => {
        setShowMore(!showMore)
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('login button pressed')
        try {
            const user = await loginService.login({ username, password } )
            setUser(user)
            window.localStorage.setItem(
                'user', JSON.stringify(user)
            )
            setUserName('')
            setPassword('')
            setSuccess('login success...')
            setTimeout(() => {
                setSuccess(null)
            }, 3000)
        } catch (error) {
            console.log(error.response.data.error)
            setError(error.response.data.error)
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }

    const handleNameChange = ({ target }) => {
        setUserName(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handleLogOut = () => {
        console.log('logout pressed...')
        window.localStorage.clear()
        setUser(null)
        setSuccess('user logged out')
        setTimeout(() => setSuccess(null),3000)
    }

    const handleCreateBlog = async(blogData) => {
        try {
            let newBlog = await blogService.createBlog(user, blogData)
            setBlogs([...blogs, newBlog ])
            setSuccess('user added...')
            setTimeout(() => {
                setSuccess(null)
            },3000)

        } catch (error) {
            console.log('error')
            console.log(error.response.data)
            setError('failed to add blog')
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }



    const handleBlogLike = async(user, blogObj) => {
        try {
            await blogService.updateLikes(user, blogObj)
            setSuccess('post updated')
            setTimeout(() => setSuccess(null),3000)
        } catch (error) {
            setError('error: ', error)
            setTimeout(() => setError(null),3000)
        }
    }

    const handleDeleteBlog = async (user, blogID) => {
        try {
            const shouldDelete = window.confirm('are you sure you want to delete')
            console.log('deleting...', shouldDelete)
            if(shouldDelete){
                await blogService.deleteBlog(user, blogID)
                setSuccess('blog deleted')
                const newBlogList = await blogService.getAll(user)
                setBlogs(newBlogList)
                setTimeout(() => setSuccess(null),3000)
            }
        } catch (error) {
            console.log(error.response.data)
            setError(error.response.data.error)
            setTimeout(() => setError(null),3000)
        }
    }

    return (
        <div>
            <SuccessMessage successMessage={success}/>
            <ErrorMessage errorMessage={error}/>
            <LoginForm
                username={username}
                password={password}
                handleNameChange={handleNameChange}
                handlePasswordChange={handlePasswordChange}
                handleSubmit={handleSubmit}
                user={user}
            />
            <h2>blogs</h2>
            {!user? null: <DisplayName name={user.name}/>}
            {user? <button onClick={handleLogOut}>Logout</button> : null}
            {
                !user? null :
                    <CreateBlogForm
                        handleCreateBlog={handleCreateBlog}
                    />
            }
            {/* will map out blogs if user is present */}
            {
                !user? null : blogs.sort((a,b) => a.upvotes -b.upvotes).map(blog => {
                    return (
                        <Blog key={blog.id} blog={blog} user={user} handleBlogLike={handleBlogLike} handleDeleteBlog={handleDeleteBlog} showMore={showMore} handleShowMore={handleShowMore}/>
                    )
                })
            }
        </div>
    )
}

export default App