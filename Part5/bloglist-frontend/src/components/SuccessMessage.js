
import React from 'react'

export default function SuccessMessage({ successMessage }) {
    if(!successMessage){
        return null
    }
    return (
        <div style={{ width: '100vw', border: 1, color: 'green' }}>
            <p>{successMessage}</p>
        </div>
    )
}