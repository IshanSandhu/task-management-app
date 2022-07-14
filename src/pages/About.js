import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div style={{marginTop: "150px", textAlign: "center"}}>
        <h2>
          {""}
          Task Management System using React and Firebase
        </h2>
        <Link to={{ pathname: "https://https://ishansandhu.ca/" }} target="_blank">
          Made by Ishan Sandhu 👨‍💻
        </Link>
    </div>
  )
}

export default About