<template>
    <nav class="pcoded-navbar" navbar-theme="theme1" active-item-theme="theme1" sub-item-theme="theme2"
        active-item-style="style0" pcoded-navbar-position="fixed">
        <div class="pcoded-inner-navbar main-menu mCustomScrollbar _mCS_1" id style="height: calc(100% - 80px);">
            <div id="mCSB_1" class="mCustomScrollBox mCS-light mCSB_vertical_horizontal mCSB_inside"
                style="max-height: none;" tabindex="0">
                <div id="mCSB_1_container_wrapper" class="mCSB_container_wrapper mCS_x_hidden mCS_no_scrollbar_x">
                    <div id="mCSB_1_container" class="mCSB_container"
                        style="position: relative; top: -11px; left: 0px; width: 100%;" dir="ltr">
                        <div class="pcoded-navigatio-lavel" menu-title-theme="theme5">Navigation</div>
                        <ul class="pcoded-item pcoded-left-item" item-border="true" item-border-style="none"
                            subitem-border="true">
                            <li :class="{'active' : isMenuActive(this.menu.STABLISHMENTS)}">
                                <router-link to="/dashboard/stablishments">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-home"></i>
                                    </span>
                                    <span class="pcoded-mtext">Establecimientos</span>
                                </router-link>
                            </li>
                            <li :class="{'active' : isMenuActive(this.menu.TABLES)}">
                                <router-link to="/dashboard/tables">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-tablet"></i>
                                    </span>
                                    <span class="pcoded-mtext">Mesas</span>
                                </router-link>
                            </li>
                            <li :class="{'active' : isMenuActive(this.menu.USERS)}">
                                <router-link to="/dashboard/users">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-users"></i>
                                    </span>
                                    <span class="pcoded-mtext">Usuarios</span>
                                </router-link>
                            </li>
                            <li :class="{'active' : isMenuActive(this.menu.OFFERS)}">
                                <router-link to="/dashboard/offers">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-tag"></i>
                                    </span>
                                    <span class="pcoded-mtext">Ofertas</span>
                                </router-link>
                            </li>
                            <li :class="{'active' : isMenuActive(this.menu.MENU)}">
                                <router-link to="/dashboard/menu">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-menu"></i>
                                    </span>
                                    <span class="pcoded-mtext">Carta</span>
                                </router-link>
                            </li>
                            <li :class="{'active' : isMenuActive(this.menu.ANALYTICS)}">
                                <router-link to="/dashboard/analytics">
                                    <span class="pcoded-micon">
                                        <i class="feather icon-bar-chart-2"></i>
                                    </span>
                                    <span class="pcoded-mtext">Gráficas</span>
                                </router-link>
                            </li>
                        </ul>

                        <div class="pcoded-navigatio-lavel" menu-title-theme="theme5">Support</div>
                    </div>
                </div>
                <div id="mCSB_1_scrollbar_vertical"
                    class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_vertical"
                    style="display: block;">
                    <div class="mCSB_draggerContainer">
                        <div id="mCSB_1_dragger_vertical" class="mCSB_dragger"
                            style="position: absolute; min-height: 30px; display: block; height: 122px; max-height: 567px; top: 2px;">
                            <div class="mCSB_dragger_bar" style="line-height: 30px;"></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                    </div>
                </div>
                <div id="mCSB_1_scrollbar_horizontal"
                    class="mCSB_scrollTools mCSB_1_scrollbar mCS-light mCSB_scrollTools_horizontal"
                    style="display: none;">
                    <div class="mCSB_draggerContainer">
                        <div id="mCSB_1_dragger_horizontal" class="mCSB_dragger"
                            style="position: absolute; min-width: 30px; width: 0px; left: 0px;">
                            <div class="mCSB_dragger_bar"></div>
                        </div>
                        <div class="mCSB_draggerRail"></div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import vartical from "../../assets/js/vartical-layout.min.js";
    import pcoded from "../../assets/js/pcoded.min.js";
    import commonTypes from '../store/other/type';
    import menu from '../../util/MenuEnums';

    export default {
        data() {
            return {
                menu,
            }
        },
        methods: {
            isMenuActive(data) {
                return this.position === data;
            }
        },
        computed: {
            position() {
                return this.$store.getters[commonTypes.getters.getNavPosition];
            }
        },
        mounted() {
            vartical(); //Configuración del menú vertical
        },
    };
</script>

<style lang="scss" scoped>
</style>