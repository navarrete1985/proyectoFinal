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

    $screen-lg-min: 992px;

    .preloader {
        width: calc(100% - 240px);
        height: 100%;
        top: 0;
        right: 0;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        z-index: 100;
        background-color: rgba(211, 211, 211, 0.452);

        @media screen and (max-width: #{$screen-lg-min}) {
            width: 100%;
        }

    }

    .normal {
        position: absolute;
    }

    .global {
        position: fixed;
    }
</style>