// 1. Initialize the Supabase Client
const { createClient } = supabase;

const _supabase = createClient('https://oukjcvftqmasquxoypbp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a2pjdmZ0cW1hc3F1eG95cGJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTE1MDQsImV4cCI6MjA4NjM4NzUwNH0.iZT3dEZ8Iuuxgt1k_8L-xf9Mo7xJoYQ-bgrBz3OVPZ0');

const app = Vue.createApp({
  data() {
    return {
      feedbackList: [], // Stores data from the DB
      newName: '',
      newRating: 5,
      newComment: ''
    };
  },
  async mounted() {
    // READ: Get data when the page loads
    this.fetchFeedback();
  },
  methods: {
    // GET Request via Supabase REST API
    async fetchFeedback() {
      const { data, error } = await _supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) this.feedbackList = data;
    },
    
    // POST Request via Supabase REST API
    async submitFeedback() {
      if (!this.newName || !this.newComment) {
        alert("Please fill in all fields!");
        return;
      }

      const { error } = await _supabase
        .from('comments')
        .insert([
          { 
            name: this.newName, 
            rating: this.newRating, 
            comment: this.newComment 
          }
        ]);

      if (!error) {
        alert("Thank you for the feedback!");
        this.newName = '';
        this.newComment = '';
        this.fetchFeedback(); // Refresh the list automatically
      } else {
        console.error("Error submitting:", error.message);
      }
    }
  }
});

app.mount('#app');