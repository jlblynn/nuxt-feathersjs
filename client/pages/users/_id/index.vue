<template>
  <div>
    <navigation />
    <h3>Profile for {{ this.$route.params.id }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Navigation from '../../../components/navigation';

export default {
  name: "users-id",
  components: { Navigation },
  computed: {
    ...mapState('auth', { user: 'payload' }),
    id () {
      return this.user.userId
    }
  }
}
</script>

<style>

</style>