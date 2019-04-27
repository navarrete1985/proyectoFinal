<template>
    <div class="">
        <nav class="navbar navbar-light bg-light">
        <a href="/" class="navbar-brand">Esto es el login</a>
        <button class="btn btn-primary btn-block" @click="logout">Logout</button>
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
                            <button class="btn btn-primary btn-block mt-3" @click="getUsers">Obtener usuarios</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item of users" :key="item._id">
                                <td>{{item._id}}</td>
                                <td class="impar">{{item.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const {User} = require ('../../util/models.js');

export default {
    data() {
        return {
            user: new User(),
            users: []
        }
    },
    created() {
        this.getUsers();
    },
    methods: {
        getUsers() {
            fetch('/api/user')
            .then(res => {
                return res.json();
            })
            .then(json => {
                this.users = json.response;
            })
            .catch(e => {
                console.log(e);
            })
        },
        addTask(){
            fetch('/api/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.user)
            })
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
        },
        logout() {
            let data = JSON.parse(localStorage.__DataUser);
            fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data.user)
            })
            .then(res => res.json())
            .then(json => {
                if (json.result){
                    if (data.remember) {
                        Object.keys(data.user).forEach((key) => {
                            if (key !== 'email' || key !== 'passwd') {
                                data.user[key] = '';
                            }
                        })
                    }else {
                        data = null;
                    }
                    localStorage.__DataUser = data;
                    this.$router.replace('login');
                }
            })
        }
    }
}
</script>

<style lang="scss">
</style>

