const app = Vue.createApp({
  data() {
    return {
      isLoved: false
    };
  },
  methods: {
    heartReact() {
      this.isLoved = true;
    }
  }
});

app.mount('#app');