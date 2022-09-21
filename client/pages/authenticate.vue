<template>
  <section>
    <navigation />
    <h1>Login or Signup</h1>
    <form class="auth-form">
      <ul>
        <li><input v-model="email" placeholder="email" required /></li>
        <li><input v-model="password" placeholder="password" type="password" required /></li>
      </ul>
      <div v-if="email.length >= 7 && password.length >= 8">
        <button :class="{ 'is-loading': isLoggingIn }" @click.prevent="login">
          Login
        </button>
         or 
        <button :class="{ 'is-loading': isSigningUp }" class="ghost" @click.prevent="signup">
          Sign up
        </button>
      </div>
      <br>
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" :key="error.message" >{{ error }}</li>
        </ul>
      </p>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import Navigation from '../components/navigation';

export default {
  name: 'Login',
  components: { Navigation },

  data() {
    return {
      user: {},
      email: '',
      password: '',
      isLoggingIn: false,
      isSigningUp: false,
      errors: []
    };
  },

  methods: {
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', ['create']),

    async login() {
      // Clear previous errors
      this.errors = []
      this.isLoggingIn = true;
      const credentials = { email: this.email, password: this.password };
      await this.$store.dispatch('Login', { ...credentials, strategy: 'local'} )
      .then(() => {
        this.isLoggingIn = false;
        console.log(this.$store.state.user)
        this.$router.push('/secret');
      })
      .catch(e => {
        this.isLoggingIn = false;
        this.errors.push(e.message)
        console.log("Authentication Error", e);
      })

      
      //const credentials = { email: this.email, password: this.password };
      //this.isLoggingIn = true;
      //await this.authenticate({ ...credentials, strategy: 'local' })
      //.then(() => {
      //  this.isLoggingIn = false;
      //  this.user = { email: this.email, isLoggedIn: true };
      //  this.$store.commit('addUser', this.user);
      //  this.$router.push('/secret');
      //})
      //.catch(e => {
      //  this.isLoggingIn = false;
      //  this.errors.push(e.message)
      //  console.log("Authentication Error", e);
      //})
    },

    async signup() {
      // Clear previous errors
      this.errors = []
      const credentials = { email: this.email, password: this.password };
      this.isSigningUp = true;
      await this.create(credentials)
      .catch(e => {
        this.isSigningUp = false;
        this.errors.push(e)
        console.log("Authentication Error", e);
      })
      await this.authenticate({ ...credentials, strategy: 'local' })
      .then(() => {
        this.isSigningUp = false;
        this.user = { email: this.email, isLoggedIn: true };
        this.$store.commit('addUser', this.user);
        console.log(this.user)
        this.$router.push('/secret');
      })
      .catch(e => {
        console.log("Authentication Error", e);
      })
    }
  }
}
</script>

<style>
.auth-form ul {
  list-style: none;
  padding: 0;
}

.auth-form li + li {
  margin-top: .5em;
}

</style>

