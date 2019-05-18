<template>
    <div class="upload-wrapper jFiler">
        <!-- <progress max="100" :value.prop="uploadPercentage"></progress> -->
        <input type="file" multiple ref="imageInput" @change="onInputClicked($event)" class="hidden">
        <div ref="fileform" class="jFiler-input-dragDrop" :class="{dragged}">
            <div class="jFiler-input-inner">
                <div class="jFiler-input-icon">
                    <i class="icon-jfi-cloud-up-o"></i>
                </div>
                <div class="jFiler-input-text">
                    <h3>Arrastra y suelta tus archivos aquí</h3>
                    <span style="display:inline-block; margin: 15px 0">or</span>
                </div>
                <a class="jFiler-input-choose-btn btn btn-primary waves-effect waves-light" @click.prevent="$refs.imageInput.click()">Selecciona archivos</a>
            </div>
        </div>
        <div class="jFiler-items jFiler-row">
            <ul class="jFiler-items-list jFiler-items-grid">
                <li v-for="(file, key) in files" :key="key" class="jFiler-item" :data-jfiler-index="key" style="">
                    <div class="jFiler-item-container">
                        <div class="jFiler-item-inner">
                            <div class="jFiler-item-thumb">
                                <div class="jFiler-item-thumb-image">
                                    <div class="image-prev" :style="{'backgroundImage': file.background}"></div>
                                </div>
                            </div>
                            <div class="jFiler-item-assets jFiler-row">
                                <ul class="list-inline pull-left">
                                    <li>
                                        <span class="jFiler-item-others text-error inline-text"> 
                                            {{file.file.name}}
                                        </span>
                                    </li>
                                </ul>
                                <ul class="list-inline pull-right">
                                    <li><a class="icon-jfi-trash jFiler-item-trash-action" @click="removeFile(key)"></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <a class="submit-button jFiler-input-choose-btn btn btn-primary waves-effect waves-light" @click="submitFiles()" v-show="files.length > 0">Submit</a>
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
                dragged: false,
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
                let count = 0;
                Object.keys(this.files).forEach(key => {
                   let file = this.files[key].file;
                   if(this.filter.test(file.name)) {
                       let reader = new FileReader();
                       reader.addEventListener("load", () => {
                           count++;
                           this.$set(this.files[key], 'background', `url(${reader.result})`);
                           if (count === this.files.length) this.$emit('onAdded', count);
                       });
                       reader.readAsDataURL(file);
                   }else {
                       this.files[key].background = this.defaultImagePreview;
                   }
                });
            },
            removeFile(key) {
                this.files.splice(parseInt(key), 1);
                this.getImagePreviews();
            },
            async submitFiles(){
                this.$emit('beforeUpload');
                let response = undefined;
                let formData = new FormData();
                
                this.files.forEach(file => formData.append('files[]', file.file));
                // let params = this.extraRequestParams;
                // params = JSON.stringify(params);
                // params = new Blob([params], {type: 'application/json'});
                // formData.append('parametros', params);
                console.warn('Endpoint --> ', this.endpoint);
                try {
                    response = await axios.post(this.endpoint,
                                                formData,
                                                {
                                                    headers: {
                                                        'Content-Type': 'multipart/form-data',
                                                    },
                                                    onUploadProgress: (progressEvent) => {
                                                        this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                                                        this.$emit('onUploadProgress', this.uploadPercentage);
                                                    }
                                                },);
                    console.warn('La respuesta es --> ', response);

                }catch (e) {
                    this.$emit('onError', 'Error en la petición');
                }
                this.$emit('onFinish', response);
            },
            onInputClicked(event) {
                let input = event.currentTarget;
                if (!this.isLimitExceeded(input.files.length)) {
                    for(let index = 0; index < input.files.length; index++) {
                        let file = input.files[index];
                        if (this.filter.test(file.name)) {
                            this.files.push({file});
                        }
                    }
                    this.getImagePreviews();
                }else {
                    this.$emit('onError', `El número máximo de elementos a insertar es de ${this.limit}`);
                }
            },
            isLimitExceeded(nextItems) {
                return this.files.length + nextItems > this.limit;
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
                this.$refs.fileform.addEventListener('dragenter', event => this.dragged = true);
                this.$refs.fileform.addEventListener('dragleave', event => this.dragged = false);
                this.$refs.fileform.addEventListener('drop', event => {
                    this.$emit('beforeAdded');
                    if (!this.isLimitExceeded(event.dataTransfer.files.length)) {
                        for( let i = 0; i < event.dataTransfer.files.length; i++ ){
                            let file = event.dataTransfer.files[i];
                            if (this.filter.test(file.name)) {
                                this.files.push({file});
                            }
                        }
                        this.getImagePreviews();
                    }else {
                        this.$emit('onError', `El número máximo de elementos a insertar es de ${this.limit}`);
                    }
                    this.dragged = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

    .hidden {
        display: none;
    }

    .image-prev {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .list-inline.pull-left {
        
        span {
            max-width: 155px;
        }
    }

    .jFiler-items-grid .jFiler-item .jFiler-item-container {

        >.jFiler-item-assets {
            width: 190px;
        }

        a {
            transition: color .25s;

            &:hover {
                color: #dc3545 !important;
            }
        }

    }

    .upload-wrapper {
        
        >.jFiler-input-dragDrop {
            width: 100%;
        }
    }

</style>