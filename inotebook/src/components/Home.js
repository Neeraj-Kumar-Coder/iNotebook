import React from 'react'
import './Home.css'
import Notes from './Notes'

const Home = () => {
    return (
        <>
            <div className="container">
                <h1 id="heading">Take your notes here</h1>
                <Notes />
            </div>
        </>
    )
}

export default Home