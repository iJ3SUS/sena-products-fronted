<template>
    <div class="flex items-center justify-between">
        <div class="w-full">
            <!-- <p class="text-sm text-gray-700">
                Mostrando <span class="font-bold">{{ pagination.from || ((pagination.current - 1) * pagination.per_page + 1) }}</span> a <span class="font-bold">{{ pagination.to || Math.min(pagination.current * pagination.per_page, pagination.total) }}</span> de <span class="font-bold">{{ pagination.total }}</span> resultados
            </p> -->
        </div>

        <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <!-- Previous button -->
                <button
                    :disabled="pagination.current === 1"
                    @click="prev"
                    class="relative inline-flex items-center px-2 py-2 ring-1 ring-inset ring-gray-300"
                    :class="pagination.current === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50 cursor-pointer'"
                    aria-label="Previous Page"
                >
                    <span class="sr-only">Anterior</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                    </svg>
                </button>
                
                <!-- Page numbers -->
                <template v-for="pageNumber in pages" :key="pageNumber">
                    <button
                        @click="changePage(pageNumber)"
                        class="relative inline-flex items-center px-4 py-2 text-xs ring-1 ring-inset"
                        :class="pageNumber === pagination.current ? 
                            'z-10 bg-primary-600 text-white pointer-events-none font-semibold ring-primary-600' : 
                            'text-gray-900 hover:bg-gray-50 cursor-pointer ring-gray-300'"
                        :disabled="pageNumber === pagination.current"
                    >
                        {{ pageNumber }}
                    </button>
                </template>
                
                <!-- Next button -->
                <button
                    :disabled="pagination.current === pagination.last"
                    @click="next"
                    class="relative inline-flex items-center px-2 py-2 ring-1 ring-inset ring-gray-300"
                    :class="pagination.current === pagination.last ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50 cursor-pointer'"
                    aria-label="Next Page"
                >
                    <span class="sr-only">Siguiente</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                    </svg>
                </button>

            </nav>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    pagination: {
        type: Object,
        default: {},
    },
    pages: {
        type: Array,
        default: []
    }
})

const emit = defineEmits(['change'])

const changePage = (page) => {
    emit('change', page)
}

const prev = () => {
    if (props.pagination.current > 1) {
        changePage(props.pagination.current - 1)
    }
}

const next = () => {
    if (props.pagination.current < props.pagination.last) {
        changePage(props.pagination.current + 1)
    }
}
</script>
  