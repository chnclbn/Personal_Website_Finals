import './design.css'

function App() {
  return (
    <div className="portfolio-app">
      <div className="w3-top">
        <div className="w3-bar w3-black w3-padding w3-card" style={{ letterSpacing: '4px' }}>
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
        <div className="w3-row-padding" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="w3-col l7 m12">
            <h1 className="w3-xxxlarge"><b>Chelsea Portfolio</b></h1>
            <p style={{ fontSize: '20px' }}>by Chelsea Hillary M. Nacalaban</p>
          </div>
          <div className="w3-col l5 m12 w3-center">
            <img 
              src="/Pictures/Image (3).jpg" 
              className="w3-image" 
              style={{ width: '100%', maxWidth: '600px', borderRadius: '20px' }} 
              alt="Chelsea Profile" 
            />
          </div>
        </div>
      </header>

      <div className="w3-content" style={{ maxWidth: '1100px' }} id="about">
        <div className="w3-row w3-padding-64">
          <div className="w3-col m6 w3-padding-large">
            <h1 className="w3-center">About Me</h1>
            <p className="w3-large">Hi! I’m Chelsea Hillary M. Nacalaban, a Computer Science student specializing in Forensics and Cyber Security.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App