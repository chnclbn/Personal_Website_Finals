\import { useState, useEffect } from 'react'
import { Trash2, Edit3 } from 'lucide-react'
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
      const data = await res.json()
      setComments(Array.isArray(data) ? data : (data.comments || []))
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      try {
        await fetch(`${APIURL}/comments/${id}`, { method: 'DELETE' });
        fetchComments();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleUpdate = async (id, currentComment) => {
    const newComment = prompt("Edit your remarks:", currentComment);
    if (newComment && newComment !== currentComment) {
      try {
        await fetch(`${APIURL}/comments/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ comment: newComment }),
        });
        fetchComments();
      } catch (err) {
        console.error("Update failed", err);
      }
    }
  };

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
        setName('')
        setRating(0)
        setComment('')
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
    <div className="w3-light-grey" style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <nav className="w3-bar w3-black w3-card">
        <span className="w3-bar-item">Chelsea Portfolio</span>
        <div className="w3-right">
          <a href="#" className="w3-bar-item w3-button">Home</a>
          <a href="#about" className="w3-bar-item w3-button">About</a>
          <a href="#goals" className="w3-bar-item w3-button">Goals</a>
          <a href="#rate" className="w3-bar-item w3-button">Rate Me</a>
        </div>
      </nav>

      <header className="w3-container w3-padding-64 w3-center w3-white">
        <h1 className="w3-jumbo"><b>Chelsea Portfolio</b></h1>
        <p>by Chelsea Hillary M. Nacalaban</p>
      </header>

      <div className="w3-content w3-padding-64" id="about">
        <h2 className="w3-center">About Me</h2>
        <p className="w3-center">Hi! I'm Chelsea Hillary M. Nacalaban, a Computer Science student specializing in Forensics and Cyber Security at Asia Pacific College.</p>
      </div>

      <div className="w3-content w3-padding-64" id="goals">
        <h2 className="w3-center">Goals & Dreams</h2>
        <div className="w3-row-padding">
          {goalPhotos.map((src, i) => (
            <div key={i} className="w3-col l3 m6 w3-margin-bottom">
              <img src={src} alt="Goal" style={{ width: '100%', borderRadius: '8px' }} />
            </div>
          ))}
        </div>
      </div>

      <div className="w3-content w3-padding-64" id="rate">
        <div className="w3-container w3-white w3-padding-32 w3-card-4" style={{ borderRadius: '15px' }}>
          <h2 className="w3-center">Rate My Portfolio</h2>
          
          <div className="w3-section">
            <label><b>Name</b></label>
            <input className="w3-input w3-border w3-round" value={name} placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="w3-section">
            <label><b>Rating (1-5)</b></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  style={{
                    fontSize: '2.2rem',
                    cursor: 'pointer',
                    color: star <= (hovered || rating) ? '#00ff88' : '#ccc',
                    transition: '0.2s'
                  }}
                >★</span>
              ))}
              <span className="w3-text-grey">{starLabels[hovered || rating]}</span>
            </div>
          </div>

          <div className="w3-section">
            <label><b>Remarks</b></label>
            <textarea className="w3-input w3-border w3-round" style={{ height: '100px' }} value={comment} placeholder="Share your feedback..." onChange={(e) => setComment(e.target.value)} />
          </div>

          <button className="w3-button w3-black w3-block w3-round-large" style={{ fontWeight: 'bold' }} onClick={submitFeedback} disabled={isSubmitting}>
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
              {loadingComments ? (
                <p className="w3-center">Loading entries...</p>
              ) : comments.length === 0 ? (
                <p className="w3-center w3-text-grey">No entries yet. Be the first to sign!</p>
              ) : (
                comments.map((c, i) => (
                  <div key={c.id || i} style={{ 
                    background: '#121212', 
                    color: '#fff', 
                    borderRadius: '12px', 
                    padding: '20px', 
                    marginBottom: '20px',
                    borderLeft: '5px solid #00ff88'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <div style={{ 
                          width: '45px', height: '45px', background: '#00ff88', color: '#000', 
                          borderRadius: '10px', display: 'flex', alignItems: 'center', 
                          justifyContent: 'center', fontWeight: 'bold', marginRight: '15px', fontSize: '1.2rem'
                        }}>
                          {c.name ? c.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>{c.name}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#888' }}>
                            {c.date ? new Date(c.date).toLocaleString() : 'Recently'}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleUpdate(c.id, c.comment)} style={{ color: '#00ff88', border: 'none', background: 'none', cursor: 'pointer' }}>
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDelete(c.id)} style={{ color: '#ff4d4d', border: 'none', background: 'none', cursor: 'pointer' }}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <StarDisplay rating={c.rating} />
                    <p style={{ color: '#ccc', lineHeight: '1.6', marginTop: '10px' }}>{c.comment}</p>
                  </div>
                ))
              )}
            </div>
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