<template>
  <ul class="navigation">
    <li><nuxt-link exact to="/">Home</nuxt-link></li>
    <li v-if="!isAuthenticated"><nuxt-link to="/authenticate">Authenticate</nuxt-link></li>
    <li v-if="isAuthenticated">
      <nuxt-link to="/secret">Secret Section</nuxt-link>
      <p>Logged in as: <nuxt-link to="/users">{{ userEmail }}</nuxt-link></p>
      <button @click.prevent="exit">Logout</button>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: 'Navigation',

  computed: {
    ...mapState('auth', ['accessToken']),
    isAuthenticated() {
      //return this.accessToken;
      return this.$store.state.user.isLoggedIn;
    },
    userEmail () {
      return this.$store.state.user.email;
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

<style>
.navigation {
  border-bottom: 1px solid #F2F2F2;
  display: flex;
  list-style: none;
  margin: 0 -2em 1em;
  padding: 1em;
}

.navigation li + li {
  margin-left: 1.5em;
}

p {
  display: inline;
}

.navigation a {
  color: #666;
  text-decoration: none;
}

.navigation .nuxt-link-active {
  color: coral;
  text-decoration: underline;
}
</style>

