<template>
    <div class="paginator-wrapper">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">
                        <slot name='prev'></slot>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">
                        <slot name='next'></slot>
                    </a>
                </li>
            </ul>
        </nav> 
    </div>
</template>

<script>
    export default {
        props: {
            
        }
    }
</script>

<style lang="scss" scoped>

</style>