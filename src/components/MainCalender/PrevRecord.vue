<template>
    <div class="prev-record clear">
        <div class="date-score">
            <div class="p-date">{{convert_date(prevRecord.date)}}</div>
            <div class="p-score" 
                :class="{
                    'low': prevRecord.score <= 3, 
                    'low-mid': prevRecord.score > 3 && prevRecord.score <= 5,
                    'high-mid': prevRecord.score > 5 && prevRecord.score <= 7,
                    'high':prevRecord.score > 7
                }">{{prevRecord.score}}</div>
        </div>
        <div class="p-memo">{{prevRecord.memo}}</div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    props: [
        "prevRecord"
    ],
    methods: {
        convert_date(strDate) {
            // YYYY-MM-DD 식으로 날짜 변경
            var date = new Date(strDate);

            return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        },
    }
}
</script>

<style scoped>.prev-records::after{
    clear: both;
}

.prev-record {
    float: left;
    padding: 10px;
    margin-left: 10px;

    /* background-color: gray; */
    border: 1px solid gray;
    border-radius: 5px;

    margin: 5px;
}
.prev-record::after {
    clear: both;
}

.prev-date-score {
    float: left;
    width: 100%;
}

.p-date {
    float: left;

    font-size: 20px;
    line-height: 25px;
    margin-right: 10px;
}

.p-score {
    float: left;
    width: 25px;
    height: 25px;

    /* border: 2px solid black; */
    border-radius: 50%;

    font-size: 20px;
    line-height: 25px;
    text-align: center;
}

.prev-record > .p-memo {
    float: left;
    /* max-width: 100px; */
    padding: 5px;
}
</style>