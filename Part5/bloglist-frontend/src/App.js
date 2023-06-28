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
  const [error, setError] = useState(null)



  useEffect(() => {
    const fecthdata = async()=>{
      try {
        let blogData = await blogService.getAll(user)
        console.log(blogData)
        setBlogs(blogData)
      } catch (error) {
        console.log(error)
        setError('error fetching blogs')
        setTimeout(()=>setError(null),3000)
      }
    }
    fecthdata()
  },[user] )

  useEffect(()=>{
    const storageUser = window.localStorage.getItem('user')
    if(storageUser){
      let user = JSON.parse(storageUser)
      setUser(user)
    }
  },[])

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
      <div></div>
      {/* will map out blogs if user is present */}
      {
        !user? null : blogs.map(blog =>{
          return (
            <div>
              <Blog key={blog.id} blog={blog} />
            </div>
            
          )
        }
        )
      }
    </div>
  )
}

export default App