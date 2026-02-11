// 1. Initialize the Supabase Client
const { createClient } = supabase;

const _supabase = createClient('https://oukjcvftqmasquxoypbp.supabase.co', 'your-anon-key');

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