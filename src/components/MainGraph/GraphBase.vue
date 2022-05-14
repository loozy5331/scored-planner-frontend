<template>
    <div class="chart-body">
        <div class="row">
            <div class="col">
                <GraphScore :pivot="'month'"/>
            </div>
            <div class="col">
                <GraphScore :pivot="'day'"/>
            </div>
            <div class="col">
                <GraphScore :pivot="'week'"/>
            </div>
            <div class="col">
                <GraphPlan :pivot="'ASC'"/>
            </div>
            <div class="col">
                <GraphPlan :pivot="'DESC'"/>
            </div>
            <div class="col">
                <GraphPlan :pivot="'freq'"/>
            </div>
        </div>
    </div>
</template>

<script>
import GraphScore from './GraphScore.vue'
import GraphPlan from './GraphPlan.vue'

export default {
    components: { GraphScore, GraphPlan }
}

</script>

<style scoped>
.chart-body {
    position:absolute;
    height: 100%;
    overflow-y: scroll;
    padding: 50px;
}
.row {
    display: block;
    height: 400px;

    margin-bottom: 35px;
}

.row::after{
    clear: both;
}

.col {
    float: left;
    width: 40%;

    margin-left: 50px;
}
</style>