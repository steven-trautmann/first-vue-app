<template>
    <form style="display: flex; flex-direction: column; margin: 5rem" 
    @submit.prevent="saveNewThought">
        <label for="newThought">new thought: ({{newThoughtContendCount}}:180)</label>
        <textarea name="newThought" rows="4" v-model="state.newThoughtContent" :class="{'exceeded': newThoughtContendCount > 180}"></textarea>
        <label for="types">Types:</label>
        <select name="types" v-model="state.selectedThoughtType" >
        <option :value="option.value" v-for="(option, index) in state.thoughtTypes" :key="index">
            {{option.name}}
        </option>
        </select>
        <button>Save Thought</button>
    </form>
</template>

<script>
import {reactive, computed} from "vue";

export default {
    name: "CreateThoughtPanel",
    setup(props, ctx){
        const state = reactive({
            thoughtTypes: [{value: "draft", name: "Draft"}, {value: "suicidal", name: "Suicidal"}],
            newThoughtContent: "",
            selectedThoughtType: "draft",
        });

        const newThoughtContendCount =  computed(() => {return state.newThoughtContent.length})

        function saveNewThought(){
            if (state.newThoughtContent !== "" && state.selectedThoughtType !== "draft"){
                ctx.emit("saveThought", {time: new Date().toDateString(), content: state.newThoughtContent });
                state.newThoughtContent = "";
            }
        }

        return {state, newThoughtContendCount, saveNewThought};
    }
}
</script>

<style lang="scss" scoped>
    .exceeded {
        border: solid 0.2rem red;
      }
</style>