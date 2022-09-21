import feathersClient from '../feathers-client';
import feathersVuex, { initAuth } from 'feathers-vuex';

const { service, auth } = feathersVuex(feathersClient, { idField: '_id' });

export const state = () => ({
  user: {
    userId: null,
    email: null,
    isLoggedIn: false
  }
});

export const getters = {
  getisLoggedIn: state => {
    return state.user.isLoggedIn
  },
  getEmail: state => {
    return state.user.email
  }
}

export const mutations = {
  SET_USER (state, payload) {
    for(const key in state.user) {
      state.user[key] = payload[key]
    }
  }
};

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }) {
    return initAuth({
      commit,
      dispatch,
      req,
      moduleName: 'auth',
      cookieName: 'feathers-jwt'
    })
  },
  async Login({ commit }, data) {
    let obj = new Object()
    await feathersClient.authenticate( data )
    .then( response => {
      obj.accessToken = response.accessToken
      return feathersClient.passport.verifyJWT( response.accessToken )
    })
    .then( payload => {
      obj.userId = payload.userId
      return feathersClient.service('users').get( payload.userId )
    })
    .then( user => {
      obj.email = user.email
      obj.userId = user._id
      obj.isLoggedIn = true

      feathersClient.set('user', user)

      commit('SET_USER', obj)
      console.log(store.state.user.email)
      //$nuxt._router.replace('/secret', null, null)
    })
    .catch(error => {
      console.log(error.message)
    })
    Promise.resolve()
  }
};

export const plugins = [
  service('users'),
  auth({
    state: { publicPages: ['index', 'authenticate'] },
    userService: 'users'
  })
];
