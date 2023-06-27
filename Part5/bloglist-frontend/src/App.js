import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginFormComp'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'
import DisplayName from './components/DisplayName'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleSubmit = async (event)=> {
    event.preventDefault()
    console.log('login button pressed')
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUserName('')
      setPassword('')
      setName(user.name)
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

  return (
    <div>
      <SuccessMessage successMessage={success}/>
      <ErrorMessage errorMessage={error}/>
      <DisplayName name={name}/>
      <LoginForm
        username={username}
        password={password}
        handleNameChange={handleNameChange}
        handlePasswordChange={handlePasswordChange}   
        handleSubmit={handleSubmit}
        user={user}  
      />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App