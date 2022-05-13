<template>
    <div class="wrapper design-bg">
        <div class="account-body">
            <div class="form-container">
                <form action="POST">
                    <div class="row">
                        <label for="username" @click="testFunc">아이디</label>
                        <input type="text" id="username" class="design-bg design-point" v-model="username" placeholder="username">
                    </div>
                    <div class="row">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" class="design-bg design-point" v-model="password">
                    </div>
                </form>
                <div class="design-alert" v-if="!isValid">
                    유효하지 않은 이메일 혹은 비밀번호입니다.
                </div>
                <button class="btn design-bg design-point" type="submit" @click="loginFunc">로그인</button>
                <button class="btn design-bg design-point" type="submit" @click="SignUpFunc">회원가입</button>
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


<style scoped>
.wrapper {
    position: fixed;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
}

.account-body {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;

    width: 500px;
    height: 300px;

    padding: 40px;

    transform: translateX(-50%) translateY(-50%);

    border: 1px solid white;
    border-radius: 20px;
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

label {
    float: left;

    font-size: 20px;
    line-height: 30px;
    color: white;
}

input {
    float: right;
    box-sizing: border-box;
    width: 350px;
    height: 35px;
    padding-left: 10px;

    font-size: 15px;
}

input::-webkit-input-placeholder{
    font-size: 15px;
    color: white;
}

input:focus{
    font-size: 15px;
    color: white;
}

.btn { 
    display:block; 
    width:90%; 
    height:50px; 

    font-size: 25px;
    line-height:40px; 
    margin:15px auto; 
    text-align:center; 
    cursor: pointer; 
    
    transition: all 0.9s color 0.3; 
} 

/* design */

.design-alert {
    color: red;
}

.design-bg {
    background-color: #15133C;
}

.design-point {
    border: 1px solid #F1EEE9;
    border-radius: 15px;

    color: #F1EEE9;
}

.design-point:hover {
    color: #73777B;
    border-color: #73777B;
}

</style>