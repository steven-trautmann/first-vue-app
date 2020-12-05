<template>
    <div class="thought" @click="favouriteThought(thought.id)">
        <p>the thought's owner: {{user}}</p>
        <p v-if="thought.time">thought's time: {{thought.time}}</p>
        <p v-else>this thought's does not have time</p>
        <p>{{thought.content}}</p>
    </div>
</template>

<script>
export default {
    name: "ThoughtItem",
    props: {
        thought: {type: Object, required: true},
        user: {type: String, required: true}
    },
    methods: {
        favouriteThought(id){
            this.$emit("favourite", id);
        }
    }

}
</script>

<style lang="scss" scoped>
.thought{
    background: $thoughtColor;
    margin: 2rem;
}
</style>