<template>
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
</template>

<script>
export default {
    name: "CreateThoughtPanel",
    data(){
        return {
            thoughtTypes: [{value: "draft", name: "Draft"}, {value: "suicidal", name: "Suicidal"}],
            newThoughtContent: "",
            selectedThoughtType: "draft",
        }
    },
    computed: {
        newThoughtContendCount(){return this.newThoughtContent.length}
    },
    methods: {
        saveNewThought(){
        if (this.newThoughtContent !== "" && this.selectedThoughtType !== "draft"){

            this.$emit("saveThought", {time: new Date().toDateString(), content: this.newThoughtContent });
            this.newThoughtContent = "";
      }
}
    }

}
</script>

<style lang="scss" scoped>
    .exceeded {
        border: solid 0.2rem red;
      }
</style>