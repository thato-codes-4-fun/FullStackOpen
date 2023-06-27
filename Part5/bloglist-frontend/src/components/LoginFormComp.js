
import React from 'react'

const  LoginFormComp = ({
    handleNameChange, 
    handleSubmit,
    username,
    password,
    handlePasswordChange,
    user
    }) => {
    if (user){
        return null
    }
  return (
    <div>
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
        </form>
    </div>
  )
}

export default LoginFormComp
