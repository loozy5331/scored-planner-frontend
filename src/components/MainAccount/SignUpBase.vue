<template>
    <div class="wrapper">
        <div class="account-body">
            <div class="form-container">
                <form action="POST">
                    <div class="row">
                        <label for="username">아이디</label>
                        <input type="text" id="username" v-model="username" placeholder=" username">
                    </div>
                    <div class="row">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" v-model="password">
                    </div>
                    <div class="row">
                        <label for="password_check">비밀번호 확인</label>
                        <input type="password" id="password_check" v-model="password_check">
                    </div>
                    <div class="row">
                        <label for="full_name">이름</label>
                        <input type="full_name" id="full_name" v-model="full_name">
                    </div>
                    <div class="row">
                        <label for="email">이메일</label>
                        <input type="email" id="email" v-model="email" placeholder="loozy@gmail.com">
                    </div>
                </form>
                <div class="alert" v-if="!isValid">
                    유효하지 않은 이메일 혹은 비밀번호입니다.
                </div>
                <button class="btn" type="submit" @click="submitFunc">가입하기</button>
            </div>  
        </div>
    </div>
</template>

<script>

export default {
    data: function (){
        return {
            state: this.$store.state,

            username: '',
            password: '',
            password_check: '',
            email: '',
            full_name: '',
            isValid: true
        }
    },
    methods: {
        submitFunc() {
            // required
            if(!this.username || !this.password || !this.password_check || !this.email || !this.full_name){
                alert("빈 속성이 있습니다.");
                return 
            }

            const frm = new FormData() 
            frm.append('username', this.username)
            frm.append('password', this.password)
            frm.append('email', this.email)
            frm.append('full_name', this.full_name)

            this.axios.post(`/api/accounts/signUp/`, frm)
            .then((res => {
                if (res.status == 200) {
                    this.axios.post(`/api/search/${this.username}`);
                    this.$router.push("/login");
                }
            })).catch((error) => {
                console.log(error);
                this.isValid = false;                
            })
            
        },

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
    height: 400px;

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
    padding: 10px;
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