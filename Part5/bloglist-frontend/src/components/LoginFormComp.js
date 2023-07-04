

const  LoginFormComp = ({
    handleNameChange, 
    handleSubmit,
    username,
    password,
    handlePasswordChange,
    user,
    loginIsVisible,
    setLoginIsVisible

    }) => {
    const showWhenVisible = {display: loginIsVisible ? '': 'none'}
    const hideWhenVisible =  {display: loginIsVisible ? 'none': '' }
   

        
    if (user){
        return null
    }
    
  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={()=> setLoginIsVisible(!loginIsVisible)}>Click here to login</button>
        </div>
        <div style={showWhenVisible}>
            <h1>Please login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                username: 
                <input
                    onChange={handleNameChange}
                    value={username}
                    type='text'
                />
                </div>
                <div>
                password:
                <input 
                    onChange={handlePasswordChange}
                    type='password'
                    value={password}
                />
                </div>
                <button type='submit'>Submit</button>
                <button onClick={(event)=> {
                    event.preventDefault()
                    setLoginIsVisible(!loginIsVisible)
                }}>cancel</button>
            </form>
        </div>
        
    </div>
  )
}

export default LoginFormComp
