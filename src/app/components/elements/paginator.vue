<template>
    <div class="paginator-wrapper">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': !pagination.hasPrevPage}">
                    <a class="page-link" tabindex="-1" @click="$emit('onPaginate', pagination.prevPage)">
                        <slot name='prev'></slot>
                    </a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item" :class="{'disabled': !pagination.hasNextPage}">
                    <a class="page-link" @click="$emit('onPaginate', pagination.nextPage)">
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
            pagination: {
                type: Object,
                required: true
            },
            range: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul.pagination {
        >li {
            cursor: pointer;
        }
    }
</style>