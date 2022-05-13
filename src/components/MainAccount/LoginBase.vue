<template>
    <div class="wrapper">
        <div class="account-body">
            <div class="form-container">
                <form action="POST">
                    <div class="row">
                        <label for="username" @click="testFunc">아이디</label>
                        <input type="text" id="username" v-model="username" placeholder=" username">
                    </div>
                    <div class="row">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" v-model="password">
                    </div>
                </form>
                <div class="alert" v-if="!isValid">
                    유효하지 않은 이메일 혹은 비밀번호입니다.
                </div>
                <button class="btn" type="submit" @click="loginFunc">로그인</button>
                <button class="btn" type="submit" @click="SignUpFunc">회원가입</button>
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
            })
        },
        SignUpFunc() {
            this.$router.push("/signUp");
        }
    }
}
</script>


<style scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.4);
}

.account-body {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;

    width: 500px;
    height: 300px;

    padding: 40px;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
}

/* form */
.form-container {
    width: 100%;
    height: 180px;
}

.row {
    height: 40px;
    padding: 15px;
}

.row::after {
    clear: both;
}

.row > label {
    float: left;

    font-size: 20px;
    line-height: 30px;
}

.row > input {
    float: right;

    width: 350px;
    height: 30px;
}

.row > input::-webkit-input-placeholder{
    font-size: 15px;
}

.btn { 
    display:block; 
    width:90%; 
    height:60px; 

    font-size: 25px;
    line-height:40px; 
    border:1px #3399dd solid;
    border-radius: 10px;
    margin:15px auto; 
    background-color:#66aaff; 
    text-align:center; 
    cursor: pointer; 
    color:#333; 
    transition: all 0.9s color 0.3; 
} 

.btn:hover{
    color:#fff;
}


input {
    border-radius: 10px;
}

.alert {
    color: red;
}
</style>