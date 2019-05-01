<template>
    <div class="">
        <section class="login-block">
        <!-- Container-fluid starts -->
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <!-- Authentication card start -->
                    
                        <form class="md-float-material form-material" v-on:keyup.enter.prevent='doLogin'>
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
                                        <input type="text" name="email" class="form-control" placeholder="Email" v-model="user.email"  @blur='validate("email")'>
                                        <transition name='fade'>
                                            <span v-if="!error.email.state" class="form-bar text-danger">{{error.email.message}}</span>
                                        </transition>
                                    </div>
                                    <div class="form-group form-primary">
                                        <input type="password" name="password" class="form-control" placeholder="Password" v-model="user.password"  @blur='validate("passwd")'>
                                        <transition name='fade'>
                                            <span v-if="!error.password.state" class="form-bar text-danger">{{error.password.message}}</span>
                                        </transition>
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
                                                <router-link to="/forgot" class="text-right f-w-600">Recuperar Contraseña</router-link>
                                            </div>
                                        </div>
                                    </div>
                                    <transition name='fade'>
                                        <div v-if="!error.validate.state"  class="row d-flex justify-content-center delete-margin">
                                            <span class="form-bar text-danger">{{error.validate.message}}</span>
                                        </div>
                                    </transition>
                                    <div class="row m-t-30">
                                        <div class="col-md-12">
                                            <button type="button" class="btn btn-primary btn-md btn-block waves-effect waves-light text-center m-b-20" @click="doLogin">Sign in</button>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-10">
                                            <p class="text-inverse text-left"><a href="index-1.htm"><b class="f-w-600">Volver a la web</b></a></p>
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
const {validateEmail, validatePasswd} = require ('@/util/Validate.js');
var SimpleCrypto = require("simple-crypto-js").default;
import type_user from '../store/users/type';

export default {
    data() {
        return {
            user: new User(),
            remember: false,
            error: {
                email: {
                    state: true,
                    message: 'Formato de email inválido'
                }, 
                password: {
                    state: true,
                    message: 'Contraseña inválida, al menos 6 carácteres y 1 mayúscula.'
                },
                validate: {
                    state: true,
                    message: 'Email o contraseña inválido.'
                }
            }
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
        async doLogin() {
            this.validate('email');
            this.validate('passwd');

            if (!this.error.password.state || !this.error.email.state) return;

            let response = await this.$store.dispatch(type_user.actions.fetchLogin, this.user);

            if (response.ok) {
                this.updateUser(response.user);
                this.persist();
                this.$router.replace('dashboard');
            } else {
                this.error.validate.state = false;
            }
        },
        updateUser(newUser) {
            Object.keys(newUser).forEach(key => {
                if (key !== 'password') this.user[key] = newUser[key];
            })
        },
        validate(type) {
            switch (type) {
                case 'email':
                    this.user.email = this.user.email.trim();
                    this.error.email.state = validateEmail(this.user.email);
                    break;
                case 'passwd':
                    this.user.password = this.user.password.trim();
                    this.error.password.state = validatePasswd(this.user.password)
                    break;
            }
        }
    },
    mounted() {
        let data = localStorage.__DataUser ? JSON.parse(localStorage.__DataUser) : null;
        if (data != null && data.remember) {
            let cipher = new SimpleCrypto(data.user.email);
            this.$refs.rememberTrigger.click();
            this.user.email = data.user.email;
            this.user.password = cipher.decrypt(atob(data.user.hash.trim()));
        }
    },
}
</script>

<style lang="scss">

    .delete-margin {
        margin-bottom: -20px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>

