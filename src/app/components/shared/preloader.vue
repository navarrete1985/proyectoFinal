<template>
    <div class="wrapper-preloader">
        <div v-if="visible" class="preloader" :class="global ? 'global' : 'normal'">
            <div class="preloader3 loader-block child">
                <div class="circ1"></div>
                <div class="circ2"></div>
                <div class="circ3"></div>
                <div class="circ4"></div>
            </div>
        </div>
    </div>
    <!-- Pre-loader end -->
</template>

<script>
    export default {
        props: {
            visible: {
                type: Boolean,
                required: true
            },
            global: {
                type: Boolean,
                default: () => {
                    return false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .preloader {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 100;
        background-color: rgba(211, 211, 211, 0.452);
    }

    .normal {
        position: absolute;
    }

    .global {
        position: fixed;
    }
</style>