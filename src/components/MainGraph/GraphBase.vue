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
        </div>
    </div>
</template>

<script>
import GraphScore from './GraphScore.vue'

export default {
    components: { GraphScore }
}

</script>

<style scoped>
.chart-body {
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