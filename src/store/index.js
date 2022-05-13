import { createStore } from 'vuex';

const now = new Date();
const username = sessionStorage.getItem("username");
const jwtToken = sessionStorage.getItem("jwtToken");

const store = createStore({
    state () {
        return {
            dateObj: now,
            username: username,
            jwtToken: jwtToken,
            plans: {},
            modalPlan: {}
        }
    },
    mutations: {
        setUserName: function(state, username){
            state.username = username;
        },
        setJwtToken: function(state, token) {
            state.jwtToken = token;
        },
        updateDateObj: function (state, newDate) {
            state.dateObj = newDate;
        },
        setUserPlans: function(state, plans) {
            state.plans = {}
            // // parse date to key
            plans.forEach((plan) => {
                var dateObj = new Date(plan.date);
                var year = dateObj.getFullYear();
                var month = dateObj.getMonth() + 1;
                var date = dateObj.getDate();

                // YYYY-MM-YY
                var dateKey = `${year}-${month}-${date}`
                
                if(!(dateKey in state.plans)) {
                    state.plans[dateKey] = [];
                }
                state.plans[dateKey].push(plan);
            })
        },
        setModalPlan: function(state, planObj) {
            state.modalPlan = planObj;
        }
    }
})

export default store;