<template>
    <div class="plan clear" 
        :class="{
            'low': planObj.score <= 3, 
            'low-mid': planObj.score > 3 && planObj.score <= 5,
            'high-mid': planObj.score > 5 && planObj.score <= 7,
            'high':planObj.score > 7
        }" 
        @click="setModalPlan">

        <div class="title"> {{ planObj.title }} </div>
        <div class="score"> {{ planObj.score }} </div>
    </div>
</template>

<script>
export default {
    props: [
        "planObj"
    ],
    methods: {
        setModalPlan() {
            // 선택한 계획으로 Modal 초기화 및 열기
            this.$store.commit("setModalPlan", this.planObj);
            this.$emit('openModal');
        }
    }
}
</script>

<style scoped>
.plan {
    display: block;
    padding: 3px;
    margin: 5px 10px;

    border-radius: 5px;
}

.title {
    float: left;
    width: 80%;

    color: white;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.score {
    float: right;
    width: 15px;
    height: 15px;

    border: 1px solid white;
    border-radius: 50%;

    color: white;
    font-size: 15px;
    text-align: center;
}
</style>


<style>
/* points */
.high {
    background-color: #FF6B6B;
}

.high-mid {
    background-color: #FFD93D;
}

.low-mid {
    background-color: #6BCB77;
}

.low {
    background-color: #4D96FF;
}
</style>