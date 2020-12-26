import React from "react"

const myStyles = {
    red: {
        color: 'blue'
    }
}

export default function Roadmap(){
    console.log(myStyles);
    return(
        <div>
            <h1 style={myStyles.red}>I am imported</h1>
        </div>
    )
}