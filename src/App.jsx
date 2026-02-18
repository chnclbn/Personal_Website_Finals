import { useState, useEffect } from 'react'
import './design.css'


const API_URL = 'https://personal-website-finals-nt7v.vercel.app'

const goalPhotos = [
  'Pictures/AIR.jpg',
  'Pictures/air2.jpg',
  'Pictures/air1.jpg',
  'Pictures/Image (6).jpg',
  'Pictures/Image (7).jpg',
  'Pictures/Image (10).jpg',
  'Pictures/Image (11).jpg',
  'Pictures/Image (13).jpg',
]

const starLabels = ['', '1 - Poor', '2 - Fair', '3 - Good', '4 - Great', '5 - Excellent']

function StarDisplay({ rating }) {
  return (
    <span>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= rating ? '#f59e0b' : '#ccc', fontSize: '1.1rem' }}>★</span>
      ))}
    </span>
  )
}

function App() {
  const [isLoved, setIsLoved] = useState(false)


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
      const res = await fetch(`${API_URL}/comments`)
      const data = await res.json()
      setComments(data)
    } catch (err) {
      console.error('Failed to load comments:', err)
    } finally {
      setLoadingComments(false)
    }
  }

  // POST - submit feedback
  async function submitFeedback() {
    if (!name || !comment) {
      setStatus({ msg: 'Please fill in your name and remarks.', error: true })
      return
    }
    if (rating === 0) {
      setStatus({ msg: 'Please select a star rating.', error: true })
      return
    }

    setIsSubmitting(true)
    setStatus(null)

    try {
      const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, comment }),
      })

      if (!res.ok) {
        const err = await res.json()
        setStatus({ msg: 'Error: ' + err.message, error: true })
      } else {
        setStatus({ msg: 'Thank you for your feedback!', error: false })
        setName('')
        setRating(0)
        setComment('')
        fetchComments()
      }
    } catch (err) {
      setStatus({ msg: 'Error: ' + err.message, error: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="portfolio-app">

      <div className="w3-top">
        <div className="w3-bar w3-black w3-padding w3-card" style={{letterSpacing:'4px'}}>
          <a href="#home" className="w3-bar-item w3-button">Chelsea Portfolio</a>
          <div className="w3-right w3-hide-small">
            <a href="#home" className="w3-bar-item w3-button">Home</a>
            <a href="#about" className="w3-bar-item w3-button">About</a>
            <a href="#education" className="w3-bar-item w3-button">Education</a>
            <a href="#goals" className="w3-bar-item w3-button">Goals</a>
            <a href="#rate-section" className="w3-bar-item w3-button">Rate Me</a>
          </div>
        </div>
      </div>

    
      <header id="home" className="w3-container w3-white">
        <div className="w3-content" style={{maxWidth:'1200px'}}>
          <div className="w3-row-padding" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
            <div className="w3-col l7 m12">
              <h1 className="w3-xxxlarge"><b>Chelsea Portfolio</b></h1>
              <p className="w3-xlarge">by Chelsea Hillary M. Nacalaban</p>
              <div className="w3-margin-top" style={{fontSize:'28px'}}>
                <a href="https://www.facebook.com/share/1AY7KW44ke/" target="_blank" style={{color:'black', marginRight:'20px'}}><i className="fa fa-facebook-official"></i></a>
                <a href="https://www.instagram.com/chelsxe" target="_blank" style={{color:'black', marginRight:'20px'}}><i className="fa fa-instagram"></i></a>
                <a href="https://www.linkedin.com/in/chelsea-hillary-nacalaban-116a70241/" target="_blank" style={{color:'black'}}><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            <div className="w3-col l5 m12 w3-center">
              <img src="Pictures/Image (3).jpg" className="w3-image" style={{width:'100%', maxWidth:'600px', borderRadius:'20px'}} />
            </div>
          </div>
        </div>
      </header>

    
      <div id="about">
        <div className="w3-row">
          <div className="w3-col m6 w3-padding-large w3-center">
            <img src="Pictures/Image (2).jpg" alt="Chelsea Hillary" className="w3-round w3-image" style={{width:'100%', maxWidth:'500px', height:'auto'}} />
          </div>
          <div className="w3-col m6 w3-padding-large">
            <h1 className="w3-center"><b>About Me</b></h1><br />
            <p>
              Hi! I'm <strong>Chelsea Hillary M. Nacalaban</strong>, a Computer Science student specializing in <b>Forensics and Cyber Security</b> at Asia Pacific College. Exploring new ideas, designs, and innovations is something I really enjoy doing.
            </p>
          </div>
        </div>
      </div>

    
      <div className="w3-container w3-light-grey" id="education">
        <div className="w3-content" style={{maxWidth:'1200px'}}>
          <div className="w3-row-padding" style={{display:'flex', alignItems:'center', flexWrap:'wrap'}}>
            <div className="w3-col l4 m12">
              <h2><b>Education</b></h2>
              <p className="w3-xlarge" style={{lineHeight:'1.6'}}>
                Currently taking <b>BS Computer Science</b> specializing in <b>Cybersecurity and Forensics</b> at APC.
              </p>
            </div>
            <div className="w3-col l8 m12">
              <div className="w3-row-padding">
                <div className="w3-half w3-center w3-margin-bottom">
                  <div className="education-img-wrap">
                    <img src="Pictures/Chel1.jpg" className="standard-img" />
                  </div>
                  <p className="w3-large w3-margin-top"><b>Sto Niño Catholic School</b></p>
                </div>
                <div className="w3-half w3-center w3-margin-bottom">
                  <div className="education-img-wrap">
                    <img src="Pictures/Chel2.jpg" className="standard-img" />
                  </div>
                  <p className="w3-large w3-margin-top"><b>Asia Pacific College (STEM)</b></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div id="goals">
        <div className="goals-text">
          <h2><b>Goals & Dreams</b></h2>
          <p>
            My priority is <b>graduating with my Bachelor's degree</b>. Having a good job in the tech industry will be my gateway to achieve my goal of <b>traveling around the world</b>.
          </p>
          <p>
            I'm a firm believer in <b>collecting experiences rather than things</b>. Whether it's tasting local street food, getting lost in a new city, or finally seeing a world-famous view in person, I want to see it all. Being able to watch my <b>K-pop idols perform live</b> is also a big achievement and opportunity I truly treasure.
          </p>
        </div>

        <div className="strip-wrapper">
          <div className="photo-strip">
            {[...goalPhotos, ...goalPhotos].map((src, i) => (
              <img key={i} src={src} alt="goal" />
            ))}
          </div>
        </div>
      </div>

      <div id="rate-section" className="w3-container w3-padding-64 w3-light-grey">
        <div className="w3-content" style={{maxWidth:'600px'}}>
          <h2 className="w3-center"><b>Rate My Portfolio</b></h2>

          <div className="w3-card-4 w3-padding w3-white w3-round w3-margin-top">
            <label><b>Name</b></label>
            <input
              className="w3-input w3-border w3-margin-bottom"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <label><b>Rating (1-5)</b></label>
            <div style={{display:'flex', gap:'6px', alignItems:'center', marginBottom:'16px', marginTop:'4px'}}>
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  title={starLabels[star]}
                  style={{
                    fontSize: '2.2rem',
                    cursor: 'pointer',
                    color: star <= (hovered || rating) ? '#f59e0b' : '#ccc',
                    transition: 'color 0.2s',
                    userSelect: 'none'
                  }}
                >★</span>
              ))}
              {rating > 0 && (
                <span style={{marginLeft:'8px', color:'#666', fontSize:'0.9rem'}}>
                  {starLabels[rating]}
                </span>
              )}
            </div>

            <label><b>Remarks</b></label>
            <textarea
              className="w3-input w3-border w3-margin-bottom"
              placeholder="Share your feedback..."
              rows="4"
              value={comment}
              onChange={e => setComment(e.target.value)}
            />

            <button
              className="w3-button w3-black w3-block"
              onClick={submitFeedback}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            {status && (
              <div className={`w3-panel w3-margin-top ${status.error ? 'w3-red' : 'w3-green'}`}>
                <p>{status.msg}</p>
              </div>
            )}
          </div>

          
          <div className="w3-margin-top">
            <h3 className="w3-center"><b>What Others Say 💬</b></h3>
            {loadingComments ? (
              <p className="w3-center">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="w3-center w3-text-grey">No comments yet. Be the first!</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                  marginTop: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <strong style={{color:'#3B3A30'}}>{c.name}</strong>
                    <StarDisplay rating={c.rating} />
                  </div>
                  <p style={{margin:'8px 0 0', color:'#555'}}>{c.comment}</p>
                  {c.created_at && (
                    <small style={{color:'#aaa'}}>{new Date(c.created_at).toLocaleDateString()}</small>
                  )}
                </div>
              ))
            )}
          </div>

        </div>
      </div>

      <footer className="w3-container w3-black w3-padding-32 w3-center">
        <p>Thank you for visiting my website, Chelsea Hillary M. Nacalaban</p>
      </footer>

    </div>
  )
}

export default App