import { useState, useEffect } from 'react'
import './design.css'

function App() {
  const [isLoved, setIsLoved] = useState(false)

  return (
    <div className="portfolio-app">
      
      <div className="w3-top">
        <div className="w3-bar w3-black w3-padding w3-card" style={{letterSpacing:'4px'}}>
          <a href="#home" className="w3-bar-item w3-button">Chelsea Portfolio</a>
          <div className="w3-right w3-hide-small">
            <a href="#home" className="w3-bar-item w3-button">Home</a>
            <a href="#about" className="w3-bar-item w3-button">About</a>
            <a href="#education" className="w3-bar-item w3-button">Education</a>
            <a href="#hobbies" className="w3-bar-item w3-button">Hobbies</a>
            <a href="#goals" className="w3-bar-item w3-button">Goals</a>
          </div>
        </div>
      </div>

    
      <header id="home" className="w3-container w3-padding-64 w3-white">
        <div className="w3-row-padding" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
          <div className="w3-col l7 m12">
            <h1 className="w3-xxxlarge"><b>Chelsea Portfolio</b></h1>
            <p style={{fontSize: '20px'}}>by Chelsea Hillary M. Nacalaban</p>
            <div className="w3-margin-top w3-xlarge">
              <a href="https://facebook.com" className="w3-hover-opacity w3-margin-right"><i className="fa fa-facebook-official"></i></a>
              <a href="https://instagram.com" className="w3-hover-opacity w3-margin-right"><i className="fa fa-instagram"></i></a>
              <a href="https://linkedin.com" className="w3-hover-opacity"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
          <div className="w3-col l5 m12 w3-center">
            <img src="/Pictures/Image (3).jpg" className="w3-image" style={{width:'100%', maxWidth:'600px', borderRadius:'20px'}} />
          </div>
        </div>
      </header>

      
      <div className="w3-content" style={{maxWidth:'1100px'}} id="about">
        <div className="w3-row w3-padding-64">
          <div className="w3-col m6 w3-padding-large w3-center">
            <img src="/Pictures/Image (2).jpg" className="w3-round w3-image" style={{width:'100%', maxWidth:'500px'}} />
          </div>
          <div className="w3-col m6 w3-padding-large">
            <h1><b>About Me</b></h1>
            <h5>Computer Science Student</h5>
            <p className="w3-large">Hi! I’m Chelsea Hillary M. Nacalaban, a Computer Science student specializing in Forensics and Cyber Security.</p>
          </div>
        </div>
      </div>

     
      <div className="w3-container w3-padding-64 w3-light-grey" id="education">
        <div className="w3-center">
          <h2><b>Education</b></h2>
          <div className="w3-row-padding w3-margin-top">
            <div className="w3-half w3-center">
              <img src="/Pictures/Chel1.jpg" style={{width:'70%', borderRadius:'15px'}} />
              <p><strong>Junior High:</strong> Sto Niño Catholic School</p>
            </div>
            <div className="w3-half w3-center">
              <img src="/Pictures/Chel2.jpg" style={{width:'70%', borderRadius:'15px'}} />
              <p><strong>Senior High:</strong> Asia Pacific College (STEM)</p>
            </div>
          </div>
        </div>
      </div>

     
      <div className="w3-container w3-padding-64 w3-white" id="hobbies">
        <div className="w3-center w3-margin-bottom">
          <h1 className="w3-xxxlarge"><b>HOBBIES & INTERESTS</b></h1>
        </div>
        <div className="w3-row-padding">
          <div className="w3-third"><img src="/Pictures/Hobby1.jpg" style={{width:'100%'}} /><p className="w3-center">Exploring Cafés</p></div>
          <div className="w3-third"><img src="/Pictures/summer11.jpg" style={{width:'100%'}} /><p className="w3-center">K-Drama</p></div>
          <div className="w3-third"><img src="/Pictures/17.jpg" style={{width:'100%'}} /><p className="w3-center">K-Pop</p></div>
        </div>
      </div>

      {/* FEEDBACK (Converted from Vue to React) */}
      <div className="w3-container w3-padding-64 w3-light-grey">
        <div className="w3-content" style={{maxWidth:'600px'}}>
          <h2 className="w3-center"><b>Rate My Portfolio</b></h2>
          <div className="w3-card-4 w3-padding w3-white w3-round">
            <label>Name</label><input className="w3-input w3-border" type="text" />
            <label>Rating (1-5)</label>
            <select className="w3-select w3-border">
              <option value="5">Excellent</option>
              <option value="3">Good</option>
            </select>
            <button className="w3-button w3-black w3-margin-top w3-block">Submit Feedback</button>
          </div>
        </div>
      </div>

      <footer className="w3-container w3-black w3-padding-32 w3-center">
        <p>Thank you for visiting my website</p>
        <button 
          className="w3-button w3-white w3-margin-top" 
          onClick={() => setIsLoved(!isLoved)}
        >
          {isLoved ? '❤️ Loved' : '🤍 Love'}
        </button>
      </footer>
    </div>
  )
}

export default App