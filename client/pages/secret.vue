<template>
  <section>
    <navigation />
    <h1>This place is secret {{ email }}</h1>
    <li v-if="!isUser">NEG</li>
    <li v-if="isUser">TRUE</li>
    <p>This section requires user authentication. There's nothing else going on here.</p>
    <button @click.prevent="exit">Logout</button>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from '../components/navigation';

export default {
  name: 'Secret',
  components: { Navigation },
  computed: {
    email () {
      return this.$store.state.user.email;
    },
    isUser () {
      return this.$store.state.user.isLoggedIn;
    } 
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async exit() {
      await this.logout();
      this.$store.commit('SET_USER', { email: null, isLoggedIn: false});
      this.$router.push('/');
    }
  }
}
</script>
