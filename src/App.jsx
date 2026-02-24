import { useState, useEffect } from 'react'
import './design.css'

const APIURL = 'https://personal-website-finals-nt7v.vercel.app'
const goalPhotos = [
  'Pictures/AIR.jpg', 'Pictures/air2.jpg', 'Pictures/air1.jpg',
  'Pictures/Image (6).jpg', 'Pictures/Image (7).jpg', 'Pictures/Image (10).jpg',
  'Pictures/Image (11).jpg', 'Pictures/Image (13).jpg',
]

function App() {
  const [comments, setComments] = useState([])
  
  useEffect(() => {
    fetch(`${APIURL}/comments`)
      .then(res => res.json())
      .then(data => setComments(Array.isArray(data) ? data : []))
      .catch(() => setComments([]))
  }, [])

  return (
    <div className="w3-light-grey" style={{ width: '100%' }}>
      <nav className="w3-bar w3-black w3-card w3-top" style={{ zIndex: 10 }}>
        <span className="w3-bar-item">Chelsea Portfolio</span>
        <div className="w3-right w3-hide-small">
          <a href="#" className="w3-bar-item w3-button">Home</a>
          <a href="#about" className="w3-bar-item w3-button">About</a>
          <a href="#education" className="w3-bar-item w3-button">Education</a>
          <a href="#goals" className="w3-bar-item w3-button">Goals</a>
          <a href="#rate" className="w3-bar-item w3-button">Rate Me</a>
        </div>
      </nav>

      <header id="home" className="w3-container w3-padding-64 w3-white" style={{ marginTop: '50px' }}>
        <div className="w3-content">
          <div className="w3-row-padding">
            <div className="w3-col l7 m12">
              <h1 className="w3-jumbo"><b>Chelsea Portfolio</b></h1>
              <p className="w3-xlarge">by Chelsea Hillary M. Nacalaban</p>
              <div className="w3-margin-top" style={{ fontSize: '24px' }}>
                 <i className="fa fa-facebook-official w3-margin-right"></i>
                 <i className="fa fa-instagram w3-margin-right"></i>
                 <i className="fa fa-linkedin"></i>
              </div>
            </div>
            <div className="w3-col l5 m12 w3-center">
              <img src="Pictures/Image (3).jpg" className="w3-image w3-round" style={{ width: '100%', maxWidth: '600px' }} alt="Chelsea" />
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your sections here using w3-content for centering */}
      
      <div className="w3-container w3-padding-64 w3-dark-grey" id="goals">
        <div className="w3-content">
          <div className="w3-center" style={{ marginBottom: '40px' }}>
            <h2 className="w3-xxlarge"><b>Goals & Dreams</b></h2>
            <p className="w3-large">My priority is graduating with my Bachelor's degree.</p>
          </div>
          <div className="strip-wrapper">
            <div className="photo-strip">
              {[...goalPhotos, ...goalPhotos].map((src, i) => (
                <img key={i} src={src} alt={`Goal ${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App