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
      <ThoughtItem v-for="(thought, index) in user.thoughts" 
                    :key="index" :thought="thought" 
                    :user="user.userName" @favourite="toggleFavourite" />
  </div>
  <CreateThoughtPanel @saveThought="saveNewThought" />
</template>

<script>
import ThoughtItem from "./ThoughtItem"
import CreateThoughtPanel from "./CreateThoughtPanel"

export default {
    name: "UserProfile",
    data(){
    return {
      followers: 0,
      user: {
        id: 1,
        userName: "BMarge",
        firstName: "Margharet",
        lastName: "Black",
        email: "test@gmail.com",
        isAdmin: true,
        thoughts: [
            { id: 2, time: new Date("2018.07.03.").toDateString(), content: "sooo....much...fun......."},
            { id: 1, time: new Date("11. 03. 2017").toDateString(), content: "hmm.. yea, living is fun"},
            { id: 0, time: null, content: "why not just die"},
        ]
      }
    }
  },
  watch: {
    followers(newCount, oldCount){
      if (oldCount < newCount){
        console.log(this.user.userName + "has gained a new follower!! The count is now: " + this.followers)
      }
    }
  },
  computed: {
    fullname(){return `${this.user.firstName} ${this.user.lastName}`}
  },
  methods: {
    increaseFollowers(){this.followers++},
    decreaseFollowers(){this.followers--},
    toggleFavourite(id){
      alert(`favourited thought's number: ${id}`)
    },
    saveNewThought(thought){
        this.user.thoughts.unshift({id: this.user.thoughts[0].id+1, time: thought.time, content: thought.content });
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