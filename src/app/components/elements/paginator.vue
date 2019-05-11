<template>
    <div class="paginator-wrapper">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{'disabled': !pagination.hasPrevPage}">
                    <a class="page-link" tabindex="-1" @click="$emit('onPaginate', pagination.prevPage)">
                        <slot name='prev'></slot>
                    </a>
                </li>
                <li v-for="n in getRange(-1)" class="page-item" :key="n.key"><a class="page-link" @click="$emit('onPaginate', n.position)">{{n.position}}</a></li>
                <li class="page-item active"><a class="page-link" @click="$emit('onPaginate', pagination.page)">{{pagination.page}}</a></li>
                <li v-for="n in getRange(1)" class="page-item" :key="n.key"><a class="page-link" @click="$emit('onPaginate', n.position)">{{n.position}}</a></li>
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
        },
        methods: {
            getRange(order) {
                let result = [];
                let count = 1;
                let position = this.pagination.page;
                switch(order) {
                    case -1:
                        while (count <= this.range && position - count > 0) {
                            result.push({key: `page-${position - count}`, position: position - count});
                            count ++;
                        }
                        result.reverse();
                    break;
                    case 1:
                        let max = this.pagination.totalPages;
                        while (count <= this.range && count + position <= max) {
                            result.push({key: `page-${position + count}`, position: position + count});
                            count ++;
                        }
                    break;
                }
                return result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul.pagination {
        >li {
            cursor: pointer;
            user-select: none;
        }
    }
</style>