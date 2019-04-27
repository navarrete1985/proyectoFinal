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
                                            <h3 class="text-center">Login</h3>
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
                                                    <span class="text-inverse">Recuerdame</span>
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
var SimpleCrypto = require("simple-crypto-js").default;

export default {
    data() {
        return {
            user: new User(),
            remember: false
        }
    },
    methods: {
        persist() {
            if (this.remember) {
                let cipher = new SimpleCrypto(this.user.email);
                this.user.hash = btoa(cipher.encrypt(this.user.password.trim()));
            } 
            this.user.password = 'encrypted';
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
                    this.updateUser(res.user);
                    console.log('respuesta servidor: ', res.user);
                    this.persist();
                    this.$router.replace('home');
                }
            }).catch(err => console.error(err))
        },
        updateUser(newUser) {
            Object.keys(newUser).forEach(key => {
                if (key !== 'password') this.user[key] = newUser[key];
            })
        }
    },
    mounted() {
        let data = localStorage.__DataUser ? JSON.parse(localStorage.__DataUser) : null;
        if (data != null && data.remember) {
            let cipher = new SimpleCrypto(data.user.email);
            this.$refs.rememberTrigger.click();
            this.user.email = data.user.email;
            this.user.password = cipher.decrypt(atob(data.user.hash.trim()));
            console.log('Contraseña: ', this.user.password);
            console.log('Hash: ', data.user.hash);
            console.log('Email: ', this.user.email);
            console.log('Data: ', data);
        }
    },
}
</script>

<style lang="scss">


</style>

