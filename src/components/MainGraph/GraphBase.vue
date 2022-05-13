<template>
    <div class="chart-body">
        <div class="row">
            <div class="col">
                <GraphPerMonth/>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <GraphTopWord/>
            </div>
            <div class="col">
                <GraphBottomWord/>
            </div>
        </div>
    </div>
</template>

<script>
import GraphPerMonth from './GraphPerMonth.vue'
import GraphTopWord from './GraphTopWord.vue'
import GraphBottomWord from './GraphBottomWord.vue'

export default {
    components: {GraphPerMonth, GraphTopWord, GraphBottomWord},
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