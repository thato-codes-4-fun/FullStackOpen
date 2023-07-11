import React from 'react'

export default function DisplayName({ name }) {
    if(!name){
        return null
    }
    return (
        <div>
            <p>Hi {name} has logged in</p>
        </div>
    )
}
