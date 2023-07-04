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
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [loginIsVisible, setLoginIsVisible ] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)


  useEffect(()=>{
    const storageUser = window.localStorage.getItem('user')
    if(storageUser){
      let user = JSON.parse(storageUser)
      setUser(user)
    }
  },[])

  useEffect(() => {
    const fecthdata = async()=>{
      try {
        let blogData = await blogService.getAll(user)
        setBlogs(blogData)
      } catch (error) {
        console.log(error)
        setError('error fetching blogs')
        setTimeout(()=>setError(null),3000)
      }
    }
    fecthdata()
  },[user] )




  const handleSubmit = async (event)=> {
    event.preventDefault()
    console.log('login button pressed')
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )
      setUserName('')
      setPassword('')
      setSuccess('login success...')
      setTimeout(()=> {
        setSuccess(null)
      }, 3000)
    } catch (error) {
      console.log(error.response.data.error)
      setError(error.response.data.error)
      setTimeout(()=> {
        setError(null)
      }, 3000)
    }

  }

  const handleNameChange = ({target})=> {
    setUserName(target.value)
  }
    
  const handlePasswordChange = ({target}) => {
    setPassword(target.value)
  }

  const handleLogOut = ()=> {
    console.log('logout pressed...')
    window.localStorage.clear()
    setUser(null)
    setSuccess('user logged out')
    setTimeout(()=> setSuccess(null),3000)
  }

  const handleCreateBlog = async(event)=> {
    event.preventDefault()  
    try {
      const blogData = {
        author,
        title,
        url
      }
      let newBlog = await blogService.createBlog(user, blogData)
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs([...blogs, newBlog ])
      setSuccess('user added...')
      setTimeout(()=> {
        setSuccess(null)
      },3000)

    } catch (error) {
      console.log('error')
      console.log(error.response.data)
      setError('failed to add blog')
      setTimeout(()=> {
        setError(null)
      }, 3000)
    }
  }

  const handleAuthorChange = ({target})=> {
    setAuthor(target.value)
  }

  const handleTitleChange = ({target})=> {
    setTitle(target.value)
  }

  const handleUrlChange = ({target}) => {
    setUrl(target.value)
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
        loginIsVisible={loginIsVisible}
        setLoginIsVisible={setLoginIsVisible}
      />
      <h2>blogs</h2>
      {!user? null: <DisplayName name={user.name}/>}
      {user? <button onClick={handleLogOut}>Logout</button> : null}
      {
        !user? null :
        <CreateBlogForm
          handleAuthorChange={handleAuthorChange}
          handleTitleChange={handleTitleChange}
          handleUrlChange={handleUrlChange}
          handleCreateBlog={handleCreateBlog}
          showBlogForm={showBlogForm}
          setShowBlogForm={setShowBlogForm}
        />

      }
      {/* will map out blogs if user is present */}
      {
        !user? null : blogs.map(blog =>{
          return (
              <Blog key={blog.id} blog={blog} />
            )
        }
        )
      }
    </div>
  )
}

export default App