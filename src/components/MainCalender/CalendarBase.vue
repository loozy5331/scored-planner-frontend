<template>
    <div class="wrapper">
        <!-- header -->
        <div class="calendar-header"> 
            <div class="year-month" @click="testFunc">{{ yearMonth }} 점수판</div>
            <div class="month-nav">
                <div class="prev-month" @click="prevMonth">이전 달</div>
                <div class="curr-month" @click="goToday">지금</div>
                <div class="next-month" @click="nextMonth">다음 달</div>
            </div>
        </div>
        <!-- /header -->
        <!-- main -->
        <div class="main">
            <div class="calendar">
                <div class="week">
                    <div class="day" 
                        v-for="(day, i) in days" 
                        :key="i">{{ day }}</div>
                </div>
            </div>
            <div class="dates">
                <DateItem
                    v-for="(dObj, i) in dateObjects" 
                    :key="i + yearMonth"
                    :dateObj="dObj"
                    :plans="$store.state.plans[dObj.value]"
                    @openModal="showModal = true">
                </DateItem>
            </div>
        </div>
        <!-- /main -->
        <Modal 
            v-if="showModal" 
            @closeModal="showModal = false" 
            @initPlans="initPlans()"
            :modalPlan="$store.state.modalPlan"/>
    </div>
</template>

<script>
import DateItem from './DateItem'
import Modal from './Modal'

const now = new Date();

export default {
    components: {
        DateItem, Modal
    },
    mounted() {
        /* 
            초기화에 필요한 작업을 수행
            1. 로그인하지 않았다면, 로그인 페이지로 redirect
            2. 기존의 plans를 초기화 및 api-server에서 불러오기
        */
        if (!this.$store.state.username){
            this.$router.push("/login");
        }

        // set plans
        this.$store.state.plans = {};
        this.axios.get(`/api/plan/${this.$store.state.username}`, {
            headers: {Authorization: 'Bearer ' + this.$store.state.jwtToken}})
        .then( (res) => {
            this.$store.commit("setUserPlans", res.data.plans);
            console.log("[INFO] set Plans by action");
        })
    },
    data() {
        return {
            state: this.$store.state,

            showModal: false, // Modal flag
            yearMonth: this.getYearMonth(), 
            days: ['일', '월', '화', '수', '목', '금', '토'],
            dateObjects: this.getCurrentDateObjects(now),
        };
    },
    methods:{
        getYearMonth: function (){
            var year = this.$store.state.dateObj.getFullYear();
            var month = this.$store.state.dateObj.getMonth() + 1;
            
            return `${year}년 ${month}윌의`;
        },
        getCurrentDateObjects(pivotDateObj) {
            /* 
                pivotDateObj를 포함하는 달의 날짜들을 불러옴
                1. 이전 달과 겹치는 부분
                2. 이후 달과 겹치는 부분
                3. 객체화하여 반환
            */
            const viewYear = pivotDateObj.getFullYear();
            const viewMonth = pivotDateObj.getMonth();

            // 지난 달 마지막 Date, 이번 달 마지막 Date
            const prevLast = new Date(viewYear, viewMonth, 0);
            const thisLast = new Date(viewYear, viewMonth + 1, 0);

            const PLDate = prevLast.getDate();
            const PLDay = prevLast.getDay();

            const TLDate = thisLast.getDate();
            const TLDay = thisLast.getDay();

            // Dates 기본 배열들
            const prevDates = [];
            const thisDates = [...Array(TLDate + 1).keys()].slice(1);
            const nextDates = [];

            // prevDates 계산
            if (PLDay !== 6) {
                for (let i = 0; i < PLDay + 1; i++) {
                prevDates.unshift(PLDate - i);
                }
            }

            // nextDates 계산
            for (let i = 1; i < 7 - TLDay; i++) {
                nextDates.push(i)
            }

            // Dates 합치기
            const dates = prevDates.concat(thisDates, nextDates);

            // Dates 정리
            const todayObj = new Date();
            const firstDateIndex = dates.indexOf(1);
            const lastDateIndex = dates.lastIndexOf(TLDate);
            const dateObjects = []
            dates.forEach((date, i) => {
                var year = viewYear
                var month = viewMonth + 1

                if (i < firstDateIndex) {
                    if (month-1 <= 0){
                        year -= 1
                        month = 12
                    } else {
                        month -= 1
                    }
                } else if (i >= lastDateIndex + 1) {
                    month += 1;
                }

                dateObjects.push({
                    value : `${year}-${month}-${date}`,
                    other: (i < firstDateIndex || i >= lastDateIndex + 1),
                    today: `${year}. ${month}. ${date}.` == todayObj.toLocaleDateString(),
                    date: date
                })
            })

            

            return dateObjects

        },
        renderDateObjects () {
            // 달을 바꿀 경우 날짜 재계산하여 변경
            this.dateObjects = this.getCurrentDateObjects(this.state.dateObj);
        },
        prevMonth: function (){
            // 이전 달로 이동
            const tempDate = this.state.dateObj;
            tempDate.setDate(1);
            tempDate.setMonth(tempDate.getMonth() - 1);
            this.$store.commit("updateDateObj", tempDate);

            this.yearMonth = this.getYearMonth();
            this.renderDateObjects();
        },

        nextMonth: function (){
            // 다음 달로 이동
            const tempDate = this.state.dateObj;
            tempDate.setDate(1);
            tempDate.setMonth(tempDate.getMonth() + 1);
            this.$store.commit("updateDateObj", tempDate);
            
            this.yearMonth = this.getYearMonth();
            this.renderDateObjects();
        },
        goToday: function (){
            // 현재 시간의 달로 이동
            this.$store.commit("updateDateObj", new Date());
            
            this.yearMonth = this.getYearMonth();
            this.renderDateObjects();
        },
        initPlans() {
            // 계획들을 새로 불러옴
            this.axios.get(`/api/plan/${this.$store.state.username}`, {
                headers: {Authorization: 'Bearer ' + this.$store.state.jwtToken}})
            .then( (res) => {
                this.$store.commit("setUserPlans", res.data.plans);
                console.log("[INFO] set Plans by action");
            })
        }
    }
}
</script>


<style scoped>
/* base */
.wrapper {
    min-width: 900px;
    margin: 20px;
}
.main {
    padding: 0 50px 50px 50px;
}

/* header */
.calendar-header {
    height: 50px;
    padding: 20px 20px 0 20px;
}

.calendar-header::after {
    clear: both;
}

.year-month {
    float: left;

    font-size: 40px;
}

.month-nav {
    float: right;
}

.month-nav::after {
    clear: both;
}

.month-nav > * {
    float: left;
    margin-left: 10px;
    padding: 5px;

    line-height: 18px;
}

.month-nav > .curr-month {
    border: 1px solid black;
    border-radius: 5px;
}

/* main */
.calendar::after {
    clear: both;
}

.week {
    display: inline-block;
    width:100%;

    margin-top: 35px;
}

.week > * {
    float: left;

    width: calc(100%/7);
    height: 20px;
    text-align:center;
}

.day:nth-child(7n + 1) {
    color: red;
}

.day:nth-child(7n) {
    color: blue;
}

/* dates */
.dates {
    display: inline-block;
    width:100%;

    border-left: 1px solid black;
    border-bottom: 1px solid black;
}

.dates > .date {
    float: left;
    box-sizing: border-box;
    width: calc(100% / 7);
    min-height: 150px;

    border-top: 1px solid black;
    border-right: 1px solid black;
}

</style>