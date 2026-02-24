import { useState, useEffect } from 'react'
import './design.css'

const APIURL = 'https://personal-website-finals-nt7v.vercel.app'
const goalPhotos = [
  'Pictures/AIR.jpg', 'Pictures/air2.jpg', 'Pictures/air1.jpg',
  'Pictures/Image (6).jpg', 'Pictures/Image (7).jpg', 'Pictures/Image (10).jpg',
  'Pictures/Image (11).jpg', 'Pictures/Image (13).jpg',
]
const starLabels = ['', '1 - Poor', '2 - Fair', '3 - Good', '4 - Great', '5 - Excellent']

function StarDisplay({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#00ff88' : '#444' }}>★</span>
      ))}
    </div>
  )
}

function App() {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [comments, setComments] = useState([])
  const [loadingComments, setLoadingComments] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    setLoadingComments(true)
    try {
      const res = await fetch(`${APIURL}/comments`)
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setComments([]) 
    } finally {
      setLoadingComments(false)
    }
  }

  async function submitFeedback() {
    if (!name || !comment || rating === 0) {
      setStatus({ msg: 'Please fill in all fields.', error: true })
      return
    }
    setIsSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch(`${APIURL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      })
      if (res.ok) {
        setStatus({ msg: 'Thank you for your feedback!', error: false })
        setName(''); setRating(0); setComment('')
        fetchComments()
      } else {
        setStatus({ msg: 'Submission failed.', error: true })
      }
    } catch (err) {
      setStatus({ msg: err.message, error: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w3-light-grey" style={{ width: '100%', margin: 0, padding: 0 }}>
      <nav className="w3-bar w3-black w3-card w3-top" style={{ letterSpacing: '4px', zIndex: 10 }}>
        <a href="#home" className="w3-bar-item w3-button"><b>Chelsea Portfolio</b></a>
        <div className="w3-right w3-hide-small">
          <a href="#home" className="w3-bar-item w3-button">Home</a>
          <a href="#about" className="w3-bar-item w3-button">About</a>
          <a href="#education" className="w3-bar-item w3-button">Education</a>
          <a href="#skills" className="w3-bar-item w3-button">Skills</a>
          <a href="#goals" className="w3-bar-item w3-button">Goals</a>
          <a href="#rate" className="w3-bar-item w3-button">Rate Me</a>
        </div>
      </nav>

      <header id="home" className="w3-container w3-white" style={{ paddingTop: '80px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="w3-content" style={{ maxWidth: '1200px', width: '100%' }}>
          <div className="w3-row-padding" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: 0 }}>
            <div className="w3-col l7 m12">
              <h1 className="w3-jumbo"><b>Chelsea Portfolio</b></h1>
              <p className="w3-xlarge">by Chelsea Hillary M. Nacalaban</p>
              <div className="w3-margin-top" style={{ fontSize: '24px' }}>

  <a href="https://www.facebook.com/share/17wBHhw3y2/?mibextid=wwXIfr" target="_blank" rel="noreferrer">
    <i className="fa fa-facebook-official w3-hover-opacity w3-margin-right" style={{ cursor: 'pointer', color: 'black' }}></i>
  </a>


  <a href="https://www.instagram.com/chelsxe?igsh=MXB6ZWplbjF2eHg0NA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">
    <i className="fa fa-instagram w3-hover-opacity w3-margin-right" style={{ cursor: 'pointer', color: 'black' }}></i>
  </a>


  <a href="https://www.linkedin.com/in/chelsea-hillary-nacalaban-a2490b321" target="_blank" rel="noreferrer">
    <i className="fa fa-linkedin w3-hover-opacity" style={{ cursor: 'pointer', color: 'black' }}></i>
  </a>
</div>
            </div>
            <div className="w3-col l5 m12 w3-center">
              <img src="Pictures/Image (3).jpg" className="w3-image w3-round" style={{ width: '100%', maxWidth: '550px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} alt="Chelsea" />
            </div>
          </div>
        </div>
      </header>

      <div className="w3-content w3-padding-64" id="about" style={{ maxWidth: '1100px' }}>
        <div className="w3-row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="w3-col m6 w3-padding-large w3-center">
            <img src="Pictures/Image (2).jpg" className="w3-round w3-image" style={{ width: '100%', maxWidth: '450px', borderRadius: '20px' }} alt="About Me" />
          </div>
          <div className="w3-col m6 w3-padding-large">
            <h2><b>About Me</b></h2>
            <p className="w3-large">
              Hi! I'm <strong>Chelsea Hillary M. Nacalaban</strong>, a Computer Science student specializing in <b>Forensics and Cyber Security</b> at Asia Pacific College. Exploring new ideas, designs, and innovations is something I really enjoy doing.
            </p>
          </div>
        </div>
      </div>

      <div className="w3-container w3-padding-64 w3-light-grey" id="education" style={{ margin: 0 }}>
        <div className="w3-content" style={{ maxWidth: '1200px' }}>
          <div className="w3-row-padding" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="w3-col l4 m12">
              <h2 className="w3-xxlarge"><b>Education</b></h2>
              <p className="w3-large">Currently taking <b>BS Computer Science</b> specializing in <b>Cybersecurity and Forensics</b> at APC.</p>
            </div>
            <div className="w3-col l8 m12">
              <div className="w3-row-padding">
                <div className="w3-half w3-center w3-margin-bottom">
                  <img src="Pictures/Chel1.jpg" className="w3-round" style={{ width: '100%', borderRadius: '15px', maxHeight: '400px', objectFit: 'cover' }} alt="High School" />
                  <p className="w3-large"><b>Sto Niño Catholic School</b></p>
                </div>
                <div className="w3-half w3-center w3-margin-bottom">
                  <img src="Pictures/Chel2.jpg" className="w3-round" style={{ width: '100%', borderRadius: '15px', maxHeight: '400px', objectFit: 'cover' }} alt="College" />
                  <p className="w3-large"><b>Asia Pacific College (STEM)</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="w3-content w3-padding-64" id="skills">
  <h2 className="w3-center"><b>Technical Skills</b></h2>
  <div className="w3-row-padding w3-center" style={{ marginTop: '32px' }}>
    <div className="w3-third w3-margin-bottom">
      <div className="w3-card w3-padding-24 w3-white" style={{ borderRadius: '15px' }}>
        <i className="fa fa-shield w3-text-black" style={{ fontSize: '50px' }}></i>
        <h4><b>Cyber Security</b></h4>
        <p>Digital Forensics & Threat Analysis</p>
      </div>
    </div>
    <div className="w3-third w3-margin-bottom">
      <div className="w3-card w3-padding-24 w3-white" style={{ borderRadius: '15px' }}>
        <i className="fa fa-code w3-text-black" style={{ fontSize: '50px' }}></i>
        <h4><b>Web Programming</b></h4>
        <p>React, PHP, and REST APIs</p>
      </div>
    </div>
    <div className="w3-third w3-margin-bottom">
      <div className="w3-card w3-padding-24 w3-white" style={{ borderRadius: '15px' }}>
        <i className="fa fa-microchip w3-text-black" style={{ fontSize: '50px' }}></i>
        <h4><b>IoT & Hardware</b></h4>
        <p>Arduino & Sensor Integration</p>
      </div>
    </div>
  </div>
</div>

      <div className="w3-container w3-padding-64 w3-dark-grey" id="goals" style={{ margin: 0 }}>
        <div className="w3-content">
          <div className="w3-center" style={{ marginBottom: '40px' }}>
            <h2 className="w3-xxlarge"><b>Goals & Dreams</b></h2>
            <p className="w3-large" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
              My priority is <strong>graduating with my Bachelor's degree</strong>. Having a good job in the tech industry will be my gateway to achieve my goal of <strong>traveling around the world</strong>.
            </p>
            <br />
            <p className="w3-large" style={{ maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
              I'm a firm believer in <strong>collecting experiences rather than things</strong>. Whether it's tasting local street food, getting lost in a new city, or finally seeing a world-famous view in person, I want to see it all. Being able to watch my <strong>K-pop idols perform live</strong> is also a big achievement and opportunity I truly treasure.
            </p>
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

      <div className="w3-content w3-padding-64" id="rate">
        <div className="w3-container w3-white w3-padding-32 w3-card-4" style={{ borderRadius: '15px' }}>
          <h2 className="w3-center"><b>Rate My Portfolio</b></h2>
          <div className="w3-section">
            <label><b>Name</b></label>
            <input className="w3-input w3-border w3-round" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w3-section">
            <label><b>Rating (1-5)</b></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span key={star} onClick={() => setRating(star)} onMouseEnter={() => setHovered(star)} onMouseLeave={() => setHovered(0)} style={{ fontSize: '2.2rem', cursor: 'pointer', color: star <= (hovered || rating) ? '#00ff88' : '#ccc', transition: '0.2s' }}>★</span>
              ))}
              <span className="w3-text-grey">{starLabels[hovered || rating]}</span>
            </div>
          </div>
          <div className="w3-section">
            <label><b>Remarks</b></label>
            <textarea className="w3-input w3-border w3-round" style={{ height: '100px' }} value={comment} placeholder="Share your feedback..." onChange={(e) => setComment(e.target.value)} />
          </div>
          <button className="w3-button w3-black w3-block w3-round-large" onClick={submitFeedback} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          {status && (
            <div className={`w3-panel w3-margin-top w3-round ${status.error ? 'w3-red' : 'w3-green'}`}>
              <p>{status.msg}</p>
            </div>
          )}
          <hr style={{ borderTop: '2px solid #eee', margin: '40px 0' }} />
          <div className="w3-margin-top">
            <h3 style={{ color: '#111' }}><b>Recent Entries ({comments.length})</b></h3>
            <div style={{ marginTop: '20px' }}>
              {loadingComments ? <p className="w3-center">Loading entries...</p> : comments.map((c, i) => (
                <div key={i} style={{ background: '#121212', color: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '20px', borderLeft: '5px solid #00ff88' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '45px', height: '45px', background: '#00ff88', color: '#000', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px' }}>
                      {c.name ? c.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <strong>{c.name}</strong>
                      <div style={{ fontSize: '0.8rem', color: '#888' }}>{c.date ? new Date(c.date).toLocaleString() : 'Recently'}</div>
                    </div>
                  </div>
                  <StarDisplay rating={c.rating} />
                  <p style={{ color: '#ccc', lineHeight: '1.6', marginTop: '10px' }}>{c.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="w3-container w3-black w3-padding-32 w3-center">
        <p>Thank you for visiting, Chelsea Hillary M. Nacalaban</p>
      </footer>
    </div>
  )
}

export default App