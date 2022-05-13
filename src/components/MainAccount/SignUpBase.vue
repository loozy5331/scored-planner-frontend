<template>
    <div class="wrapper">
        <div class="account-body design-bg">
            <div class="form-container design-point">
                <form action="POST">
                    <div class="row">
                        <label for="username">아이디</label>
                        <input type="text" id="username" class="design-bg design-point design-hover" v-model="username" placeholder=" username">
                    </div>
                    <div class="row">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" class="design-bg design-point design-hover" v-model="password">
                    </div>
                    <div class="row">
                        <label for="password_check">비밀번호 확인</label>
                        <input type="password" id="password_check" class="design-bg design-point design-hover" v-model="password_check">
                    </div>
                    <div class="row">
                        <label for="full_name">이름</label>
                        <input type="full_name" id="full_name" class="design-bg design-point design-hover" v-model="full_name">
                    </div>
                    <div class="row">
                        <label for="email">이메일</label>
                        <input type="email" id="email" class="design-bg design-point design-hover" v-model="email" placeholder="loozy@gmail.com">
                    </div>
                </form>
                <div class="design-alert" v-if="!isValid">
                    유효하지 않은 이메일 혹은 비밀번호입니다.
                </div>
                <button class="summit-btn design-bg design-point design-hover" type="submit" @click="submitFunc">가입하기</button>
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

<style src="./design.css" scope>
</style>