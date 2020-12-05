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
  <div>
    <form style="display: flex; flex-direction: column; margin: 5rem" 
    @submit.prevent="saveNewThought">
      <label for="newThought">new thought: ({{newThoughtContendCount}}:180)</label>
      <textarea name="newThought" rows="4" v-model="newThoughtContent" :class="{'exceeded': newThoughtContendCount > 180}"></textarea>
      <label for="types">Types:</label>
      <select name="types" v-model="selectedThoughtType" >
        <option :value="option.value" v-for="(option, index) in thoughtTypes" :key="index">
          {{option.name}}
        </option>
      </select>
      <button>Save Thought</button>
    </form>
  </div>
</template>

<script>
import ThoughtItem from "./ThoughtItem"

export default {
    name: "UserProfile",
    data(){
    return {
      thoughtTypes: [{value: "draft", name: "Draft"}, {value: "suicidal", name: "Suicidal"}],
      followers: 0,
      newThoughtContent: "",
      selectedThoughtType: "draft",
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
    fullname(){return `${this.user.firstName} ${this.user.lastName}`},
    newThoughtContendCount(){return this.newThoughtContent.length}
  },
  methods: {
    increaseFollowers(){this.followers++},
    decreaseFollowers(){this.followers--},
    toggleFavourite(id){
      alert(`favourited thought's number: ${id}`)
    },
    saveNewThought(){
      if (this.newThoughtContent !== "" && this.selectedThoughtType !== "draft"){
        this.user.thoughts.unshift({id: this.user.thoughts[0].id+1, time: new Date().toDateString(), content: this.newThoughtContent });
        this.newThoughtContent = "";
      }
    }
  },
  mounted() {
    return this.increaseFollowers();
  },
  components: {
    ThoughtItem
  }
}
</script>

<style lang="scss" scoped>
    .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    }

    .exceeded {
        border: solid 0.2rem red;
      }
</style>