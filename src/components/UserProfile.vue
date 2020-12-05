<template>
  <div class="container">
    <p>{{ user.userName }} -is- {{ fullname }}</p>
    <strong>Followers: {{followers}}</strong>
    <button @click="increaseFollowers">Increase Followers</button>
    <button @click="decreaseFollowers">Decrease Followers</button>
  </div>
</template>

<script>
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
        isAdmin: true
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
  },
  mounted() {
    return this.increaseFollowers();
  }
}
</script>

<style scoped>
    .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    }
</style>