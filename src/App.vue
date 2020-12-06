<template>
  <router-link to="/">
    <h1>navbar kek</h1>
  </router-link>
  <h2 v-if="user">You are "logged in" with: {{user.userName}}</h2>
  <router-link 
  v-for="user in users" 
  :to="{name: 'UserProfile', params: {userId: user.id} }" 
  :key="user.id">
    {{user.userName}} | 
  </router-link>
  <router-view :key="$route.path" />
</template>

<script>
import {users} from "./assets/users";
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  name: 'App',
  setup(){
    const store = useStore();
    const user = computed(() => {return store.state.User.user})
    return {
      users,
      user
    };
  }
}
</script>

<style lang="scss">
</style>
