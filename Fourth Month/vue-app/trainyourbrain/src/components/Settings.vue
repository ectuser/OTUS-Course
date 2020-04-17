<template>
    <div id="settings">
        <b-form @submit="onSubmit" onSubmit="return false;">
            <b-form-group
                id="input-group-1"
                label="Settings:"
                label-for="input-1"
                :description="`Duration: ${form.duration} minutes`"
            >
                <b-form-input
                    id="input-1"
                    type="range"
                    required
                    min="1" 
                    max="15"
                    v-model="form.duration"
                >
                </b-form-input>   
            </b-form-group>
            <b-form-group
                id="input-group-2"
                :description="`Defficulty: ${form.difficulty}`"
            >
                <b-form-input
                    id="input-2"
                    type="range"
                    required
                    min="1" 
                    max="10"
                    v-model="form.difficulty"
                >
                </b-form-input>   
            </b-form-group>
            <div class="text-left">
                <b-form-checkbox-group
                    id="checkbox-group-1"
                    v-model="form.selectedOperations"
                    :options="operations"
                    name="flavour-1"
                    stacked
                ></b-form-checkbox-group>
            </div>
            <b-button type="submit" variant="primary">Start</b-button>
      </b-form>
    </div>
</template>

<script>
export default {
    name: 'Settings',
    data(){
        return({
            operations : [
                "addition",
                "substuction",
                "multiplication",
                "division",
                "exponetiation"
            ],
            form : {
                message : "",
                duration : "7",
                difficulty : "5",
                selectedOperations : []
            }
        });
    },
    methods : {
        onSubmit(){
            
        }
    }

}
</script>
<style>
</style>



