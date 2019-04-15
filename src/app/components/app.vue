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
                                    <input type="text" placeholder="Inserta una nueva tarea" class="form-control" v-model="task.title">
                                </div>
                                <div class="form-group">
                                    <textarea rows="10" class="form-control" placeholder="Inserta la descripción de la tarea" v-model="task.description"></textarea>
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
export default {
    data() {
        return {
            task: {
                title: '',
                description: ''
            }
        }
    },
    methods: {
        addTask(){
            console.log(this.task)
        }
    }
}
</script>

