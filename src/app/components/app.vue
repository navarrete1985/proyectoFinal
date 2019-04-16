<template>
    <div class="">
        <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">Menv Stack</a>
        </nav>
        <div class="container">
            <div class="row pt-5"> 
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input type="text" placeholder="Nombre de usuario" class="form-control" v-model="user.name">
                                </div>
                                <div class="form-group">
                                    <input type="text" placeholder="Nombre de usuario" class="form-control" v-model="user.lastName">
                                </div>
                                <div class="form-group">
                                    <input type="email" placeholder="Introduce email" class="form-control" v-model="user.email">
                                </div>
                                <div class="form-group">
                                    <input type="password" placeholder="Introduce contraseña" class="form-control" v-model="user.password">
                                </div>
                                <button class="btn btn-primary btn-block">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

const {User} = require ('../util/models.js');

export default {
    data() {
        return {
            user: new User()
        }
    },
    methods: {
        addTask(){
            fetch('http://localhost:3000/api/user')
                .then(res => {
                    return res.json();
                })
                .then(json => {
                    console.log(json);
                })
                .catch(e => {
                    console.log(e);
                })
            this.user.reset();
        }
    }
}
</script>

