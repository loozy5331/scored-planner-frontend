<template>
    <div class="modal">
        <div class="modal-body">
            <div class="row">
                <input class="title" type="text" placeholder="제목을 입력해주세요" v-model="title" @input="title=$event.target.value; searchTitle()"> 
                <div class="title-cands" v-if="title_cands.length > 0">
                    <div class="prev-titles">
                        <SearchTitle
                            v-for="(tc, i) in title_cands"
                            :key="i+tc+id"
                            :title_cand="tc"
                            @updateTitle="updateTitle(tc)"
                        />
                    </div>
                </div>
                <input type="hidden" v-model="date">
            </div>
            <div class="row">
                <label class="score-label" for="score"> 점수 </label>
                <input class="score" type="number" v-model="score" min="0" max="10" step="1">
            </div>
            <div class="row">
                <textarea class="memo" rows="10" v-model="memo" placeholder="메모"></textarea>
            </div>
            <div class="row">
                <button class="btn" @click="$emit('closeModal')">닫기</button>
                <button v-if="title" class="btn btn-delete" @click="deletePlan">삭제</button>
                <button class="btn btn-close" @click="savePlan">저장</button>
            </div>
            <div class="row">
                <div class="prev-records">
                    <PrevRecord 
                        v-for="(prevRecord, i) in prev_records" 
                        :key="i"
                        :prevRecord="prevRecord"/>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import SearchTitle from './SearchTitle.vue'
import PrevRecord from './PrevRecord.vue' 

export default {
    components: {
        SearchTitle, PrevRecord
    },
    props: [
        "modalPlan"
    ],
    data: function () {
        return {
            state: this.$store.state,

            id: this.modalPlan.id,
            date: this.modalPlan.date,
            title: this.modalPlan.title || "",
            score: this.modalPlan.score || 5,
            memo: this.modalPlan.memo || "",
            title_cands: [], // (title)
            prev_records: [] // (date, score, memo)
        }
    },
    methods: {
        savePlan() {
            // 새로운 계획을 추가 혹은 기존의 계획을 갱신할 때 호출
            if (this.id) {
                this.updateFunc()
            } else {
                this.createFunc()
            }
        },
        deletePlan(){
            /* 
                계획을 제거 그 후에,
                1. store에 저장된 계획 초기화
                2. Modal 닫기
            */
            this.axios.delete(`/api/plan/${this.id}`)
            .then((res => {
                console.log(res);
                this.$emit("initPlans");
                this.$emit("closeModal");
            })).catch((error) => {
                console.log(error);
            })
        },
        getValidScore(score){
            // 0 ~ 10 사이의 값으로 점수 범위 제한 
            if (score < 0) {
                return 0
            } else if (score > 10) {
                return 10
            } else {
                return score
            }
        },
        createFunc() {
            /* 
                새로운 계획 추가
                1. 저장된 title, score, memo, date 값을 기반으로 새로운 계획 추가
                2. 그 중 title은 search-server의 인덱스로 추가
            */
            const frm = new FormData() 
            frm.append('title', this.title)
            frm.append('score', this.getValidScore(this.score))
            frm.append('memo', this.memo || "메모 없음")
            frm.append('date', this.date)

            // 1
            const username = this.state.username;
            this.axios.post(`/api/plan/${username}`, frm)
            .then((res => {
                console.log(res);
                this.$emit("initPlans");
                this.$emit("closeModal");
            })).catch((error) => {
                console.log(error);
            })

            // 2
            this.axios.post(`/api/search/${username}/${this.title}`)
            .then((res => {
                console.log(res);
            })).catch((error) => {
                console.log(error);
            })
        },
        updateFunc() {
            /* 
                저장된 title, score, memo, date 값을 기반으로 계획 갱신
            */
            const frm = new FormData() 
            frm.append('title', this.title)
            frm.append('score', this.getValidScore(this.score))
            frm.append('memo', this.memo || "메모 없음")
            frm.append('date', this.date)

            this.axios.put(`/api/plan/${this.id}`, frm)
            .then((res => {
                console.log(res);
                this.$emit("initPlans");
                this.$emit("closeModal");
            })).catch((error) => {
                console.log(error);
            })
        },
        updateTitle(title) {
            /*
                SearchTitle 중에 하나를 선택했을 때,

                1. 해당 값으로 title 변경
                2. 후보 초기화
                3. 이전에 평가했던 계획들 불러오기
            */ 
            this.title = title;
            this.title_cands = [];

            this.updatePrevRecords();
        },
        searchTitle() {
            // title input의 변경이 있을 때마다 search-server로 제목 후보들 반환
            const username = this.state.username;
            if(this.title) {
                this.axios.get(`/api/search/${username}/${this.title}`)
                .then((res => {
                    this.title_cands = res.data.cands;
                })).catch((error) => {
                    console.log(error);
                })
            }
        },
        updatePrevRecords() {
            /* 
                이전의 계획들 중에서 같은 title을 가진 계획들을 prev_records에 저장
            */
            var params = new URLSearchParams();
            params.set("title", this.title);
            
            const username = this.state.username;
            this.axios.get(`/api/plan/${username}?${params.toString()}`)
            .then((res => {
                console.log(res);
                this.prev_records = res.data.plans
            })).catch((error) => {
                console.log(error);
            })
            
        }
    }
    
}
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    /* display: none; */

    background-color: rgba(0, 0, 0, 0.4);
}

.modal.show {
    display: block;
}

.modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    overflow-y: scroll;

    width: 800px;
    height: 600px;

    padding: 40px;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
}

.row {
    float: left;
    width: 100%;

    margin-bottom: 20px;
}
.row::after{
    content: "";
    clear: both;
}

.title {
    width: 100%;
    height: 40px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;

    font-size: 25px;
}
/* titles */
.title-cands {
    position: relative;
}

.prev-titles {
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    overflow-x: hidden;

    background-color:white;
    border: 1px solid black;
}

.score-label {
    font-size: 20px;
    margin-right: 10px;
}

.score {
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;

    font-size: 20px;
    text-align: center;
}

.memo {
    width: 100%;
    padding: 5px;

    border: 1px solid #ccc;
    border-radius: 5px;

    font-size: 25px;
}

.btn {
    float: right;
    width: 60px;
    height: 30px;
    margin-right: 5px;
    
    font-size: 20px;
}

/* prev-scores */

</style>