<template>
  <div class="container">
    <p>{{ user.userName }} -is- {{ fullname }}</p>
    <p v-if="user.isAdmin">Admin</p>
    <p v-else-if="followers > 10">Not Admin, but has more than 10 followers</p>
    <p v-else>Not Admin</p>
    <strong>Followers: {{followers}}</strong>
    <button @click="increaseFollowers">Increase Followers</button>
    <button @click="decreaseFollowers">Decrease Followers</button>
  </div>
  <div class="thoughts-container">
      <h1>Thoughts</h1>
      <div v-if="user.thoughts">
        <ThoughtItem v-for="(thought, index) in user.thoughts" 
                    :key="index" :thought="thought" 
                    :user="user.userName" @favourite="toggleFavourite" />
      </div>
      <p v-else>There are no thoughts from this user</p>
  </div>
  <CreateThoughtPanel @saveThought="saveNewThought" />
</template>

<script>
import ThoughtItem from "../components/ThoughtItem";
import CreateThoughtPanel from "../components/CreateThoughtPanel";
import { useRoute } from "vue-router";
import {users} from "../assets/users";

export default {
  name: "UserProfile",
  data(){
    return {
      user: users[useRoute().params.userId] || users[0],
      followers: 0,
  }
    },
  computed: {
      fullname(){return `${this.user.firstName} ${this.user.lastName}`},
    },
  watch: {
    followers(newCount, oldCount){
      if (oldCount < newCount){
        console.log(this.user.userName + "has gained a new follower!! The count is now: " + this.followers)
      }
    }
  },
  methods: {
    increaseFollowers(){this.followers++},
    decreaseFollowers(){this.followers--},
    toggleFavourite(id){
      alert(`favourited thought's number: ${id}`)
    },
    saveNewThought(thought){
      if (this.user.thoughts.legnth > 0){
        this.user.thoughts.unshift({id: this.user.thoughts[0].id+1, time: thought.time, content: thought.content });
      } else {
        this.user.thoughts.unshift({id: 0, time: thought.time, content: thought.content });
      }
    }
  },
  mounted() {
    return this.increaseFollowers();

  },
  components: {
    ThoughtItem,
    CreateThoughtPanel
  }
}
</script>

<style lang="scss" scoped>
    .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    }
</style>