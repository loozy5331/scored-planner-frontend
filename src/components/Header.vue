<template>
    <div class="header clear">
        <div class="logo">LOGO</div>
        <div class="utils clear">
            <div class="home" @click="goCalendar">처음으로</div>
            <div class="graph" @click="goGraph">점수 그래프</div>
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

    background-color:gray;
}

.logo {
    float: left;
    margin-left: 20px;
    font-size: 30px;
}

.utils {
    float: right;
}

.utils > * {
    margin-right: 10px;
    padding: 5px;
    border: 1px solid black;
    border-radius: 5px;
    
    font-size: 20px;
    background-color: white;
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