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
                                                    <input
                                                        type="text"
                                                        v-model="lastState.name"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Apellidos</th>
                                                    <input
                                                        type="text"
                                                        v-model="lastState.lastName"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Dirección</th>
                                                    <input
                                                        type="text"
                                                        v-model="lastState.address"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Email</th>
                                                    <input
                                                        type="text"
                                                        v-model="lastState.email"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Contraseña</th>
                                                    <input
                                                        type="text"
                                                        v-model="lastState.password"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Número de Teléfono</th>
                                                    <input
                                                        type="text"
                                                        v-model="lastState.phone_number"
                                                        :class="{'white': isEdit}"
                                                        :readonly="!isEdit"
                                                        >
                                                </tr>
                                                <tr>
                                                    <th scope="row">Género</th>
                                                    <div class="form-radio">
                                                        <div class="group-add-on">
                                                            <div class="radio radiofill radio-inline">
                                                                <label>
                                                                    <input type="radio" name="radio" checked=""><i class="helper"></i> Male
                                                                </label>
                                                            </div>
                                                            <div class="radio radiofill radio-inline">
                                                                <label>
                                                                    <input type="radio" name="radio"><i class="helper"></i> Female
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Activo</th>
                                                    <div class="checkbox-fade fade-in-primary">
                                                        <label>
                                                            <input type="checkbox" id="checkbox" name="Language" value="HTML" class="input-danger">
                                                            <span class="cr">
                                                                <i class="cr-icon icofont icofont-ui-check txt-primary"></i>
                                                            </span>
                                                            <span>Activo</span>
                                                        </label>
                                                    </div>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Rol</th>
                                                    <td>
                                                        <select id="hello-single" class="form-control">
                                                            <option value="">---- Elige Rol ----</option>
                                                            <option value="married">Usuario</option>
                                                            <option value="unmarried">Camarero</option>
                                                            <option value="unmarried">Administrador</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <!-- end of row -->
                            <div class="text-center mt-3">
                                <a class="btn btn-primary waves-effect waves-light m-r-20" :class="{disabled: valuesChanged}" @click="update">Save</a>
                                <a id="edit-cancel" class="btn btn-default waves-effect" @click="reset">Cancel</a>
                            </div>
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

    export default {
        data() {
            return {
                lastState: {},
                isEdit: false
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
            },
            update() {

            }
        },
        computed: {
            valuesChanged() {
                return isEqual(this.user, this.lastState);
            }
        },
        beforeMount() {
            this.lastState = clone(this.user);
        }
    }
</script>

<style lang="scss" scoped>
    input {
        width: 100%;
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

    .btn {
        cursor: pointer;
    }
</style>