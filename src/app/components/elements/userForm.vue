<template>
    <div>
        <div class="card-header">
            <h5 class="card-header-text">Información General</h5>
            <button id="edit-btn" type="button" class="btn btn-sm btn-primary waves-effect waves-light f-right" @click="toggleEdit">
                <i class="icofont icofont-edit"></i>
            </button>
            <span>Administra la información del usuario.</span>
        </div>
        <div class="card-block">
            <div class="view-info">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="general-info">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="table-responsive">
                                        <table class="table m-0">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Nombre</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                type="text"
                                                                :ref="ref.name"
                                                                v-model="lastState.name"
                                                                :class="{'white': isEdit, 'border-error': errors.name.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="errors.name.error = !validateLength(lastState.name, 3)"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>        
                                                                <span v-if="errors.name.error" class="form-bar text-danger">{{errors.name.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Apellidos</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                type="text"
                                                                :ref="ref.lastName"
                                                                v-model="lastState.lastName"
                                                                :class="{'white': isEdit, 'border-error': errors.lastName.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="errors.lastName.error = !validateLength(lastState.lastName, 3)"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>        
                                                            <span v-if="errors.lastName.error" class="form-bar text-danger">{{errors.lastName.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Dirección</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                type="text"
                                                                :ref="ref.address"
                                                                v-model="lastState.address"
                                                                :class="{'white': isEdit, 'border-error': errors.address.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="errors.address.error = !validateLength(lastState.address, 6)"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>
                                                            <span v-if="errors.address.error" class="form-bar text-danger">{{errors.address.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                type="text"
                                                                :ref="ref.email"
                                                                v-model="lastState.email"
                                                                :class="{'white': isEdit, 'border-error': errors.email.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="errors.email.error = !validateEmail(lastState.email)"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>
                                                            <span v-if="errors.email.error" class="form-bar text-danger">{{errors.email.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Contraseña</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                :type="show ? 'text' : 'password'"
                                                                :ref="ref.password"
                                                                v-model="lastState.password"
                                                                :class="{'white': isEdit, 'border-error': errors.password.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="updatePasswd()"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>
                                                            <i v-show="show" class="fa fa-eye-slash btn-show-pass" @click="show = !show"></i>
                                                        </transition>
                                                        <transition name='fade'>
                                                            <i v-show="!show" class="fa fa-eye btn-show-pass" @click="show = !show"></i>
                                                        </transition>
                                                        <transition name='fade'>
                                                            <span v-if="errors.password.error" class="form-bar text-danger">{{errors.password.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Número de Teléfono</th>
                                                    <div class="input">
                                                        <transition name='fade'>
                                                            <input
                                                                type="text"
                                                                :ref="ref.phoneNumber"
                                                                v-model="lastState.phone_number"
                                                                :class="{'white': isEdit, 'border-error': errors.phoneNumber.error}"
                                                                :readonly="!isEdit"
                                                                :disabled="!isEdit"
                                                                @blur="onValidatephoneNumber(lastState.phone_number)"
                                                                >
                                                        </transition>
                                                        <transition name='fade'>
                                                            <span v-if="errors.phoneNumber.error" class="form-bar text-danger">{{errors.phoneNumber.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Género</th>
                                                    <div class="input form-radio">
                                                        <div class="group-add-on">
                                                            <div class="radio radiofill radio-inline">
                                                                <label>
                                                                    <input v-model="lastState.gender" type="radio" 
                                                                    name="radio" value=false :checked="lastState.gender === false"
                                                                    :disabled="!isEdit"><i class="helper"></i> Hombre
                                                                </label>
                                                            </div>
                                                            <div class="radio radiofill radio-inline">
                                                                <label>
                                                                    <input v-model="lastState.gender" 
                                                                    :disabled="!isEdit" type="radio" 
                                                                    name="radio" value=true 
                                                                    :checked="lastState.gender === true"><i class="helper"></i> Mujer
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Activo</th>
                                                    <div class="input checkbox-fade fade-in-primary">
                                                        <label>
                                                            <input v-model="lastState.active" ref="activeTrigger" 
                                                            type="checkbox" id="checkbox" name="Language" 
                                                            value="HTML" class="input-danger"
                                                            :disabled="!isEdit">
                                                            <span class="cr">
                                                                <i class="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                            </span>
                                                            <span>Activo</span>
                                                        </label>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Rol</th>
                                                    <div class="input">
                                                        <select v-model="lastState.rol" id="hello-single" 
                                                        class="form-control" @blur="validateRol()"
                                                        :class="{'white': isEdit, 'border-error': errors.rol.error}"
                                                        :disabled="!isEdit">
                                                            <option value=-1 disabled>---- Elige Rol ----</option>
                                                            <option value=0 :selected="lastState.rol === 0">Usuario</option>
                                                            <option value=1 :selected="lastState.rol === 1">Camarero</option>
                                                            <option value=2 :selected="lastState.rol === 2">Administrador</option>
                                                        </select>
                                                        <transition name='fade'>
                                                            <span v-if="errors.rol.error" class="form-bar text-danger">{{errors.rol.msg}}</span>
                                                        </transition>
                                                    </div>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- end of row -->
                            <transition name='fade'>
                                <div v-if="isEdit" class="text-center mt-3">
                                    <a class="btn btn-primary waves-effect waves-light m-r-20" :class="{disabled: valuesChanged && isError}" @click="update">Save</a>
                                    <a id="edit-cancel" class="btn btn-default waves-effect" @click="reset">Cancel</a>
                                </div>
                            </transition>
                        </div>
                        <!-- end of edit info -->
                    </div>
                    <!-- end of col-lg-12 -->
                </div>
                <!-- end of row -->
            </div>
            <!-- end of edit-info -->
        </div>
    </div>
</template>

<script>

    import {isEqual, clone} from 'lodash';
    const {validateEmail, validatePasswd, validatePhoneNumber} = require('../../util/Validate.js');

    export default {
        data() {
            return {
                lastState: {},
                isEdit: false,
                show: false,
                errors: {
                    password: {
                        error: false,
                        msg: 'Contraseña inválida, al menos 6 carácteres y 1 mayúscula.'
                    },
                    name: {
                        error: false,
                        msg: 'Longitud inválida, al menos 3 carácteres.'
                    },
                    lastName: {
                        error: false,
                        msg: 'Longitud inválida, al menos 3 carácteres.'
                    },
                    address: {
                        error: false,
                        msg: 'Longitud inválida, al menos 6 carácteres.'
                    },
                    email: {
                        error: false,
                        msg: 'Formato de email inválido.'
                    },
                    rol: {
                        error: false,
                        msg: 'Campo obligatorio.'
                    },
                    phoneNumber: {
                        error: false,
                        msg: 'Formato de número de teléfono inválido.'
                    }
                },
                ref: {
                    name: 'name',
                    lastName: 'lastName',
                    phoneNumber: 'phoneNumber',
                    email: 'email',
                    password: 'password',
                    address: 'address'
                }
            }
        },
        props: {
            user: {
                type: Object,
                required: true,
            },
        },
        methods: {
            toggleEdit() {
                this.isEdit = !this.isEdit;
            },
            reset() {
                this.lastState = clone(this.user);
                Object.keys(this.errors).forEach(key => this.errors[key].error = false);
            },
            async update() {
                Object.keys(this.ref).forEach(ref => {
                    this.$refs[ref].focus();
                    this.$refs[ref].blur();
                });
                let count = 0;
                Object.keys(this.errors).forEach(key => count += this.errors[key].error ? 1 : 0);
                if (count === 0) {
                    this.$emit('onUpdateUser', this.lastState);
                }else {
                    console.error('Formulario no relleno correctamente....');
                }
            },
            updatePasswd() {
                if (this.lastState.password && !validatePasswd(this.lastState.password)) {
                    this.errors.password.error = true;
                }else {
                    this.errors.password.error = false;
                    if (this.lastState.password && this.lastState.password.length === 0) delete this.lastState.password;
                }
            },
            onValidatephoneNumber(number) {
                if (!validatePhoneNumber(number)) this.errors.phoneNumber.error = true;
                else this.errors.phoneNumber.error = false;
            },
            validateRol() {
                if (this.lastState.rol === -1) this.errors.rol.error = true;
                else  this.errors.rol.error = false;
            },
            validateLength(data, min, max) {
                if (data === undefined) return false;
                data = data.trim();
                return data.length >= min && data.length < (max === undefined ? 255 : max);
            },
            validateEmail(email) {
                return validateEmail(email);
            },
        },
        computed: {
            valuesChanged() {
                return isEqual(this.user, this.lastState);
            },
            isError() {
                return Object.keys(this.errors).filter(key => this.errors[key].error).length > 0;
            }
        },
        beforeMount() {
            delete this.user.password;
            this.lastState = clone(this.user);
        },
        mounted() {
            if (this.lastState.active) {
                this.$refs.activeTrigger.click();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .btn {
        cursor: pointer;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .border-error {
        border: 1px solid lightcoral !important;
    }

    tbody {

        display: flex;
        flex-flow: column nowrap;

        tr {
            display: flex;
            flex-flow: row nowrap;
            padding-bottom: 0px !important;
            height: 100%;

            th {
                flex: 1 1 50%;
                padding-top: calc(30px - 0.875em);
            }

            .input {
                flex: 1 1 50%;
                position: relative;

                &.form-radio, &.checkbox-fade {
                    border-top: 1px solid #e9ecef;
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-items: center;
                }

                .btn-show-pass {
                    position: absolute;
                    top: 0;
                    right: 0;
                    font-size: 24px;
                    line-height: 60px;
                    margin-right: 16px;
                    cursor: pointer;
                }

                input, select {
                    width: 100%;
                    height: 60px !important;
                    background-color: lightblue;
                    resize: none;
                    color: #353c4e;
                    border: 0;
                    padding: 0.75rem;
                    vertical-align: top;
                    border-top: 1px solid #e9ecef;
                }

                .white {
                    background-color: #bababa !important;
                }

                span.form-bar  {
                    background-color: #bababa !important;
                    display: block;
                    text-align: center;
                }

            }

        }
    }

</style>