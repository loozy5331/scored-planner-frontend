<template>
    <div class="wrapper">
        <div class="account-body">
            <div class="form-container design-point">
                <form action="POST">
                    <div class="row">
                        <label for="username" @click="testFunc">아이디</label>
                        <input type="text" id="username" class="design-bg design-point design-hover" v-model="username" placeholder="username">
                    </div>
                    <div class="row">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" class="design-bg design-point design-hover" v-model="password">
                    </div>
                </form>
                <div class="design-alert" v-if="!isValid">
                    유효하지 않은 이메일 혹은 비밀번호입니다.
                </div>
                <button class="summit-btn design-bg design-point design-hover" type="submit" @click="loginFunc">로그인</button>
                <button class="summit-btn design-bg design-point design-hover" type="submit" @click="SignUpFunc">회원가입</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data: function(){
        return {
            state: this.$store.state,

            username: '',
            password: '',
            isValid: true
        }
    },
    methods: {
        testFunc() {
            console.log("[INFO] 1")
            this.axios.get(`/api/test`).then((res) => {console.log(`1 ${res}`)}).catch((e) => {console.log(`${e} error`)})

        },
        setDefaultDataAfterLogin(jwtToken) {
            this.$store.commit("setUserName", this.username);
            sessionStorage.setItem("username", this.username);
            this.$store.commit("setJwtToken", jwtToken);
            sessionStorage.setItem("jwtToken", jwtToken);

            this.axios.defaults.headers.common['Authorization'] = `Barear ${jwtToken}`
            this.axios.post(`/api/search/${this.username}}`)
        },
        loginFunc (){
            const frm = new FormData() 
            frm.append('username', this.username)
            frm.append('password', this.password)

            this.axios.post(`/api/accounts/login/`, frm)
            .then((res => {
                if (res.status == 200){
                    this.setDefaultDataAfterLogin(res.data.access_token)
                    this.$router.push("/calendar");
                }
                this.isValid = false;
                
            })).catch((error) => {
                console.log(error);
                this.isValid = false;
            })
        },
        SignUpFunc() {
            this.$router.push("/signUp");
        }
    }
}
</script>

<style src="./design.css" scope>
</style>