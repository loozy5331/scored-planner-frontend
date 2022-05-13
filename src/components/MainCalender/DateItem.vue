<template>
    <div class="date" :value="dateObj.value">
        <div class="top clearfix">
            <span :class="{'today':dateObj.today, 'other':dateObj.other}"> {{ dateObj.date }} </span>    
            <a class="btn" @click="openModal"> + </a>
        </div>
        <div class="plans" v-if="plans">
            <PlanItem 
                v-for="planObj in plans"
                :key="dateObj.date + planObj.id"
                :planObj="planObj"
                @openModal="$emit('openModal')">
            </PlanItem>
        </div>
        <!-- TODO plans -->
    </div>
</template>

<script>
import PlanItem from './PlanItem'

export default {
    components: {
        PlanItem
    },
    props:[
        "dateObj",
        "plans",
        "showModal"
    ],  
    data: function (){
        return {
        }
    },
    methods:{
        openModal (){
            /* 클릭한 계획의 시간으로 Modal 정보를 갱신 후 열기 */
            this.$store.commit("setModalPlan", 
                {date:`${this.dateObj.value}T00:00`});

            this.$emit("openModal");
        }
    }
}
</script>

<style scoped>
.date {
    position: relative;
}

.date:nth-child(7n + 1) > p {
    color: red;
}

.date:nth-child(7n) > p {
    color: blue;
}

.date:hover {
    background-color: #EC994B;
}

.date:hover > .top > .btn {
    color: #F1EEE9;
    border-width: 2px;
    border-color: #F1EEE9;
}

.top {
    padding: 5px;
    margin-bottom: 10px;
}

.top::after {
    clear: both;

    /* to keep height */
    content: " ";
    display: block; 
    height: 0; 
}

.top > span {
    float: left;
}

.btn {
    float: right;
    width: 20px;

    border: 1px solid #15133C;
    border-radius: 50%;

    text-align: center;
    font-size: 23px;
    line-height: 20px;
    color: #15133C;
}

.plans {
    position:absolute;
    width: 100%;
    height: 100px;

    overflow-y: scroll;
}

.plans::-webkit-scrollbar {
  display: none;
}

/* points */
.today {
    position: relative;
}

.today::before {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: -1;
    display: block;
    width: 35px;
    height: 35px;
    background-color: pink;
    transform: translate(-50%, -50%);

    border-bottom-right-radius: 50%;
    content: '';
}

.other {
    opacity: .3;
}

</style>
