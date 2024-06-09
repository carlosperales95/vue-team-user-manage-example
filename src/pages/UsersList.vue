<template>
<button @click="confirmInput">Confirm</button>
<button @click="saveChanges">Save Chngs</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  data() {
    return {
      changesSaved: false
    };
  },
  inject: ['users'],
  methods: {
    confirmInput() {
      console.log("Confirmed - rerouting...");
      this.$router.push('/teams');
      // this.$router.back();
      // this.$router.forward();
      // ...
    },
    saveChanges() {
      this.saveChanges = true;
    }
  },
  beforeRouteEnter(to, from , next) {
    console.log('UsersList Component beforeRouteEnter');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList Component beforeRouteLeave');
    console.log(to, from);
    if(this.changesSaved) next();
    else {
      const userWannaLeave = confirm('Are you sure? You did not save changes');
      next(userWannaLeave)
    }
  },
  unmounted() {
    console.log('unmounted!');
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>