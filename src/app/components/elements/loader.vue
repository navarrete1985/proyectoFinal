<template>
    <div v-if="loader" class='loader-block loader-wrapper'>
        <svg id='loader2' viewBox='0 0 100 100'>
            <circle id="circle-loader2" cx="50" cy="50" r="45"></circle>
        </svg>
    </div>
</template>

<script>
    export default {
        props: {
            loader: {
                required: true,
                type: Boolean
            }
        }
    }
</script>

<style lang="scss" scoped>
    .loader-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(211, 211, 211, 0.411);
    }
</style>