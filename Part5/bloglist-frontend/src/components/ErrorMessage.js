
import React from 'react'

export default function ErrorMessage({errorMessage}) {
    if(!errorMessage){
        return null
    }
  return (
    <div>
      <h2>{errorMessage}</h2>
    </div>
  )
}