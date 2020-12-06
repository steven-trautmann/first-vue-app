<template>
  <router-link to="/">
    <h1>navbar kek</h1>
  </router-link>
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

export default {
  name: 'App',
  setup(){
    return {
      users
    };
  }
}
</script>

<style lang="scss">
</style>
