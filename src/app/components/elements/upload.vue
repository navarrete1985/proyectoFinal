<template>
    <div class="upload-wrapper">
        <progress max="100" :value.prop="uploadPercentage"></progress>
        <div id="file-drag-drop" @click.prevent="$refs.imageInput.click()">
            <form ref="fileform">
                <input type="file" multiple ref="imageInput" @change="onInputClicked()">
                <span class="drop-files">Drop the files here!</span>
            </form>
        </div>
        <!--Previsualización de imágenes arrastradas-->
        <div v-for="(file, key) in files" class="file-listing" :key="`key-${key}`">
            <img class="preview" v-bind:ref="'preview'+parseInt(key)"/>
            {{ file.name }}
            <!--Contenedor para permitir la eliminación de un determinado archivo-->
            <div class="remove-container">
                <a class="remove" v-on:click="removeFile( key )">Remove</a>
            </div>
        </div>
        <a class="submit-button" @click="submitFiles()" v-show="files.length > 0">Submit</a>
    </div>
</template>

<script>

    import axios from 'axios';

    export default {
        data() {
            return {
                dragAndDropCapable: false,
                files: [],
                uploadPercentage: 0,
            }
        },
        props: {
            loading: {
                type: Boolean,
                default: () => {
                    return true;
                }
            }
        },
        methods: {
            isBrowserDraggable() {
                let div = document.createElement('div');
                return (('draggable' in div)
                        || ('ondragstart' in div && 'ondrop' in div)
                        && 'FormData' in window && 'FileReader' in window);
            },
            getImagePreviews(){

                //Iteramos sobre nuestra lista de archivos que hemos arrastrado
                for( let i = 0; i < this.files.length; i++ ){

                    //Comprobamos si es de tipo imagen para previsualizar
                    if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {

                        //Creamos un flujo de lectura para poder previsualizar la imagen
                        let reader = new FileReader();

                        //Cuando se lance el evento y tengamos el flujo de la imagen....
                        reader.addEventListener("load", () => {
                            this.$refs['preview'+parseInt(i)][0].src = reader.result;
                        });

                        //Leemos cada una de las imágenes para que las previsualicemos
                        reader.readAsDataURL( this.files[i] );
                    }else{

                        //Utilizamos nextTick por que vue está renderizando la plantilla y tenemos que asegurarnos de que
                        //las referencias estén unidas
                        this.$nextTick(function(){
                            this.$refs['preview'+parseInt( i )][0].src = '/images/file.png';
                        });
                    }
                }
            },
            removeFile(key) {
                //Eliminamos el archivo que deseamos suprimir de nuestro array
                this.files.splice(key, 1);
            },
            async submitFiles(){

                let formData = new FormData();

                //Agregamos cada uno de los archivos a nuestro formData
                for( var i = 0; i < this.files.length; i++ ){
                    let file = this.files[i];

                    formData.append('files[' + i + ']', file);
                }

                //Hacemos la petición con axios para que podamos actualizar el progreso de la subida
                axios.post( '/file-drag-drop',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                })
                    .catch(function(){
                        console.log('FAILURE!!');
                    });

                try {

                    let response = await axios(`${window.location.origin}/upload`,
                                                formData,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                    onUploadProgress: (progressEvent) => {
                                                        this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                                                    }
                                                },)

                }catch (e) {
                    console.error('Error en la petición');
                }

                //Usamos fetch para hacer la petición a la base de datos para subir los archivos
                let response = await fetch(`${window.location.origin}/upload`, {
                    method: 'POST',
                    body: formData
                })

                let json = await response.json();
                json.statu = response.status;

                console.warn('El resultado de la petición a la api upload es --> ', response);
                console.warn('El resultado de la petición a la api en json --> ', json);

                
            },
            onInputClicked(event) { //Evento para la carga de archivos sin drag and drop
                let input = event.currentTarget;
                for(let index = 0; index < input[0].files.length; index++) {
                    let file = this._input[0].files[index];
                    this.files.push(file);
                }
                this.getImagePreviews();
            },
        },
        mounted() {
            //Para determinar si el navegador es comparible para el uso de drag and drop y si es compatible, pues añadimos los eventos necesarios
            this.dragAndDropCapable = this.isBrowserDraggable();

            if (this.dragAndDropCapable) {

                //Añadimos todos los tipos de eventos dragables a nuestro formulario, para evitar que al arrastrar un archivo al
                //navegador nos abra otro nueva ventana con la renderización de dicho archivo que es el comportamiento por defecto
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( event => {
                    this.$refs.fileform.addEventListener(event, e => {
                       e.preventDefault();
                       e.stopPropagation();
                    });
                });

                //Añadimos el evento de drop a nuestro formulario, que es el que se va a encargar de detectar los archivos que estamos
                //arrastrando a nuestro navegador para subirlos
                this.$refs.fileform.addEventListener('drop', event => {
                    //dataTransferFiles hace referencia a los archivos que estamos transfiriendo con el dragAndDrop
                    for( let i = 0; i < event.dataTransfer.files.length; i++ ){
                        this.files.push( event.dataTransfer.files[i] );
                    }
                    this.getImagePreviews();
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*.upload-wrapper {*/

        /*input {*/

        /*}*/

        /*.preview {*/

            /*display: flex;*/
            /*flex-flow: row wrap;*/

            /*>.item {*/

                /*flex: 0 0 33%;*/
                /*background-position: center;*/
                /*background-repeat: no-repeat;*/
                /*background-size: contain;*/

                /*&:before {*/
                    /*content: '';*/
                    /*padding-bottom: 80%;*/
                    /*display: block;*/
                    /*position: absolute;*/
                    /*top: 0;*/
                    /*left: 0;*/
                /*}*/

            /*}*/

        /*}*/

    /*}*/

    form {
        display: block;
        height: 400px;
        width: 400px;
        background: #ccc;
        margin: auto;
        margin-top: 40px;
        text-align: center;
        line-height: 400px;
    }

    div.file-listing{
        width: 400px;
        margin: auto;
        padding: 10px;
        border-bottom: 1px solid #ddd;
    }

    div.file-listing img{
        height: 100px;
    }

    div.remove-container{
        text-align: center;
    }

    div.remove-container a{
        color: red;
        cursor: pointer;
    }

    a.submit-button{
        display: block;
        margin: auto;
        text-align: center;
        width: 200px;
        padding: 10px;
        text-transform: uppercase;
        background-color: #CCC;
        color: white;
        font-weight: bold;
        margin-top: 20px;
    }

    progress{
        width: 400px;
        margin: auto;
        display: block;
        margin-top: 20px;
        margin-bottom: 20px;
    }

</style>