<template>
    <div class="upload-wrapper">
        <progress max="100" :value.prop="uploadPercentage"></progress>
        <input type="file" multiple ref="imageInput" @change="onInputClicked($event)" class="hidden">
        <div id="file-drag-drop" @click.prevent="dispatchInput">
            <form ref="fileform">
                <span class="drop-files">Drop the files here!</span>
            </form>
        </div>
        <div v-for="(file, key) in files" class="file-listing" :key="key">
            <img class="preview" v-bind:ref="`preview${key}`"/>
            {{ file.name }}
            <div class="remove-container">
                <a class="remove" v-on:click="removeFile(key)">Remove</a>
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
            async getImagePreviews(){
                await this.$nextTick();
                for( let i = 0; i < this.files.length; i++ ){
                    if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
                        let reader = new FileReader();
                        reader.addEventListener("load", () => {
                            this.$refs['preview'+parseInt(i)][0].src = reader.result;
                        });
                        reader.readAsDataURL( this.files[i] );
                    }else{
                        this.$nextTick(function(){
                            this.$refs['preview'+parseInt( i )][0].src = '/images/file.png';
                        });
                    }
                }
            },
            removeFile(key) {
                console.warn('Índice de archivo a eliminar --> ', key);
                this.files.splice(parseInt(key), 1);
                this.getImagePreviews();
            },
            async submitFiles(){
                let formData = new FormData();
                formData.append('files[]', this.files);
                try {
                    let response = await axios.post(`${window.location.origin}/upload`,
                                                formData,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                    onUploadProgress: (progressEvent) => {
                                                        this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                                                    }
                                                },);
                    console.warn('La respuesta es --> ', response);

                }catch (e) {
                    console.error('Error en la petición');
                }
            },
            dispatchInput() {
                console.warn('El evento para lanzar el input se ha lanzado');
                this.$refs.imageInput.click();
                console.log(this.$refs.imageInput);
            },
            onInputClicked(event) {
                let input = event.currentTarget;
                for(let index = 0; index < input.files.length; index++) {
                    this.files.push(input.files[index]);
                }
                this.getImagePreviews();
            },
        },
        mounted() {
            this.dragAndDropCapable = this.isBrowserDraggable();

            if (this.dragAndDropCapable) {
                ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( event => {
                    this.$refs.fileform.addEventListener(event, e => {
                       e.preventDefault();
                       e.stopPropagation();
                    });
                });
                this.$refs.fileform.addEventListener('drop', event => {
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

    .hidden {
        display: none;
    }

</style>