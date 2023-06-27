
import React from 'react'

export default function SuccessMessage({successMessage}) {
    if(!successMessage){
        return null
    }
  return (
    <div>
      <p>{successMessage}</p>
    </div>
  )
}