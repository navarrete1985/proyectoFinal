<template>
    <div class="">
        <section class="login-block">
        <!-- Container-fluid starts -->
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <!-- Authentication card start -->
                    
                        <form class="md-float-material form-material">
                            <div class="text-center">
                                <img src="..\..\assets\images\logo.png" alt="logo.png">
                            </div>
                            <div class="auth-box card">
                                <div class="card-block">
                                    <div class="row m-b-20">
                                        <div class="col-md-12">
                                            <h3 class="text-center">Sign In</h3>
                                        </div>
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="text" name="email" class="form-control" required placeholder="Your Email Address" v-model="user.email">
                                        <span class="form-bar"></span>
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="password" name="password" class="form-control" required="" placeholder="Password" v-model="user.password">
                                        <span class="form-bar"></span>
                                    </div>
                                    <div class="row m-t-25 text-left">
                                        <div class="col-12">
                                            <div class="checkbox-fade fade-in-primary d-">
                                                <label>
                                                    <input type="checkbox" v-model='remember' ref="rememberTrigger">
                                                    <span class="cr"><i class="cr-icon icofont icofont-ui-check txt-primary"></i></span>
                                                    <span class="text-inverse">Remember me</span>
                                                </label>
                                            </div>
                                            <div class="forgot-phone text-right f-right">
                                                <router-link to="/forgot" class="text-right f-w-600">Forgot Password?</router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-t-30">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20" @click="doLogin">Sign in</button>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <p class="text-inverse text-left m-b-0">Thank you.</p>
                                            <p class="text-inverse text-left"><a href="index-1.htm"><b class="f-w-600">Back to website</b></a></p>
                                        </div>
                                        <div class="col-md-2">
                                            <img src="..\..\assets\images\auth\Logo-small-bottom.png" alt="small-logo.png">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <!-- end of form -->
                </div>
                <!-- end of col-sm-12 -->
            </div>
            <!-- end of row -->
        </div>
        <!-- end of container-fluid -->
    </section>
    </div>
</template>

<script>
const {User} = require ('../../util/models.js');
const AES = require("crypto-js/aes");
const enc = require("crypto-js/enc-utf8");

export default {
    data() {
        return {
            user: new User(),
            remember: false
        }
    },
    methods: {
        persist() {
            let password = this.remember ? AES.encrypt(this.user.password, 'key').toString() : '';
            this.user.password = 'encrypted';
            if (this.remember) this.user.hash = password;
            localStorage.__DataUser = JSON.stringify({
                user: this.user,
                remember: this.remember
            })
        },
        doLogin() {
            fetch(`${this.$baseUrl}/login`, {
                method: 'POST',
                body: JSON.stringify(this.user),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.ok) {
                    this.user = res.user;
                    this.persist();
                    this.$router.replace('home');
                }
            }).catch(err => console.error(err))
        }
    },
    mounted() {
        let data = JSON.parse(localStorage.__DataUser);
        console.log(data.user.email);
        if (data != null && data.remember) {
            this.$refs.rememberTrigger.click();
            this.user.email = data.user.email;
            let passwd = AES.decrypt(data.user.hash, 'key');
            passwd = passwd.toString(enc.Utf8);
            console.log(passwd);
            this.user.password = passwd;
        }
    }
}
</script>

<style lang="scss">


</style>

