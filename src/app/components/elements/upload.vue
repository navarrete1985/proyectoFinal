<template>
    <div class="upload-wrapper">
        <progress max="100" :value.prop="uploadPercentage"></progress>
        <input type="file" multiple ref="imageInput" @change="onInputClicked($event)" class="hidden">
        <div id="file-drag-drop" @click.prevent="dispatchInput">
            <form ref="fileform">
                <span class="drop-files">Arrastra tus archivos aquí</span>
            </form>
        </div>
        <div v-for="(file, key) in files" class="file-listing" :key="key">
            <!--<img class="preview" v-bind:ref="`preview${key}`"/>-->
            <div class="image-prev" :style="{'backgroundImage': file.background}"></div>
            {{ file.file.name }}
            <div class="remove-container">
                <a class="remove" v-on:click="removeFile(key)">
                    <slot name="remove">Eliminar</slot>
                </a>
            </div>
        </div>
        <a class="submit-button" @click="submitFiles()" v-show="files.length > 0">Submit</a>
    </div>
</template>

<script>
    /**
     * Eventos --> onUploadProgress, BeforeUpload, onFinish, onError
     */
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
            },
            extraRequestParams: {
                type: Object,
                required: false,
            },
            defaultImagePreview: {
                type: String,
                required: false,
            },
            endpoint: {
                type: String,
                required: true,
            },
            filter: {
                type: RegExp,
                required: true,
            },
            limit: {
                type: Number,
                required: true,
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
                Object.keys(this.files).forEach(key => {
                   let file = this.files[key].file;
                   if(this.filter.test(file.name)) {
                       let reader = new FileReader();
                       reader.addEventListener("load", () => {
                           this.$set(this.files[key], 'background', `url(${reader.result})`);
                           console.log('Background image --> ', this.files[key].background);
                       });
                       reader.readAsDataURL(file);
                   }else {
                       this.files[key].background = this.defaultImagePreview;
                   }
                });
            },
            removeFile(key) {
                console.warn('Índice de archivo a eliminar --> ', key);
                this.files.splice(parseInt(key), 1);
                // delete this.files[key];
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
                if (!this.isLimitExceeded(input.files.length)) {
                    for(let index = 0; index < input.files.length; index++) {
                        let file = input.files[index];
                        this.files.push({file});
                    }
                    this.getImagePreviews();
                }
            },
            isLimitExceeded(nextItems) {
                return this.files.length + nextItems <= this.limit;
            }
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
                    if (!this.isLimitExceeded(event.dataTransfer.files.length)) {
                        for( let i = 0; i < event.dataTransfer.files.length; i++ ){
                            let file = event.dataTransfer.files[i];
                            // this.files.push( event.dataTransfer.files[i] );
                            this.files.push({file});
                        }
                        this.getImagePreviews();
                    }
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

    .image-prev {
        width: 25%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        &:before {
            content: '';
            display: block;
            top: 0;
            left: 0;
            padding-bottom: 100%;
        }
    }

</style>