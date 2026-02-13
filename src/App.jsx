import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import './design.css'; 

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [form, setForm] = useState({ name: '', rating: '5', comment: '' });
  const [isLoved, setIsLoved] = useState(false);

  
  useEffect(() => {
    fetchFeedback();
  }, []);

  async function fetchFeedback() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setFeedbackList(data);
  }

  async function submitFeedback() {
    if (!form.name || !form.comment) return alert("Fill all fields!");
    
    const { error } = await supabase.from('comments').insert([form]);
    if (!error) {
      alert("Success!");
      setForm({ name: '', rating: '5', comment: '' });
      fetchFeedback();
    }
  }

  return (
    <div>
      {/* Paste your HTML here, but change 'class' to 'className' */}
      <nav className="w3-top">...</nav>
      
      {/* Feedback Form Section */}
      <div className="w3-card-4 w3-padding w3-white w3-round">
        <input 
          value={form.name} 
          onChange={(e) => setForm({...form, name: e.target.value})} 
          className="w3-input w3-border" 
          placeholder="Name"
        />
        {/* Add your select and textarea with similar onChange handlers */}
        <button onClick={submitFeedback} className="w3-button w3-black">Submit</button>
      </div>

      {/* List Feedbacks */}
      {feedbackList.map((item) => (
        <div key={item.id} className="w3-panel w3-light-grey">
          <p><strong>{item.name}</strong> ({item.rating}/5)</p>
          <p><i>"{item.comment}"</i></p>
        </div>
      ))}
    </div>
  );
}

export default App;