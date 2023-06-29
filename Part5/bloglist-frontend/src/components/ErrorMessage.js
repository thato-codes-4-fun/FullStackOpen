
import React from 'react'

export default function ErrorMessage({errorMessage}) {
    if(!errorMessage){
        return null
    }
  return (
    <div style={{width: '100vw', border: 1, color: 'red'}}>
      <h2>{errorMessage}</h2>
    </div>
  )
}