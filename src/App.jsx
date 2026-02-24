import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Edit3, Send, Facebook, Instagram, Linkedin } from 'lucide-react';
import './design.css';

// Initialize Supabase
const SUPABASE_URL = 'https://oukjcvftqmasquxoypbp.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a2pjdmZ0cW1hc3F1eG95cGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE1MDQsImV4cCI6MjA4NjM4NzUwNH0.iZT3dEZ8Iuuxgt1k_8L-xf9Mo7xJoYQ-bgrBz3OVPZ0';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const goalPhotos = [
  'Pictures/AIR.jpg', 'Pictures/air2.jpg', 'Pictures/air1.jpg',
  'Pictures/Image (6).jpg', 'Pictures/Image (7).jpg', 'Pictures/Image (10).jpg',
  'Pictures/Image (11).jpg', 'Pictures/Image (13).jpg'
];

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setEntries(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const { error } = await supabase.from('comments').insert([
      { name: form.name, rating: parseInt(form.rating), comment: form.comment }
    ]);

    if (!error) {
      setStatus({ msg: 'Thank you for your feedback!', error: false });
      setForm({ name: '', rating: 5, comment: '' });
      fetchEntries(); 
    } else {
      setStatus({ msg: 'Error: ' + error.message, error: true });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this entry?")) {
      await supabase.from('comments').delete().eq('id', id);
      fetchEntries();
    }
  };

  const handleUpdate = async (id, oldComment) => {
    const newComment = prompt("Edit your message:", oldComment);
    if (newComment && newComment !== oldComment) {
      await supabase.from('comments').update({ comment: newComment }).eq('id', id);
      fetchEntries();
    }
  };

  return (
    <div className="w3-light-grey">
      {/* RESTORED NAVIGATION */}
      <nav className="w3-bar w3-black w3-card w3-top" style={{ letterSpacing: '4px' }}>
        <a href="#home" className="w3-bar-item w3-button">Chelsea Portfolio</a>
        <div className="w3-right w3-hide-small">
          <a href="#home" className="w3-bar-item w3-button">Home</a>
          <a href="#about" className="w3-bar-item w3-button">About</a>
          <a href="#goals" className="w3-bar-item w3-button">Goals</a>
          <a href="#rate" className="w3-bar-item w3-button">Rate Me</a>
        </div>
      </nav>

      {/* RESTORED HEADER */}
      <header id="home" className="w3-container w3-padding-64 w3-white w3-center" style={{ marginTop: '50px' }}>
        <h1 className="w3-xxxlarge"><b>Chelsea Portfolio</b></h1>
        <p className="w3-xlarge">by Chelsea Hillary M. Nacalaban</p>
        <div className="w3-padding-16">
          <Facebook className="w3-margin-right" style={{ cursor: 'pointer' }} />
          <Instagram className="w3-margin-right" style={{ cursor: 'pointer' }} />
          <Linkedin style={{ cursor: 'pointer' }} />
        </div>
      </header>

      {/* RESTORED ABOUT SECTION */}
      <div className="w3-content w3-padding-64" id="about">
        <h2 className="w3-center"><b>About Me</b></h2>
        <p className="w3-center w3-large">
          Hi! I'm <strong>Chelsea Hillary M. Nacalaban</strong>, a Computer Science student specializing in <b>Forensics and Cyber Security</b> at Asia Pacific College.
        </p>
      </div>

      {/* RESTORED GOALS SECTION (DARK GREY) */}
      <div className="w3-container w3-padding-64 w3-dark-grey" id="goals">
        <div className="w3-content">
          <h2 className="w3-center"><b>Goals & Dreams</b></h2>
          <div className="w3-row-padding w3-margin-top">
            {goalPhotos.map((src, i) => (
              <div key={i} className="w3-col l3 m6 w3-margin-bottom">
                <img src={src} alt="Goal" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RESTORED RATE SECTION DESIGN */}
      <div className="w3-content w3-padding-64" id="rate">
        <div className="w3-container w3-white w3-padding-32 w3-card-4" style={{ borderRadius: '15px' }}>
          <h2 className="w3-center"><b>Rate My Portfolio</b></h2>

          <form onSubmit={handleSubmit} className="w3-section">
            <label><b>Name</b></label>
            <input 
              className="w3-input w3-border w3-round w3-margin-bottom" 
              type="text" 
              placeholder="Please Input Your Name" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
            />

            <label><b>Rating (1-5)</b></label>
            <select 
              className="w3-select w3-border w3-margin-bottom" 
              value={form.rating} 
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Great</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>

            <label><b>Remarks</b></label>
            <textarea 
              className="w3-input w3-border w3-round w3-margin-bottom" 
              rows="4" 
              placeholder="Please Leave a message..." 
              value={form.comment} 
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
            ></textarea>

            <button type="submit" className="w3-button w3-black w3-block w3-round-large" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <Send size={18} /> Post Message
            </button>
          </form>

          {status && (
            <div className={`w3-panel w3-round w3-margin-top ${status.error ? 'w3-red' : 'w3-green'}`}>
              <p>{status.msg}</p>
            </div>
          )}

          <hr style={{ borderTop: '2px solid #eee', margin: '40px 0' }} />

          {/* RECENT MESSAGES LIST */}
          <div className="w3-margin-top">
            <h3 style={{ color: '#111' }}><b>Recent Messages ({entries.length})</b></h3>
            <div style={{ marginTop: '20px' }}>
              {loading ? (
                <p className="w3-center">Loading entries...</p>
              ) : entries.length === 0 ? (
                <p className="w3-center w3-text-grey">No entries yet.</p>
              ) : (
                entries.map((entry) => (
                  <div key={entry.id} style={{ background: '#121212', color: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '20px', borderLeft: '5px solid #00ff88' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '45px', height: '45px', background: '#00ff88', color: '#000', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '15px' }}>
                          {entry.name ? entry.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>{entry.name}</strong>
                          <div style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(entry.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Edit3 size={18} style={{ cursor: 'pointer', color: '#00ff88' }} onClick={() => handleUpdate(entry.id, entry.comment)} />
                        <Trash2 size={18} style={{ cursor: 'pointer', color: '#ff4d4d' }} onClick={() => handleDelete(entry.id)} />
                      </div>
                    </div>
                    <div style={{ color: '#f59e0b', margin: '10px 0' }}>{'★'.repeat(entry.rating)}{'☆'.repeat(5 - entry.rating)}</div>
                    <p style={{ color: '#ccc', lineHeight: '1.6' }}>{entry.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="w3-container w3-black w3-padding-32 w3-center">
        <p>Thank you for visiting, Chelsea Hillary M. Nacalaban</p>
      </footer>
    </div>
  );
}

export default App;