<template>
    <div class="header clear">
        <div class="logo">Scored Planner</div>
        <div class="utils clear">
            <div class="home" @click="goCalendar">처음으로</div>
            <div class="graph" 
                v-if="$store.state.username"
                @click="goGraph">점수 그래프</div>
            <div class="logout" 
                v-if="$store.state.username"
                @click="logout">로그아웃</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goCalendar() {
            this.$router.push("/calendar")
        },
        goGraph() {
            this.$router.push("/graph");
        },
        logout() {
            this.$store.commit("setUserName", null);
            this.$store.commit("setJwtToken", null);
            sessionStorage.setItem("setJwtToken", null);
            this.axios.defaults.headers.common['Authorization'] = null;

            this.$router.push("/login");
        }
    }
}
</script>

<style scoped>
.header {
    position: relative;
    height: 40px;
    padding: 10px;

    background-color:#15133C;
    border-bottom: 1px solid #F1EEE9;
}

.logo {
    float: left;
    margin-left: 20px;
    font-size: 30px;

    color: #F1EEE9;
}

.utils {
    float: right;
}

.utils > * {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid #F1EEE9;
    border-radius: 5px;
    
    font-size: 20px;
    color: #F1EEE9;
}
.home {
    float: left;
}

.graph {
    float: left;
}

.logout {
    float: left;
}
</style>